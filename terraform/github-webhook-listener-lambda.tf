data "aws_iam_policy_document" "github_webhook_listener_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_github_webhook_listener_lambda" {
  name               = "IAM-for-github-webhook-listener-Lambda"
  assume_role_policy = data.aws_iam_policy_document.github_webhook_listener_lambda_assume_role.json

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-GitHub-Webhook-Listener-Lambda-IAM-Role"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}

# * This allows Lambda to write logs to CloudWatch
data "aws_iam_policy" "github_webhook_listener_lambda_basic_execution_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "github_webhook_listener_cloudwatch_policy_attachment" {
  role       = aws_iam_role.iam_for_github_webhook_listener_lambda.id
  policy_arn = data.aws_iam_policy.github_webhook_listener_lambda_basic_execution_policy.arn
}

data "archive_file" "github_webhook_listener_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../apps/github-webhook-listener-function/build"
  output_path = "${path.module}/github-webhook-listener-function.zip"
}

resource "aws_s3_object" "github_webhook_listener_lambda_s3_object" {
  bucket = module.s3_bucket_lambdas_code.s3_bucket_id
  key    = "github-webhook-listener-function.zip"
  source = data.archive_file.github_webhook_listener_lambda_zip.output_path
  etag   = filemd5(data.archive_file.github_webhook_listener_lambda_zip.output_path)

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-GitHub-Webhook-Listener-Lambda-S3-Object"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}

resource "aws_lambda_function" "github_webhook_listener_lambda" {
  function_name    = var.github_webhook_listener_lambda_function_name
  role             = aws_iam_role.iam_for_github_webhook_listener_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.github_webhook_listener_lambda_zip.output_base64sha256
  s3_bucket        = module.s3_bucket_lambdas_code.s3_bucket_id
  s3_key           = aws_s3_object.github_webhook_listener_lambda_s3_object.key
  depends_on       = [aws_cloudwatch_log_group.github_webhook_listener_cloudwatch_log_group]

  environment {
    variables = {
      GITHUB_APP_ID            = var.github_app_id
      GITHUB_APP_PRIVATE_KEY   = var.github_app_private_key
      GITHUB_APP_WEBHOOK_TOKEN = var.github_app_webhook_token
    }
  }

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-GitHub-Webhook-Listener-Lambda-Function"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}