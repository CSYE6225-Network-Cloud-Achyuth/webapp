packer {
  required_plugins {
    amazon = {
      version = ">=0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "my_amazon_linux_image" {
  profile       = "dev"
  ami_name      = "Custom Amazon Linux AMI"
  source_ami    = "ami-0dfcb1ef8550277af"
  instance_type = "t2.micro"
  region        = "us-east-1"
  ssh_username  = "ec2-user"
}

build {
  sources = [
    "source.amazon-ebs.my_amazon_linux_image"
  ]

  provisioner "shell" {
    script = "./install-aws.sh"
  }
}
