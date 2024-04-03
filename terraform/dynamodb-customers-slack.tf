resource "aws_dynamodb_table" "dynamodb_customers_slack_table" {
  name           = "DynamoDBCustomersSlackTable"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 5
  hash_key       = "CustomerDomain"
  range_key      = "CustomerSlack"

  attribute {
    name = "CustomerDomain"
    type = "S"
  }

  attribute {
    name = "CustomerSlack"
    type = "S"
  }

  tags = merge(
    var.common_tags,
    {
      Name  = "${var.project}-Dynamo-DB-Customers-Slack"
      Stack = "Backend"
    }
  )
}