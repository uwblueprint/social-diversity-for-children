# ------------------------------------------------------------------
# zoom-class-link
variable "zoom_class_link" {
  description = "Parameter map"
  type        = map(any)
}

# ------------------------------------------------------------------
# lamda secret

variable "lambda_secret_key_name" {
  description = "Name of lambda secret for data fetch"
  type        = string
}
