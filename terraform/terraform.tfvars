production = false
project                                     = "Kynesis-Dashboard"
domain_name                                 = "kynesis.io"
pixel_enrichment_lambda_function_name       = "pixel-enrichment-lambda"
github_webhook_listener_lambda_function_name = "github-webhook-listener-lambda"
google_sheets_lambda_function_name = "google-sheets-lambda"
common_tags = {
  "Project"     = "Terraform-Kynesis-Dashboard"
  "Environment" = "Production"
  "Owner"       = "Tal Rofe"
}