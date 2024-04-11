data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "IAM-for-Lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json

  tags = merge(
    var.common_tags,
    {
      Name = "${var.project}-${var.name}-Lambda-IAM-Role"
    }
  )
}

# * This allows Lambda to write logs to CloudWatch
data "aws_iam_policy" "lambda_basic_execution_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "cloudwatch_policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.id
  policy_arn = data.aws_iam_policy.lambda_basic_execution_policy.arn
}

# * This allows Lambda to send messages to SQS
data "aws_iam_policy_document" "lambda_send_sqs_policy_document" {
  statement {
    effect    = "Allow"
    actions   = ["sqs:SendMessage"]
    resources = [var.sqs_arn]
  }
}

resource "aws_iam_policy" "lambda_send_sqs_policy" {
  name   = "${var.name}-lambda-send-sqs-policy"
  policy = data.aws_iam_policy_document.lambda_send_sqs_policy_document.json
}

resource "aws_iam_role_policy_attachment" "send_sqs_policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.id
  policy_arn = aws_iam_policy.lambda_send_sqs_policy.arn
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.archive_file_lambda_source_dir
  output_path = var.archive_file_lambda_output_path
}

resource "aws_s3_object" "lambda_s3_object" {
  bucket = var.s3_bucket_id_lambda_storage
  key    = "${var.name}-function.zip"
  source = data.archive_file.lambda_zip.output_path
  etag   = filemd5(data.archive_file.lambda_zip.output_path)

  tags = merge(
    var.common_tags,
    {
      Name = "${var.project}-${var.name}-Lambda-S3-Object"
    }
  )
}

resource "aws_lambda_function" "pixel_enrichment_lambda" {
  function_name    = "${var.name}-lambda"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  s3_bucket        = var.s3_bucket_id_lambda_storage
  s3_key           = aws_s3_object.lambda_s3_object.key
  depends_on       = [aws_cloudwatch_log_group.cloudwatch_log_group]

  environment {
    variables = var.lambda_runtime_envs
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.project}-${var.name}-Lambda-Function"

    }
  )
}
