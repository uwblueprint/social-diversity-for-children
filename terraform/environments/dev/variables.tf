# should add variable condition checks to limit configuration discrepencies
# ------------------------------------------------------------------
# IAM
variable "cloudwatch_lambda_logs_policy_name" {
  description = "Name of cloudwatch lambda logs policy"
  default     = "cloudwatch-lambda-logs-policy"
  type        = string
}

# ------------------------------------------------------------------
# s3
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
# zoom-class-link
variable "zoom_class_link_description" {
  description = "Description of zoom class link parameter"
  default     = "Link used to access virtual classes hosted over Zoom"
  type        = string
}

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

variable "zoom_class_link_type" {
  description = "Zoom class link type"
  default     = "String"
  type        = string
}

# ------------------------------------------------------------------
# lambda
variable "lambda_runtime" {
  description = "Runtime of lambda function. botocore.vendored.requests is depreciated and gone in python 3.8. Unless we use a special layer from amazon"
  default     = "python3.8"
  type        = string
}

# TODO create own layer and stop using this aws one
variable "lambda_layers" {
  description = "List of layers"
  default     = ["arn:aws:lambda:us-east-1:668099181075:layer:AWSLambda-Python-AWS-SDK:4"]
  type        = list(any)
}

variable "cronMailing_rule_name" {
  description = "Name of cronMailing eventbridge rule"
  default     = "hourly-cron-mailing"
  type        = string
}

variable "cronMailing_schedule_expression" {
  description = "CRON or Rate expression for cronMailing job"
  default     = "cron(0 * ? * * *)" # hourly cron expression
  type        = string
}

# ------------------------------------------------------------------
# environment variables

variable "api_endpoint" {
  description = "Domain api endpoint"
  type        = string
}

variable "lambda_secret_key_name" {
  description = "Name of lambda secret key"
  type        = string
}
