module "urls_cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "3.3.2"

  comment                       = "CloudFront to get original URL of provided hashed URL and to get redirected"
  is_ipv6_enabled               = true
  price_class                   = "PriceClass_100"
  create_origin_access_identity = true
  aliases                       = ["u.${var.domain_name}"]

  default_cache_behavior = {
    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = 5400
    min_ttl                = 3600
    max_ttl                = 7200
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    query_string           = false

    function_association = {
      viewer-request = {
        function_arn = aws_cloudfront_function.redirect_url_lambda_edge.arn
      }

      viewer-response = {
        function_arn = aws_cloudfront_function.redirect_url_lambda_edge.arn
      }
    }
  }

  viewer_certificate = {
    acm_certificate_arn = module.cloudfronts_acm.acm_certificate_arn
    ssl_support_method  = "sni-only"
  }

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Client-URLs-CloudFront"
      Stack = "Backend"
    }
  )
}
