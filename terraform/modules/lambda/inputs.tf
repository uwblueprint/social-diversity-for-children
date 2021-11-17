variable "function_name" {
  description = "Name of the lambda function"
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
