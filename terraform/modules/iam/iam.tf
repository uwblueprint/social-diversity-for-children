# -------------------------------------------------------
# declare "global" cloudatch logs policy that can apply to each lambda

data "aws_iam_policy_document" "cloudwatch_logs" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:CreateLogGroup",
      "logs:PutLogEvents"
    ]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_policy" "cloudwatch_lambda_logs" {
  name        = var.cloudwatch_lambda_logs_policy_name
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.cloudwatch_logs.json
}
