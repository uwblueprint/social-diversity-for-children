# should add variable condition checks to limit configuration discrepencies
variable "s3_bucket_name" {
  description = "Name of the document uploads s3 bucket"
  default     = "sdc-uploads"
  type        = string
}

variable "criminal_check_folder" {
  description = "Name of the criminal check folder"
  default     = "criminal-checks"
  type        = string
}

variable "income_proof_folder" {
  description = "Name of the income proof folder"
  default     = "criminal-checks"
  type        = string
}

variable "curriculum_plans_folder" {
  description = "Name of the curriculum plans folder"
  default     = "curriculum-plans"
  type        = string
}

