var apiAdapter = require('../apis/apiAdapter')

module.exports.getAllFlows = async (req, res) => {
    apiAdapter.get('http://127.0.0.1:3001/flow/getall', req.body).then(proj => {
        res.send(proj)
    }).catch(err => {
        res.send(err)
    });;
}
module.exports.getFlowDetails = async (req, res) => {
    let dataToSend = {}
    let flowdata = {}
    console.log("- -- - -  - > > >  .", req.params)
    apiAdapter.get('http://127.0.0.1:3001/generation_flow/getbyname/' + req.params.name).then(flowdetails => {
        // flowdata = flowdetails
        // console.log(" - - - -  000000- >>  ", flowdata)
        // console.log(" - - - - 222222 - >>  ", flowdata)
        res.send(flowdetails)
        // dataToSend = {
        //     flow_name: flowdata.
        // }
    }).catch(err => {
        res.send(err)
    });;
}

// module.exports.getProjectById = async (req, res) => {
//     apiAdapter.get('http://127.0.0.1:3000/getbyid'+ req.path.id).then(proj => {
//         res.send(proj)
//     }).catch(err => {
//         res.send(err)
//     });;
// }

// module.exports.deleteProject = async (req, res) => {
//     apiAdapter.delete('http://127.0.0.1:3000/getbyid'+ req.path.id).then(proj => {
//         res.send(proj)
//     }).catch(err => {
//         res.send(err)
//     });;
// }