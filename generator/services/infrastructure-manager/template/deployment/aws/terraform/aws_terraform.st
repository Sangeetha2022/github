aws_terraform(project_name,aws_access_key,aws_secret_key,ssh_key_name) ::= <<
# Amazon AWS Access Key
aws_access_key = "$aws_access_key$"

# Amazon AWS Secret Key
aws_secret_key = "$aws_secret_key$"

# Amazon AWS Key Pair Name
ssh_key_name = "$ssh_key_name$"

# Region where resources should be created
region = "us-east-1"

# Resources will be prefixed with this to avoid clashing names
prefix = "$project_name$"

# Admin password to access Rancher
admin_password = "admin"

# rancher/rancher image tag to use
rancher_version = "latest"

# Count of agent nodes with role all
count_agent_all_nodes = "1"

# Count of agent nodes with role etcd
count_agent_etcd_nodes = "1"

# Count of agent nodes with role controlplane
count_agent_controlplane_nodes = "0"

# Count of agent nodes with role worker
count_agent_worker_nodes = "1"

# Docker version of host running `rancher/rancher`
docker_version_server = "17.03"

# Docker version of host being added to a cluster (running `rancher/rancher-agent`)
docker_version_agent = "17.03"

# AWS Instance Type
type = "t2.micro"
>>