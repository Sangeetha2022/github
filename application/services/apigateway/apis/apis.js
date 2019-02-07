var express = require("express");
var router = express.Router();
let projectController = require('../routes/projectroutes')
let flowController = require('../routes/flowsroute')

router.post('/project/add', projectController.addProject)
router.get('/project/getbyid/:id', projectController.getProjectById)
router.get('/project/getall', projectController.getAllProject)
router.get('/project/delete/:id', projectController.deleteProject)

router.get('/flow/getall', flowController.getAllFlows)
router.get('/flow/details/getbyname/:name', flowController.getFlowDetails)

// TODO: for later I added.
// router.get('/flow/componentdetails/getbyname/:name', flowController.getComponentDetails)

module.exports = router;