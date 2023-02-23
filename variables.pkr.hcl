variable "region" {
  type    = string
  default = "us-east-1"
}

variable "profile" {
  type    = string
  default = "dev"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "ssh_username" {
  type    = string
  default = "ec2-user"
}

variable "ami_users" {
  type    = list(string)
  default = ["808076149364"]
}

variable "filters_name" {
  type    = string
  default = "amzn2-ami-kernel-5.10-hvm-2.0.20230207.0-x86_64-gp2"
}

variable "filters_root-device-type" {
  type    = string
  default = "ebs"
}

variable "filters_virtualization_type" {
  type    = string
  default = "hvm"
}

variable "filters_owners" {
  type    = list(string)
  default = ["amazon"]
}