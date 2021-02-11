# Plan for HP Demo

## Final notes

We had the demo and nothing blew up, Sean noted that I was on a roll!
The team did very well! and I am very proud of them and what we accomplished
Dahyana form Colombia team attended, but I did not invite Paynalli as I though it best for them to focus on Reactive IDM as I did not think anything would financially come out of this demo/meeting
The feedback from the client Hang Ng - was typical of hard core techies - although an interesting idea he did not see how it could work for complex use cases

## Takes away

- we are on the right track
- we need to explain with a video/medium article/sample how you would extend what Geppetto generates into a more complex use case
- should we use the Video project?

## Goal/notes for Sprint

- We want to present to HP the current version of Geppetto
- Present HP/WCMX demo application
- Date/Time:  
  - IST: Friday February 5th @ 1:30 AM - 2:30 AM
  - EST: Thursday February 4th @ 3:00 PM - 4:00 PM

The idea is to blend this presentation/demo as much as possible into our sprint 2 work

## Assignments

- Siva
  - HP/WCMX must be running and need to prove the sync from wordpress is working #824
    - Kibana installed and working in Geppetto stage #824
    - Kibana installed and working in HP/WCMX   - this is #843
    - bug #844 build issue in stage


- jp
  - continue to incorporate authorization/camunda into generated app #805, #830, #833( critical for the demo), #834(service now)
  - if we don't think we can incorporate this in time for the demo

- George
  - priority bugs that affect HP demo #818 (already solved waiting testing), #797 (secondary entities - delete use case)

- Aruldas
  - priority bugs that affect HP demo #780

- Manavalan
  - deploymentmanager, and awsdeploymentmanager - Alpha github actions generation for EC2 **done for S3**
  - change default deployment to "local" #831, #832

- Manikandan
  - firebasegenerationmanger - Alpha generation (this show HP that Geppetto does NOT impose a technical stack)

- Mithun
  - integrate generated app with Camunda using the Ticket app as a guide #780 **partially done** **not done in generator**
  - create screen/service to allow an admin of the generated application to create/update roles/groups - currently this is hardcoded

- Arunodhayam/Harish
  - deploy ticket app (fargate or ec2 if fargate not ready) #797 - **done**
  - workout fargate - Manavlan will help since they keep having the NPM problem **done**

