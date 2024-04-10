module "pixel_api_api_gateway_acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "5.0.1"

  domain_name               = var.domain_name
  zone_id                   = data.aws_route53_zone.primary.zone_id
  subject_alternative_names = ["pixel-api.${var.domain_name}"]
  wait_for_validation       = true
  validation_method         = "DNS"

  tags = merge(
    var.common_tags,
    {
      Name      = "${var.project}-Pixel-API-API-Gateway-ACM"
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}
