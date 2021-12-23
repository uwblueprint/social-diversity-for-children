variable "email" {
  description = "Email for ses identity"
  type        = string
}

variable "email_domain" {
  description = "Email domain"
  type        = string
}

variable "env" {
  description = "environment variable (staging or production)"
  type        = string
}
