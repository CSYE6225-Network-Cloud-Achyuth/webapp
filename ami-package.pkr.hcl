#run: "packer validate -var 'ak=${{ secrets.AWS_ACCESS_KEY_ID }}' -var 'sk=${{ secrets.AWS_SECRET_ACCESS_KEY }}' --var-file=aws.pkvars.hcl ami.pkr.hcl"

packer {
  required_plugins {
    amazon = {
      version = ">=0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}


source "amazon-ebs" "my_amazon_linux_image" {
  profile  = var.profile
  ami_name = "Custom_AMI-${local.timestamp}"

  // Added AMI Users
  ami_users = var.ami_users

  source_ami_filter {
    filters = {
      name                = var.filters_name
      root-device-type    = var.filters_root-device-type
      virtualization-type = var.filters_virtualization_type
    }
    most_recent = true

    owners = var.filters_owners
  }

  // launch_block_device_mappings {
  //   delete_on_otermination
  // }


  // source_ami    = "ami-0dfcb1ef8550277af"
  instance_type = var.instance_type
  region        = var.region
  ssh_username  = var.ssh_username
}

build {
  sources = [
    "source.amazon-ebs.my_amazon_linux_image"
  ]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/home/ec2-user/webapp.zip"
  }

  provisioner "file" {
    source      = "./webapp.service"
    destination = "/tmp/webapp.service"
  }

  provisioner "file" {
    source      = "./nginx.conf"
    destination = "/tmp/nginx.conf"
  }


  provisioner "shell" {
    script = "./install-aws.sh"
  }

}
