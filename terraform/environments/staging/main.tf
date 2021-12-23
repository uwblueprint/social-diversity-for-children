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

module "s3" {
  source          = "../../modules/s3"
  allowed_origins = ["http://localhost:3000", var.sdc_domain, var.sdc_pr_domain]

  # uploads bucket 
  s3_uploads_bucket_name = var.s3_uploads_bucket_name
  criminal_check_folder  = var.criminal_check_folder
  income_proof_folder    = var.income_proof_folder
  other_folder           = var.other_folder

  # images bucket
  s3_images_bucket_name = var.s3_images_bucket_name
}

module "parameter_store" {
  source = "../../modules/parameter_store"

  # Parameter store (ssm) inputs
  # zoom link
  zoom_class_link = {
    description = var.zoom_class_link_description
    name        = var.zoom_class_link_name
    value       = var.zoom_class_link_value
    type        = var.zoom_class_link_type
  }

  # lambda secret 
  lambda_secret_key_name = var.lambda_secret_key_name
}

# Lambda functions, could encapsulate in another module for all lambda functions 
module "cronMailing" {
  source = "../../modules/lambda" # essentially wraps around a lambda 
  # didn't put in variables since I thought it was redudant if the module is named the function
  # could change though
  function_name                     = "cronMailing"
  runtime                           = var.lambda_runtime
  cloudwatch_lambda_logs_policy_arn = module.iam.cloudwatch_lambda_logs_policy_arn
  environment_variables = {
    API_ENDPOINT      = var.api_endpoint
    LAMBDA_SECRET_KEY = module.parameter_store.lambda_secret_key
  }
}

# cron job for lambda cronMailing
module "cronMailing_eventbridge" {
  source              = "../../modules/eventbridge"
  rule_name           = var.cronMailing_rule_name
  schedule_expression = var.cronMailing_schedule_expression
  target_arn          = module.cronMailing.lambda_function_arn
  target_id           = module.cronMailing.lambda_function_name
}
