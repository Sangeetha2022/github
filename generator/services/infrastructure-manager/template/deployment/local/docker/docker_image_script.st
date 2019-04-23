
docker_image_script(project_name,system_entry_path) ::= <<
#!/bin/bash

SYSTEMENTRYIMAGENAME='tharanirajan/$project_name$-system-entry:1.0'
# PORT='8000'
SYSTEMENTRYCODE='system_entry_path'


SYSTEMENTRYIMAGE=\$(docker images | awk '{ print \$1,\$2 }' | grep \$SYSTEMENTRYIMAGENAME | awk '{print \$1 }')


echo "Runing....."

cd \$SYSTEMENTRYCODE

updating_code () {

git pull

echo "Code updated sucessfully....."

}

delete_if_existing () {

if [ ! "\$SYSTEMENTRYIMAGE" ];
then
  echo "$project_name$-system-entry:1.0 Image is not available"
else
  echo "Deleting $project_name$-system-entry:1.0 Image"
  docker rmi -f \$SYSTEMENTRYIMAGENAME
  echo "Deleted...."
fi

}

build_and_push_image () {

docker build -t \$SYSTEMENTRYIMAGENAME .
if [ \$? -eq 0 ]; then
    echo "image build sucessfully"
    docker push \$SYSTEMENTRYIMAGENAME
    if [ \$? -eq 0 ]; then
        echo "image $project_name$-system-entry:1.0 pushed sucessfully"
    else
        echo "image $project_name$-system-entry:1.0 push failed"
    fi
else
    echo "image build failed"
fi

}

# updating_code
delete_if_existing
build_and_push_image
>>