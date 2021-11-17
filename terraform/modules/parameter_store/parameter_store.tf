# ------------------------------------------------------------------
# parameter store
resource "aws_ssm_parameter" "zoom-class-link" {
  description = var.zoom_class_link_description
  name        = var.zoom_class_link_name
  value       = var.zoom_class_link_value
  type        = var.zoom_class_link_type
}

data "aws_ssm_parameter" "lambda_secret_key" {
  name = var.lambda_secret_key_name
}
