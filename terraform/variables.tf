variable "project" {
  description = "Name to be used on all the resources as identifier. e.g. Project name, Application name"
  type        = string
}

variable "domain_name" {
  description = "Domain name of organization"
  type        = string
}

variable "slack_webhook_register_lambda_function_name" {
  description = "Name of the lambda function dedicated for Slack webhook register"
  type        = string
}

variable "pixel_enrichment_lambda_function_name" {
  description = "Name of the lambda function dedicated for pixel enrichment"
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

variable "vetric_api_key" {
  description = "The API key for Vetric"
  type        = string
}

variable "slack_client_id" {
  description = "The Slack client ID"
  type        = string
}

variable "slack_client_secret" {
  description = "The slack client secret"
  type        = string
}

variable "common_tags" {
  description = "A map of common tags to add to all resources"
  type        = map(string)
}
