# should add variable condition checks to limit configuration discrepencies
# ------------------------------------------------------------------
# s3 
variable "s3_bucket_name" {
  description = "Name of the document uploads s3 bucket"
  type        = string
}

variable "criminal_check_folder" {
  description = "Name of the criminal check folder"
  type        = string
}

variable "income_proof_folder" {
  description = "Name of the income proof folder"
  type        = string
}

variable "curriculum_plans_folder" {
  description = "Name of the curriculum plans folder"
  type        = string
}

variable "other_folder" {
  description = "Name of the other folder (folder where files are uploaded when type isn't specified)"
  type        = string
}
# ------------------------------------------------------------------
# Parameter Store (SSM)
variable "zoom_class_link_name" {
  description = "Zoom class link parameter name"
  type        = string
}

variable "zoom_class_link_value" {
  description = "Zoom class link parameter value"
  type        = string
}
# ------------------------------------------------------------------
