data "aws_iam_policy_document" "google_sheets_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_google_sheets_lambda" {
  name               = "IAM-for-Google-Sheets-Lambda"
  assume_role_policy = data.aws_iam_policy_document.google_sheets_lambda_assume_role.json

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Google-Sheets-Lambda-IAM-Role"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}

# * This allows Lambda to write logs to CloudWatch
data "aws_iam_policy" "google_sheets_lambda_basic_execution_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "google_sheets_cloudwatch_policy_attachment" {
  role       = aws_iam_role.iam_for_google_sheets_lambda.id
  policy_arn = data.aws_iam_policy.google_sheets_lambda_basic_execution_policy.arn
}

data "archive_file" "google_sheets_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../apps/google-sheets-function/build"
  output_path = "${path.module}/google-sheets-function.zip"
}

resource "aws_s3_object" "google_sheets_lambda_s3_object" {
  bucket = module.s3_bucket_lambdas_code.s3_bucket_id
  key    = "google-sheets-function.zip"
  source = data.archive_file.google_sheets_lambda_zip.output_path
  etag   = filemd5(data.archive_file.google_sheets_lambda_zip.output_path)

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Google-Sheets-Lambda-S3-Object"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}

resource "aws_lambda_function" "google_sheets_lambda" {
  function_name    = var.google_sheets_lambda_function_name
  role             = aws_iam_role.iam_for_google_sheets_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  timeout          = 600 # * Max time update Google Sheets
  source_code_hash = data.archive_file.google_sheets_lambda_zip.output_base64sha256
  s3_bucket        = module.s3_bucket_lambdas_code.s3_bucket_id
  s3_key           = aws_s3_object.google_sheets_lambda_s3_object.key
  depends_on       = [aws_cloudwatch_log_group.google_sheets_function_cloudwatch_log_group]

  environment {
    variables = {
      GOOGLE_SERVICE_CLIENT_EMAIL   = var.google_service_client_email
      GOOGLE_SERVICE_PRIVATE_KEY    = var.google_service_private_key
      GOOGLE_SHEETS_SPREADSHEET_ID  = var.google_sheets_spreadsheet_id
      GOOGLE_SHEETS_CUSTOMER_DOMAIN = var.google_sheets_customer_domain
    }
  }

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Google-Sheets-Lambda-Function"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}
