# ------------------------------------------------------------------
# parameter store
resource "aws_ssm_parameter" "zoom-class-link" {
  description = var.zoom_class_link.description
  name        = var.zoom_class_link.name
  value       = var.zoom_class_link.value
  type        = var.zoom_class_link.type
}

data "aws_ssm_parameter" "lambda_secret_key" {
  name = var.lambda_secret_key_name
}
