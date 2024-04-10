resource "aws_cloudwatch_log_group" "pixel_enrichment_cloudwatch_log_group" {
  name              = "/aws/lambda/${var.pixel_enrichment_lambda_function_name}"
  retention_in_days = 0

  lifecycle {
    prevent_destroy = false
  }

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Pixel-Enrichment-CloudWatch-Log-Group"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}
