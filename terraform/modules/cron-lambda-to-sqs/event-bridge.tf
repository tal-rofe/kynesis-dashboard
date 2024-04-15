resource "aws_cloudwatch_event_rule" "cron_schedule_rule" {
  name                = "${var.name}-cron-schedule-rule"
  description         = "CRON job schedule rule for triggering Lambda function"
  schedule_expression = "cron(${var.cron_job_schedule_expression})"

  tags = merge(
    var.common_tags,
    {
      Name = "${var.project}-${var.name}-CRON-Schedule-Rule"
    }
  )
}

resource "aws_cloudwatch_event_target" "trigger_lambda_on_schedule" {
  rule = aws_cloudwatch_event_rule.cron_schedule_rule.name
  arn  = aws_lambda_function.lambda.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_lambda" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.cron_schedule_rule.arn
}