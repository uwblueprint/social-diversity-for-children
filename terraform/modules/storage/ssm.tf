# ------------------------------------------------------------------
# parameter store
resource "aws_ssm_parameter" "zoom_class_link" {
  name  = var.zoom_class_link_name
  value = var.zoom_class_link_value
  type  = "String"
}
