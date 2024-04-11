variable "project" {
  description = "Name to be used on all the resources as identifier. e.g. Project name, Application name"
  type        = string
}

variable "name" {
  description = "The name of the business logic"
  type        = string
}

variable "cron_job_schedule_expression" {
  description = "The CRON job schedule expression for triggering the Lambda function"
  type        = string
}

variable "archive_file_lambda_source_dir" {
  description = "Archive file source directory of Lambda function"
  type        = string
}

variable "archive_file_lambda_output_path" {
  description = "Archive file output directory of Lambda function"
  type        = string
}

variable "s3_bucket_id_lambda_storage" {
  description = "The ID of the S3 bucket where the Lambda code is stored"
  type        = string
}

variable "lambda_runtime_envs" {
  description = "The environment variables to inject to Lambda runtime environment variables"
  type        = object
}

variable "sqs_arn" {
  description = "The SQS ARN"
  type        = string
}

variable "common_tags" {
  description = "A map of common tags to add to all resources"
  type        = map(string)
}
