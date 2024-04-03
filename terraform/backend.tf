terraform {
  # * Required: "region", "bucket", "dynamodb_table" - will be provided in GitHub action
  backend "s3" {
    key     = "terraform-kynesis-dashboard.core.tfstate"
    encrypt = true
  }
}
