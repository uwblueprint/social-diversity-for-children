resource "aws_ses_email_identity" "sdc" {
  email = var.email
}

resource "aws_ses_domain_identity" "sdc_domain" {
  domain = var.email_domain
}

resource "aws_ses_domain_dkim" "sdc_dkim" {
  domain = aws_ses_domain_identity.sdc_domain.domain
}
