resource "aws_cloudwatch_log_group" "pixel_api_cloudwatch_log_group" {
  name              = "/aws/lambda/${var.pixel_api_lambda_function_name}"
  retention_in_days = 0

  lifecycle {
    prevent_destroy = false
  }

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Pixel-API-CloudWatch-Log-Group"
      Stack = "Backend"
    }
  )
}
