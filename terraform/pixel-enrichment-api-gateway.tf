module "pixel_api_api_gateway" {
  source  = "terraform-aws-modules/apigateway-v2/aws"
  version = "4.0.0"

  name                        = "pixel-api-gateway"
  description                 = "API gateway for pixel API"
  protocol_type               = "HTTP"
  domain_name                 = "pixel-api.${var.domain_name}"
  domain_name_certificate_arn = module.pixel_api_api_gateway_acm.acm_certificate_arn

  cors_configuration = {
    allow_headers = ["Content-Type"]
    allow_methods = ["GET"]
    allow_origins = "*"
  }

  integrations = {
    "GET /slack-webhook-register" = {
      lambda_arn             = aws_lambda_function.slack_webhook_register_lambda.arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 10000
    }
  }

  domain_name_tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Pixel-API-API-Gateway-Domain"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Pixel-API-API-Gateway"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}

resource "aws_lambda_permission" "api_gw_permission_invoke_slack_webhook_register_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.slack_webhook_register_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.pixel_api_api_gateway.apigatewayv2_api_execution_arn}/*/*"
}