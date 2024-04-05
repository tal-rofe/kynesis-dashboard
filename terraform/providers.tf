terraform {
  required_version = ">= 1.3.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.40.0"
    }

    archive = {
      source  = "hashicorp/archive"
      version = "2.4.2"
    }
  }
}

# * Required environment variables: "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION"
provider "aws" {}

provider "archive" {}