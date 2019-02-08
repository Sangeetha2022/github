var apiAdapter = require('../apis/apiAdapter')

module.exports.addProject = async (req, res) => {
    apiAdapter.post('http://127.0.0.1:3000/add', req.body).then(proj => {
        res.send(proj)
    }).catch(err => {
        res.send(err)
    });;
}
module.exports.getAllProject = async (req, res) => {
    apiAdapter.get('http://127.0.0.1:3001/getall').then(allproject => {
        res.send(allproject)
    }).catch(err => {
        res.send(err)
    });;
}

module.exports.getProjectById = async (req, res) => {
    apiAdapter.get('http://127.0.0.1:3000/getbyid'+ req.path.id).then(proj => {
        res.send(proj)
    }).catch(err => {
        res.send(err)
    });;
}

module.exports.deleteProject = async (req, res) => {
    apiAdapter.delete('http://127.0.0.1:3000/getbyid'+ req.path.id).then(proj => {
        res.send(proj)
    }).catch(err => {
        res.send(err)
    });;
}