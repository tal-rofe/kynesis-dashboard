resource "aws_cloudwatch_log_group" "github_webhook_listener_cloudwatch_log_group" {
  name              = "/aws/lambda/${var.github_webhook_listener_lambda_function_name}"
  retention_in_days = 0

  lifecycle {
    prevent_destroy = false
  }

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-GitHub-Webhook-Listener-CloudWatch-Log-Group"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}