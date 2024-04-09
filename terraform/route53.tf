data "aws_route53_zone" "primary" {
  name = var.domain_name
}

resource "aws_route53_record" "api_record" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "pixel-enrichment.${var.domain_name}"
  type    = "A"

  alias {
    name                   = module.pixel_enrichment_api_gateway.apigatewayv2_domain_name_configuration[0].target_domain_name
    zone_id                = module.pixel_enrichment_api_gateway.apigatewayv2_domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = true
  }
}