module "bigbdm_pixel_collector" {
  source = "./modules/cron-lambda-to-sqs"

  project                         = var.project
  name                            = "BigBDM-Pixel-Collector"
  cron_job_schedule_expression    = "*/10 * * * *"
  archive_file_lambda_source_dir  = "${path.module}/../apps/bigbdm-pixel-collector-function/build"
  archive_file_lambda_output_path = "${path.module}/bigbdm-pixel-collector-function.zip"
  s3_bucket_id_lambda_storage     = module.s3_bucket_lambdas_code.s3_bucket_id
  lambda_timeout                  = 20
  lambda_runtime_envs = {
    SQS_URL              = aws_sqs_queue.pixel_enrichment_sqs_fifo.url
    BIGBDM_CLIENT_ID     = var.bigbdm_client_id
    BIGBDM_CLIENT_SECRET = var.bigbdm_client_secret
  }
  sqs_arn = aws_sqs_queue.pixel_enrichment_sqs_fifo.arn

  common_tags = merge(
    var.common_tags,
    {
      Stack     = "Backend"
      Namespace = "PixelAPI"
    }
  )
}