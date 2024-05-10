variable "production" {
  description = "Do we run on production (true) or development (false)"
  type        = bool
}

variable "aws_region" {
  description = "The region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Name to be used on all the resources as identifier. e.g. Project name, Application name"
  type        = string
}

variable "domain_name" {
  description = "Domain name of organization"
  type        = string
}

variable "pixel_enrichment_lambda_function_name" {
  description = "Name of the lambda function dedicated for pixel enrichment"
  type        = string
}

variable "github_webhook_listener_lambda_function_name" {
  description = "Name of the lambda function dedicated for GitHub webhook listener"
  type        = string
}

variable "google_sheets_lambda_function_name" {
  description = "Name of the lambda function dedicated for Google Sheets function"
  type        = string
}

variable "google_service_client_email" {
  description = "The Google service client email"
  type        = string
}

variable "google_service_private_key" {
  description = "The Google service private key"
  type        = string
}

variable "google_sheets_spreadsheet_id" {
  description = "The Google Sheets spreadsheet ID"
  type        = string
}

variable "google_sheets_customer_domain" {
  description = "The Google Sheets customer domain"
  type        = string
}

variable "gh_app_id" {
  description = "The GitHub app ID"
  type        = string
}

variable "gh_app_private_key" {
  description = "The GitHub app private key"
  type        = string
}

variable "gh_app_webhook_secret" {
  description = "The GitHub app webhook token"
  type        = string
}

variable "proxycurl_api_key" {
  description = "The API key for ProxyCurl"
  type        = string
}

variable "rampedup_api_key" {
  description = "The API key for RampedUp"
  type        = string
}

variable "coresignal_api_key" {
  description = "The API key for Coresignal"
  type        = string
}

variable "vetric_api_key" {
  description = "The API key for Vetric"
  type        = string
}

variable "atdata_pixel_id" {
  description = "The Pixel ID given of AtData"
  type        = string
}

variable "atdata_sftp_host" {
  description = "The SFTP host of AtData pixel server"
  type        = string
}

variable "atdata_sftp_port" {
  description = "The SFTP port of AtData pixel server"
  type        = string
}

variable "atdata_sftp_username" {
  description = "The SFTP username of AtData pixel server"
  type        = string
}

variable "atdata_sftp_password" {
  description = "The SFTP password of AtData pixel server"
  type        = string
}

variable "bigbdm_client_id" {
  description = "The client ID of our BigBDM user"
  type        = string
}

variable "bigbdm_client_secret" {
  description = "The client secret of our BigBDM user"
  type        = string
}

variable "common_tags" {
  description = "A map of common tags to add to all resources"
  type        = map(string)
}
