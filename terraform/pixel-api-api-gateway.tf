module "pixel_api_api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name                        = "pixel-api-api-gateway"
  description                 = "API gateway for pixel API"
  protocol_type               = "HTTP"
  domain_name                 = "pixel-api.${var.domain_name}"
  domain_name_certificate_arn = module.pixel_api_api_gateway_acm.acm_certificate_arn

  cors_configuration = {
    allow_headers = ["Content-Type"]
    allow_methods = ["POST"]
    allow_origins = var.customers_domains
  }

  integrations = {
    "POST /" = {
      lambda_arn             = aws_lambda_function.pixel_api_lambda.arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 10000
    }
  }

  domain_name_tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Pixel-API-API-Gateway-Domain"
      Stack = "Backend"
    }
  )

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Pixel-API-API-Gateway"
      Stack = "Backend"
    }
  )
}

resource "aws_lambda_permission" "api_gw_permission_invoke_pixel_api_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pixel_api_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.pixel_api_api_gateway.apigatewayv2_api_execution_arn}/*/*"
}