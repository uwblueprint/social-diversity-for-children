output "lambda_secret_key" {
  description = "Lambda secret key"
  sensitive   = true
  value       = data.aws_ssm_parameter.lambda_secret_key.value
}
