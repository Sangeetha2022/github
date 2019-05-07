
jenkins_system_entry_script(project_name,system_entry_path,base_path) ::= <<
<?xml version='1.1' encoding='UTF-8'?>
<project>
  <actions/>
  <description>This job will build image for generated applications</description>
  <keepDependencies>false</keepDependencies>
  <properties/>
  <scm class="hudson.scm.NullSCM"/>
  <canRoam>true</canRoam>
  <disabled>false</disabled>
  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
  <triggers/>
  <concurrentBuild>false</concurrentBuild>
  <builders>
    <hudson.tasks.Shell>
      <command>#!/bin/bash

sudo su - root
BASEPATH=&apos;$base_path$&apos;

SYSTEMENTRYCODE=&apos;$system_entry_path$&apos;
SYSTEMENTRYIMAGENAME=&apos;tharanirajan/$project_name$-system-entry:1.0&apos;


SYSTEMENTRYIMAGE=\$(sudo docker images | awk &apos;{ print \$1,\$2 }&apos; | grep tharanirajan/$project_name$-system-entry | awk &apos;{print \$1 }&apos;)



echo &quot;Runing.....&quot;


update_code () {

cd \$BASEPATH

git pull
if [ \$? -eq 0 ]; then
    echo &quot;Code updated sucessfully.....&quot;
else
    echo &quot;git pull failed!&quot;
fi

}

delete_if_existing_system_entry () {

if [ ! &quot;\$SYSTEMENTRYIMAGE&quot; ];
then
  echo &quot;$project_name$-system-entry:1.0 Image is not available&quot;
else
  echo &quot;Deleting $project_name$-system-entry:1.0 Image&quot;
  sudo docker rmi -f \$SYSTEMENTRYIMAGENAME
  echo &quot;Deleted....&quot;
fi

}

build_and_push_image_system_entry () {

cd \$SYSTEMENTRYCODE
sudo npm install
sudo npm install --unsafe-perm node-sass
sudo ng build
if [ \$? -eq 0 ]; then
    sudo docker build -t \$SYSTEMENTRYIMAGENAME .
    if [ \$? -eq 0 ]; then
        echo &quot;image build sucessfully&quot;
        sudo docker push \$SYSTEMENTRYIMAGENAME
        if [ \$? -eq 0 ]; then
            echo &quot;image $project_name$-system-entry:1.0 pushed sucessfully&quot;
        else
            echo &quot;image $project_name$-system-entry:1.0 push failed&quot;
        fi
    else
        echo &quot;$project_name$-system-entry:1.0 image build failed&quot;
    fi
else
    echo &quot;ng build failed!&quot;
fi
}



#update_code
delete_if_existing_system_entry
build_and_push_image_system_entry</command>
    </hudson.tasks.Shell>
  </builders>
  <publishers/>
  <buildWrappers/>
</project>
>>