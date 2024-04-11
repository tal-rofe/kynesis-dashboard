resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name              = "/aws/lambda/${var.name}-lambda"
  retention_in_days = 0

  lifecycle {
    prevent_destroy = false
  }

  tags = merge(
    var.common_tags,
    {
      Name = "${var.project}-${var.name}-CloudWatch-Log-Group"
    }
  )
}
