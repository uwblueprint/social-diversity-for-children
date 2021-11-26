variable "rule_name" {
  description = "Name of cloudwatch rule"
}

variable "target_arn" {
  description = "Cloudwatch target resource arn"
}

variable "target_id" {
  description = "Id of target, randomly generated if not specified"
}

variable "schedule_expression" {
  description = "Cron or Rate epression for event rule"
}
