# ------------------------------------------------------------------
# zoom-class-link
variable "zoom_class_link_description" {
  description = "Parameter description"
  type        = string
}

variable "zoom_class_link_name" {
  description = "Parameter name"
  type        = string
}

variable "zoom_class_link_value" {
  description = "Parameter value"
  type        = string
}

variable "zoom_class_link_type" {
  description = "Parameter type (String, StringList, SecureString)"
  type        = string
}
# ------------------------------------------------------------------
# lamda secret

variable "lambda_secret_key_name" {
  description = "Name of lambda secret for data fetch"
  type        = string
}
