terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# "State store for terraform with S3"
resource "aws_s3_bucket" "sdc_state_terraform" {
  bucket = "sdc-prod-terraform-state"
  # acl?
  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    name = "Terraform Remote S3 State Store"
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

# State locks for terraform with dynamo
resource "aws_dynamodb_table" "sdc_terraform_state_lock" {
  name           = "sdc-prod-terraform-state-lock"
  read_capacity  = 1
  write_capacity = 1
  # dynamo will be keyed + hashed on LockID which I think is populated by Terraform
  hash_key     = "LockID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    name = "Terraform Remote Dynamo State Lock"
  }
}
