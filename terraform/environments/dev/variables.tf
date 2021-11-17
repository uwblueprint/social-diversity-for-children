# should add variable condition checks to limit configuration discrepencies

# ------------------------------------------------------------------
# storage module
variable "s3_bucket_name" {
  description = "Name of the document uploads s3 bucket"
  default     = "sdc-uploads"
  type        = string
}

variable "criminal_check_folder" {
  description = "Name of the criminal check folder"
  default     = "criminal_checks"
  type        = string
}

variable "income_proof_folder" {
  description = "Name of the income proof folder"
  default     = "criminal_checks"
  type        = string
}

variable "curriculum_plans_folder" {
  description = "Name of the curriculum plans folder"
  default     = "curriculum_plans"
  type        = string
}

variable "other_folder" {
  description = "Name of the other folder (folder where files are uploaded when type isn't specified)"
  default     = "other"
  type        = string
}

# ------------------------------------------------------------------
# Parameter Store (SSM)
variable "zoom_class_link_name" {
  description = "Zoom class link parameter name"
  default     = "zoom-class-link"
  type        = string
}

variable "zoom_class_link_value" {
  description = "Zoom class link parameter value"
  default     = "https://us06web.zoom.us/j/8391781258?pwd=NHBlMVh5SHc5UE10K2dsMFFvTzdmUT09"
  type        = string
}
# ------------------------------------------------------------------
# IAM
variable "cloudwatch_lambda_logs_policy_name" {
  description = "Name of cloudwatch lambda logs policy"
  default     = "cloudwatch-lambda-logs-policy"
  type        = string
}
# ------------------------------------------------------------------
# Lambda
