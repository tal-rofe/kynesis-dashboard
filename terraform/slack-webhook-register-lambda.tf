data "aws_iam_policy_document" "slack_webhook_register_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_slack_webhook_register_lambda" {
  name               = "IAM-for-slack-webhook-register-Lambda"
  assume_role_policy = data.aws_iam_policy_document.slack_webhook_register_lambda_assume_role.json

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Slack-Webhook-Register-Lambda-IAM-Role"
      Stack = "Backend"
    }
  )
}

# * This allows Lambda to write logs to CloudWatch
data "aws_iam_policy" "slack_webhook_register_lambda_basic_execution_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "slack_webhook_register_cloudwatch_policy_attachment" {
  role       = aws_iam_role.iam_for_slack_webhook_register_lambda.id
  policy_arn = data.aws_iam_policy.slack_webhook_register_lambda_basic_execution_policy.arn
}

# * This allows Lambda to read DynamoDB table
data "aws_iam_policy_document" "slack_webhook_register_lambda_put_dynamodb_policy_document" {
  statement {
    effect    = "Allow"
    actions   = ["dynamodb:PutItem"]
    resources = [aws_dynamodb_table.dynamodb_customers_slack_table.arn]
  }
}

resource "aws_iam_policy" "slack_webhook_register_lambda_read_dynamodb_policy" {
  name   = "slack-webhook-register-lambda-put-dynamodb-policy"
  policy = data.aws_iam_policy_document.slack_webhook_register_lambda_put_dynamodb_policy_document.json
}

resource "aws_iam_role_policy_attachment" "pixel_enrichment_read_dynamodb_policy_attachment" {
  role       = aws_iam_role.iam_for_slack_webhook_register_lambda.id
  policy_arn = data.aws_iam_policy.slack_webhook_register_lambda_read_dynamodb_policy.arn
}

data "archive_file" "lambda_slack_webhook_register_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../apps/slack-webhook-register-function/build"
  output_path = "${path.module}/slack-webhook-register-function.zip"
}

resource "aws_s3_object" "slack_webhook_register_lambda_s3_object" {
  bucket = module.s3_bucket_lambdas_code.s3_bucket_id
  key    = "slack-webhook-register-function.zip"
  source = data.archive_file.lambda_slack_webhook_register_zip.output_path
  etag   = filemd5(data.archive_file.lambda_slack_webhook_register_zip.output_path)

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Slack-Webhook-Register-Lambda-S3-Object"
      Stack = "Backend"
    }
  )
}

resource "aws_lambda_function" "slack_webhook_register_lambda" {
  function_name    = var.slack_webhook_register_lambda_function_name
  role             = aws_iam_role.iam_for_slack_webhook_register_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.lambda_slack_webhook_register_zip.output_base64sha256
  s3_bucket        = module.s3_bucket_lambdas_code.s3_bucket_id
  s3_key           = aws_s3_object.slack_webhook_register_lambda_s3_object.key
  depends_on       = [aws_cloudwatch_log_group.slack_webhook_register_cloudwatch_log_group]

  environment {
    variables = {
      DYNAMODB_TABLE_NAME = aws_dynamodb_table.dynamodb_customers_slack_table.name
      SLACK_CLIENT_ID = var.slack_client_id
      SLACK_CLIENT_SECRET = var.slack_client_secret
    }
  }

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Slack-Webhook-Register-Lambda-Function"
      Stack = "Backend"
    }
  )
}
