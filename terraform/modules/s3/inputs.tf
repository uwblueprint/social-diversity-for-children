# should add variable condition checks to limit configuration discrepencies
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

