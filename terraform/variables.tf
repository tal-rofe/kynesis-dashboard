variable "project" {
  description = "Name to be used on all the resources as identifier. e.g. Project name, Application name"
  type        = string
}

variable "domain_name" {
  description = "Domain name of organization"
  type        = string
}

variable "pixel_api_lambda_function_name" {
  description = "Name of the lambda function dedicated for pixel API"
  type        = string
}

variable "pixel_enrichment_lambda_function_name" {
  description = "Name of the lambda function dedicated for pixel enrichment"
  type        = string
}

variable "customers_domains" {
  description = "List of Kynesis' customers domains"
  type        = list(string)
}

variable "common_tags" {
  description = "A map of common tags to add to all resources"
  type        = map(string)
}
