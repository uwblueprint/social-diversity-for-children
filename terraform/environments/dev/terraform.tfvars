# ------------------------------------------------------------------
# IAM
cloudwatch_lambda_logs_policy_name = "cloudwatch-lambda-logs-policy"
# ------------------------------------------------------------------
# S3 
# uploads bucket
s3_bucket_name          = "sdc-uploads"
criminal_check_folder   = "criminal-check"
income_proof_folder     = "income-proof"
curriculum_plans_folder = "curriculum-plans"
other_folder            = "other"
# ------------------------------------------------------------------
# Parameter Store (SSM)
# zoom-class-link
zoom_class_link_description = "Link used to access virtual classes hosted over Zoom"
zoom_class_link_name        = "zoom-class-link"
zoom_class_link_value       = "https://us06web.zoom.us/j/8391781258?pwd=NHBlMVh5SHc5UE10K2dsMFFvTzdmUT09"
zoom_class_link_type        = "String"

# ------------------------------------------------------------------
# Lambda
lambda_runtime = "python3.8"
# cronMailing
cronMailing_rule_name           = "hourly-cron-mailing"
cronMailing_schedule_expression = "cron(0 * * * *)"

# ------------------------------------------------------------------
# environment variables
api_endpoint           = "https://staging.socialdiversity.org/api/mail"
lambda_secret_key_name = "LAMBDA_SECRET_KEY"
