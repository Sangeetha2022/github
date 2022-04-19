# AWS SampleApplication fargate deployed Above 10 microservices
We are migrating our core site and services to Fargate in order to simplify our DevOps. Fargate allows users of Amazon’s Elastic Container Service to deploy a collection of containerized services without managing the servers on which they run. This is a very powerful distinction: before Fargate, one had to manage both the deployment and scaling of containers via ECS in addition to the auto-scaling of the EC2 boxes running the containers. This added simplicity (subtracted complexity?) had just the activation energy we needed to make the switch for our DevOps processes.

## Prerequisites
In order to get started, you’ll need to have completed the following steps.

- Have an AWS Account
- Set your AWS Region to one where Fargate is available (currently only Northern Virginia, Ohio, Oregon, and Ireland)

## Setting up ECS from the AWS Management Console
The first step for setting up AWS Fargate is to make sure that we have a properly configured ECS environment. In this step, we want to make sure of the following:

- You have created an IAM user
- You have created a Security Group with the appropriate ECS permissions

# ECS Fargate Basics
## Terminology
- **Task Definition:** The blueprint for a task, which is used by ECS to launch containers.
- **Task:** A group of one or more containers launched and maintained by ECS based on a preset Task Definition. This is the smallest unit.
- **Service:** A service encapsulates a specific group of like tasks and is most commonly used to scale tasks. A service is not required to run a task.
- **Cluster:** A physical grouping of underlying servers that holds all of your services, tasks, etc. This is the largest unit.
- **ECR:** Elastic Container Registry hosts images similar to Docker Hub.


<p align="center">
<a href="https://www.geppettosoftware.com/"><img src="https://img.shields.io/badge/-Geppettosoftware.com-3423A6?style=flat&logo=Google-Chrome&logoColor=white"/></a>
<a href="https://twitter.com/GeppettoSoftwr"><img src="https://img.shields.io/badge/-Geppetto%20Software-0077B5?style=flat&logo=Twitter&logoColor=white"/></a>
<a href="mailto:info@geppettosoftware.com"><img src="https://img.shields.io/badge/-info@geppettosoftware.com-D14836?style=flat&logo=Gmail&logoColor=white"/></a>
