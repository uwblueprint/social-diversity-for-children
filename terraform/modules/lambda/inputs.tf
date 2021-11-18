variable "function_name" {
  description = "Name of the lambda function"
  type        = string
}

variable "runtime" {
  description = "Runtime of lambda function. botocore.vendored.requests is depreciated and gone in python 3.8"
  type        = string
}

variable "cloudwatch_lambda_logs_policy_arn" {
  description = "Arn of cloudwatch lambda logs policy"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables of lambda"
  type        = map(any)
}
