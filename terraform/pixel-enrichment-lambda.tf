data "aws_iam_policy_document" "pixel_enrichment_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_pixel_enrichment_lambda" {
  name               = "IAM-for-pixel-enrichment-Lambda"
  assume_role_policy = data.aws_iam_policy_document.pixel_enrichment_lambda_assume_role.json

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Pixel-Enrichment-Lambda-IAM-Role"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}

# * This allows Lambda to write logs to CloudWatch
data "aws_iam_policy" "pixel_enrichment_lambda_basic_execution_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "pixel_enrichment_cloudwatch_policy_attachment" {
  role       = aws_iam_role.iam_for_pixel_enrichment_lambda.id
  policy_arn = data.aws_iam_policy.pixel_enrichment_lambda_basic_execution_policy.arn
}

# * This allows Lambda to process SQS messages
data "aws_iam_policy" "pixel_enrichment_lambda_sqs_execution_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole"
}

resource "aws_iam_role_policy_attachment" "pixel_enrichment_sqs_policy_attachment" {
  role       = aws_iam_role.iam_for_pixel_enrichment_lambda.id
  policy_arn = data.aws_iam_policy.pixel_enrichment_lambda_sqs_execution_policy.arn
}

# * This allows Lambda to read DynamoDB table
data "aws_iam_policy_document" "pixel_enrichment_lambda_read_dynamodb_policy_document" {
  statement {
    effect    = "Allow"
    actions   = ["dynamodb:GetItem"]
    resources = [aws_dynamodb_table.dynamodb_customers_slack_table.arn]
  }
}

resource "aws_iam_policy" "pixel_enrichment_lambda_read_dynamodb_policy" {
  name   = "pixel-enrichment-lambda-read-dynamodb-policy"
  policy = data.aws_iam_policy_document.pixel_enrichment_lambda_read_dynamodb_policy_document.json
}

resource "aws_iam_role_policy_attachment" "pixel_enrichment_lambda_read_dynamodb_policy_attachment" {
  role       = aws_iam_role.iam_for_pixel_enrichment_lambda.id
  policy_arn = aws_iam_policy.pixel_enrichment_lambda_read_dynamodb_policy.arn
}

data "archive_file" "lambda_pixel_enrichment_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../apps/pixel-enrichment-function/build"
  output_path = "${path.module}/pixel-enrichment-function.zip"
}

resource "aws_s3_object" "pixel_enrichment_lambda_s3_object" {
  bucket = module.s3_bucket_lambdas_code.s3_bucket_id
  key    = "pixel-enrichment-function.zip"
  source = data.archive_file.lambda_pixel_enrichment_zip.output_path
  etag   = filemd5(data.archive_file.lambda_pixel_enrichment_zip.output_path)

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Pixel-Enrichment-Lambda-S3-Object"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}

resource "aws_lambda_function" "pixel_enrichment_lambda" {
  function_name    = var.pixel_enrichment_lambda_function_name
  role             = aws_iam_role.iam_for_pixel_enrichment_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  timeout          = 900 # * Max time to enrich data
  source_code_hash = data.archive_file.lambda_pixel_enrichment_zip.output_base64sha256
  s3_bucket        = module.s3_bucket_lambdas_code.s3_bucket_id
  s3_key           = aws_s3_object.pixel_enrichment_lambda_s3_object.key
  depends_on       = [aws_cloudwatch_log_group.pixel_enrichment_cloudwatch_log_group]

  environment {
    variables = {
      SQS_URL             = aws_sqs_queue.pixel_enrichment_sqs_fifo.url
      PROXYCURL_API_KEY   = var.proxycurl_api_key
      RAMPEDUP_API_KEY    = var.rampedup_api_key
      VETRIC_API_KEY      = var.vetric_api_key
      DYNAMODB_TABLE_NAME = aws_dynamodb_table.dynamodb_customers_slack_table.name
    }
  }

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Pixel-Enrichment-Lambda-Function"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}
