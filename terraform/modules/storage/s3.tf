# TODO add proper encryption
# TODO add proper subfolder names (for future once those are determined)
resource "aws_s3_bucket" "s3_uploads" {
  bucket = var.s3_bucket_name
  # TODO look into better policies later
  acl = "private"

  # TODO improve this security wise
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "DELETE"]
    allowed_origins = ["http://localhost:3000"]
    expose_headers  = []
    # TODO look into other options ex below
    # max_age_seconds = 3000
  }
}

# ----------------------------------------------------------
# criminal_check_folder

resource "aws_s3_bucket_object" "criminal_check_folder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.criminal_check_folder}/"
  content_type = "application/x-directory"
}

resource "aws_s3_bucket_object" "criminal_check_subfolder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.criminal_check_folder}/subfolder/"
  content_type = "application/x-directory"
}

# ----------------------------------------------------------
# income_proof_folder

resource "aws_s3_bucket_object" "income_proof_folder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.income_proof_folder}/"
  content_type = "application/x-directory"
}

resource "aws_s3_bucket_object" "income_proof_subfolder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.income_proof_folder}/subfolder/"
  content_type = "application/x-directory"
}

# ----------------------------------------------------------
# curriculum_plans_folder

resource "aws_s3_bucket_object" "curriculum_plans_folder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.curriculum_plans_folder}/"
  content_type = "application/x-directory"
}

resource "aws_s3_bucket_object" "curriculum_plans_subfolder" {
  bucket       = aws_s3_bucket.s3_uploads.id
  acl          = "private"
  key          = "${var.curriculum_plans_folder}/subfolder"
  content_type = "application/x-directory"
}

