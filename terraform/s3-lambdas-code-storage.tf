module "s3_bucket_lambdas_code" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "4.1.1"

  acl                      = "private"
  force_destroy            = true
  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Lambdas-Code-S3-Bucket-Storage"
      Stack = "Backend"
    }
  )
}
