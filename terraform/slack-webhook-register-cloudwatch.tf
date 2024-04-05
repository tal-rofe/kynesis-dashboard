resource "aws_cloudwatch_log_group" "slack_webhook_register_cloudwatch_log_group" {
  name              = "/aws/lambda/${var.slack_webhook_register_lambda_function_name}"
  retention_in_days = 0

  lifecycle {
    prevent_destroy = false
  }

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Slack-Webhook-Register-CloudWatch-Log-Group"
      Stack = "Backend"
    }
  )
}
