resource "aws_cloudwatch_log_group" "google_sheets_function_cloudwatch_log_group" {
  name              = "/aws/lambda/${var.google_sheets_lambda_function_name}"
  retention_in_days = 0

  lifecycle {
    prevent_destroy = false
  }

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Google-Sheets-Function-CloudWatch-Log-Group"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}
