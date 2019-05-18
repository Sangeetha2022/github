ios_jenkins_build(project_name,base_path,workspace,code_path,git_url) ::= <<
<?xml version='1.1' encoding='UTF-8'?>
<project>
  <actions/>
  <description>IPA Build Jenkins Job</description>
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


BASEPATH=&apos;$base_path$&apos;
WORKSPACE=&apos;$workspace$&apos;
CODEPATH=&apos;$code_path$&apos;
PROJECTNAME=&apos;$project_name$&apos;
GITURL=&apos;$git_url$&apos;


get_code(){

cd &quot;\$BASEPATH\$WORKSPACE&quot;


if [ ! -d &quot;\$PROJECTNAME&quot; ] ; then
    echo &quot;running git clone..&quot;
    git clone \$GITURL
    if [ \$? -eq 0 ]; then
        echo &quot;git clone sucessfull!&quot;
    else
        echo &quot;git clone failed!&quot;
    fi
else
    echo &quot;code exists!&quot;
    cd \$PROJECTNAME
    git pull
    if [ \$? -eq 0 ]; then
        echo &quot;git pull sucessfull!&quot;
    else
        echo &quot;git pull failed!&quot;
    fi    
fi

}

build_ipa(){

cd &quot;\$BASEPATH\$WORKSPACE\$CODEPATH&quot;

if [ ! -d &quot;www&quot; ] ; then
    mkdir www
    cordova platform add ios
    if [ \$? -eq 0 ]; then
        echo &quot;ios platform added sucessfully!&quot;
        cordova build ios --device
        if [ \$? -eq 0 ]; then
            echo &quot;ios build success!&quot;
        else
            echo &quot;ios build failed!&quot;
        fi
    else
        echo &quot;add ios platform failed!&quot;
    fi
else
    cordova platform add ios
    if [ \$? -eq 0 ]; then
        echo &quot;ios platform added sucessfully!&quot;
        cordova build ios --device
        if [ \$? -eq 0 ]; then
            echo &quot;ios build success!&quot;
        else
            echo &quot;ios build failed!&quot;
        fi
    else
        echo &quot;add ios platform failed!&quot;
    fi
fi

}


get_code
build_ipa</command>
    </hudson.tasks.Shell>
  </builders>
  <publishers/>
  <buildWrappers/>
</project>
>>