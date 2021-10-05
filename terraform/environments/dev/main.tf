# TODO add proper backend state + state lock if we continue with terraform
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}


module "storage" {
  source = "../../modules/storage"

  # variables
  s3_bucket_name          = var.s3_bucket_name
  criminal_check_folder   = var.criminal_check_folder
  income_proof_folder     = var.income_proof_folder
  curriculum_plans_folder = var.curriculum_plans_folder
}
