# lambda.tf
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "D:\\Personal Projects\\aws-terraform\\dist"
  output_path = "D:\\Personal Projects\\aws-terraform\\dist\\lambda.zip"
}

resource "aws_lambda_function" "example_lambda" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "terraform-lambda-nilay"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "hello.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs18.x"
  timeout          = 10

  environment {
    variables = {
      ENV = "test"
    }
  }
}
