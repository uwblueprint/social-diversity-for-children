data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/files/${var.function_name}"
  output_path = "${path.module}/files/zips/${var.function_name}.zip"
}

resource "aws_lambda_function" "this" {
  function_name = var.function_name
  runtime       = var.runtime
  handler       = "${var.function_name}.lambda_handler"
  role          = aws_iam_role.lambda.arn
  architectures = ["arm64"]
  layers        = var.layers

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = var.environment_variables
  }
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${var.function_name}"
  retention_in_days = 120
}
