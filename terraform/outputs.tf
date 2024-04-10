output "pixel-api-gateway-url" {
  value       = var.production ? null : module.pixel_api_api_gateway.apigatewayv2_api_api_endpoint
  description = "The URL of Pixel API Gateway"
}