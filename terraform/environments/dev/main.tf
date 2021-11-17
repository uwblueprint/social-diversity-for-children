terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  # not possible to have this dynamic or populated through variables 
  backend "s3" {
    bucket         = "sdc-dev-terraform-state"
    key            = "terraform-state/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "sdc-dev-terraform-state-lock"
    encrypt        = true
  }
}

# configures the required provider
provider "aws" {
  region = "us-east-1"
}

module "iam" {
  source                             = "../../modules/iam"
  cloudwatch_lambda_logs_policy_name = var.cloudwatch_lambda_logs_policy_name
}

module "storage" {
  source = "../../modules/storage"

  # S3 inputs
  s3_bucket_name          = var.s3_bucket_name
  criminal_check_folder   = var.criminal_check_folder
  income_proof_folder     = var.income_proof_folder
  curriculum_plans_folder = var.curriculum_plans_folder
  other_folder            = var.other_folder

  # Parameter store (ssm) inputs
  zoom_class_link_name  = var.zoom_class_link_name
  zoom_class_link_value = var.zoom_class_link_value
}

# Lambda function
module "cronMailing" {
  source                            = "../../modules/lambda"
  function_name                     = "cronMailing"
  cloudwatch_lambda_logs_policy_arn = module.iam.cloudwatch_lambda_logs_policy_arn
  environment_variables             = {}
}

# cron job for lambda cronMailing
module "cronMailing_eventbridge" {
  source              = "../../modules/eventbridge"
  rule_name           = "hourly-cron-mailing"
  schedule_expression = "cron(0 * ? * * *)"
  target_arn          = module.cronMailing.lamba_function_arn
  target_id           = module.cronMailing.lamba_function_name
}
