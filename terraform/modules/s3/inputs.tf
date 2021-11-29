
variable "allowed_origins" {
  description = "CORS allowed origins"
  type        = list(string)
}

variable "s3_images_bucket_name" {
  description = "Name of the document uploads s3 bucket"
  default     = "sdc-public-images"
  type        = string
}

# should add variable condition checks to limit configuration discrepencies
variable "s3_uploads_bucket_name" {
  description = "Name of the document uploads s3 bucket"
  default     = "sdc-uploads"
  type        = string
}

variable "criminal_check_folder" {
  description = "Name of the criminal check folder"
  default     = "criminal-check"
  type        = string
}

variable "income_proof_folder" {
  description = "Name of the income proof folder"
  default     = "income-proof"
  type        = string
}

variable "curriculum_plans_folder" {
  description = "Name of the curriculum plans folder"
  default     = "curriculum-plans"
  type        = string
}

variable "other_folder" {
  description = "Name of the other folder (folder where files are uploaded when type isn't specified)"
  default     = "other"
  type        = string
}
