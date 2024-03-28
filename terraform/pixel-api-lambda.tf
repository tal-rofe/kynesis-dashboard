data "aws_iam_policy_document" "pixel_api_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_pixel_api_lambda" {
  name               = "IAM-for-pixel-api-Lambda"
  assume_role_policy = data.aws_iam_policy_document.pixel_api_lambda_assume_role.json

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Pixel-API-Lambda-IAM-Role"
      Stack = "Backend"
    }
  )
}

# * This allows Lambda to write logs to CloudWatch
data "aws_iam_policy" "pixel_api_lambda_basic_execution_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "pixel_api_policy_attachment" {
  role       = aws_iam_role.iam_for_pixel_api_lambda.id
  policy_arn = data.aws_iam_policy.pixel_api_lambda_basic_execution_policy.arn
}

# * This allows Lambda to send messages to SQS
data "aws_iam_policy_document" "pixel_api_lambda_send_sqs_policy_document" {
  statement {
    effect    = "Allow"
    actions   = ["sqs:SendMessage"]
    resources = [aws_sqs_queue.pixel_api_enrichment_sqs_fifo.arn]
  }
}

resource "aws_iam_policy" "pixel_api_lambda_send_sqs_policy" {
  name   = "pixel-api-lambda-send-sqs-policy"
  policy = data.aws_iam_policy_document.pixel_api_lambda_send_sqs_policy_document.json
}

resource "aws_iam_role_policy_attachment" "pixel_api_policy_attachment" {
  role       = aws_iam_role.iam_for_pixel_api_lambda.id
  policy_arn = data.aws_iam_policy.pixel_api_lambda_send_sqs_policy.arn
}

data "archive_file" "lambda_pixel_api_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../apps/pixel-api-function/build"
  output_path = "${path.module}/pixel-api-function.zip"
}

resource "aws_s3_object" "pixel_api_lambda_s3_object" {
  bucket = module.s3_bucket_lambdas_code.s3_bucket_id
  key    = "pixel-api-function.zip"
  source = data.archive_file.lambda_pixel_api_zip.output_path
  etag   = filemd5(data.archive_file.lambda_pixel_api_zip.output_path)

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Pixel-API-Lambda-S3-Object"
      Stack = "Backend"
    }
  )
}

resource "aws_lambda_function" "pixel_api_lambda" {
  function_name    = var.pixel_api_lambda_function_name
  role             = aws_iam_role.iam_for_pixel_api_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.lambda_pixel_api_zip.output_base64sha256
  s3_bucket        = module.s3_bucket_lambdas_code.s3_bucket_id
  s3_key           = aws_s3_object.pixel_api_lambda_s3_object.key
  depends_on       = [aws_cloudwatch_log_group.pixel_api_cloudwatch_log_group]

  environment {
    variables = {
      SQS_URL = aws_sqs_queue.pixel_api_enrichment_sqs_fifo.url
    }
  }

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Pixel-API-Lambda-Function"
      Stack = "Backend"
    }
  )
}
