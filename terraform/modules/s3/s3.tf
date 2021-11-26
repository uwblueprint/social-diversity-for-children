# ----------------------------------------------------------
# images bucket
resource "aws_s3_bucket" "sdc_images" {
  bucket = var.s3_images_bucket_name
  # TODO look into better policies later
  acl = "private"

  # TODO improve this security wise
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = []
    # TODO look into other options ex below
    # max_age_seconds = 3000
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle {
    prevent_destroy = true
  }
}

data "aws_iam_policy_document" "s3_public_read" {
  statement {
    effect = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject"
    ]
    resources = ["arn:aws:s3:::${var.s3_images_bucket_name}/*"]
  }
}

resource "aws_s3_bucket_policy" "sdc_images_public_read" {
  bucket = aws_s3_bucket.sdc_images.id
  policy = data.aws_iam_policy_document.s3_public_read.json
}

# ----------------------------------------------------------
# uploads bucket
resource "aws_s3_bucket" "s3_uploads" {
  bucket = var.s3_uploads_bucket_name
  # TODO look into better policies later
  acl = "private"

  # TODO improve this security wise
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = var.allowed_origins
    expose_headers  = []
    # TODO look into other options ex below
    # max_age_seconds = 3000
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle {
    prevent_destroy = true
  }
}

# ----------------------------------------------------------
# folders, not sure if they inherit acl permission from the s3 bucket
# criminal_check_folder

resource "aws_s3_bucket_object" "criminal_check_folder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.criminal_check_folder}/"
  content_type = "application/x-directory"
  lifecycle {
    prevent_destroy = true
  }
}

# income_proof_folder
resource "aws_s3_bucket_object" "income_proof_folder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.income_proof_folder}/"
  content_type = "application/x-directory"
  lifecycle {
    prevent_destroy = true
  }
}

# curriculum_plans_folder
resource "aws_s3_bucket_object" "curriculum_plans_folder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.curriculum_plans_folder}/"
  content_type = "application/x-directory"
  lifecycle {
    prevent_destroy = true
  }
}

# other folder
resource "aws_s3_bucket_object" "other_folder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.other_folder}/"
  content_type = "application/x-directory"
  lifecycle {
    prevent_destroy = true
  }
}
