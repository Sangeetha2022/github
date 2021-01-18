# Maintenance and TechDebt Track

## Critical - Bugs or anything that affects professional happy path

- menu builder for screen access - this has been broken for a  while
- add the ability to "see" the template you are selected when creating a project
- Authorization Admin for Generated applications
-this is needed to allow access to control for the generated app
it is completed it just has to be integrated and tested
- activate Social Log in for Geppetto
- upgrade to latest Grapesjs

## Not Critical

- Allow users to "see" the template when they create a project
- dev ops cleanup of gepinfo every 7 calendar days
  - notifications - to start with the seven day cleanup, and T&Cs

- Login screen based on selected template - this is currently hard coded
- stripe for payments *this can be used in lowcode and dev tools*
- one to many phase one - see Developer track
- Template Manager recursive algorithm - this allows us to use GrapesJs/GJS object to modify the templates
- switch Geppetto UI to React or latest Angular
  - React pros
    - has the largest share of UI developers
    - this allows us to leverage next class of freshers to do this
    - [The Trends](https://medium.com/javascript-scene/top-javascript-frameworks-and-tech-trends-for-2021-d8cb0f7bda69)
    - because of the trends we need to make React the default generation target
  - React Cons
    - dependant on JP learning React and moving GrapesJs to React
  - Angular pros
    - its already coded in Angular should be less work than new React implementation
  - Angular cons
    - requires Angular developers what is the 10d strategy for training refreshers - React or Angular?