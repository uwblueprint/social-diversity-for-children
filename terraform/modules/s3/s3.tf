resource "aws_s3_bucket" "s3_uploads" {
  bucket = "sdc-uploads"
  # TODO look into better policies later
  acl    = "private"
}