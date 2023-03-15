# Webapp

### Implementing RestAPIs endpoints using NodeJS and Express

### Table of contents

- Prerequisites
- Build and Deploy Instructions
- Testing

### Prerequisites

- node should be installed before. Preferred version 16.14.2. If you do not have node installed, kindly visit [Node JS](https://nodejs.org/en/download/) to install it. Confirm npm is installed as well.
- To verify whether you have downloaded node and npm, please run the following commands
  - `node -v`
  - `npm -v`

### Build & Deploy Instructions

- Run the following command in the terminal to install dependent packages.\
  `npm install`
- Run the following command in the terminal to start the server.\
  `npm start`

### Testing

- Before testing, kindly ensure that you have previously downloaded the packages by running the command.\
  `npm install`
- Run the following command to run the unit tests\
  `npm test`

## Packer

Packer is a free and open source tool for creating golden images for multiple platforms from a single source configuration.

### Prerequisites

- You can download packer from this following [link](https://developer.hashicorp.com/packer/downloads)
- Make sure you have downloaded [AWS CLI](https://aws.amazon.com/cli/) and configure the profile

### Initialize Packer

To initialize packer, please give the following command

`packer init .`

### Packer Validate

To validate packer, please give the following command

`packer validate .`

To include the var file as well, please use the following command

`packer validate -var-file=<file-name>.pkrvars.hcl .`

### Packer Build

To build the AMI Package, please provide the following command

`packer build .`

To include the var file as well, please use the following command

`packer build -var-file=<file-name>.pkrvars.hcl .`

Demo-5

## This is for the DEMO-5
