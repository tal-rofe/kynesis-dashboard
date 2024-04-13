variable "aws_region" {
  description = "The region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Name to be used on all the resources as identifier. e.g. Project name, Application name"
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

variable "common_tags" {
  description = "A map of common tags to add to all resources"
  type        = map(string)
}
