import { Request } from 'express';
import * as simplegit from 'simple-git/promise';
import * as request from "request";

let git = null;

export class SourceControlService {

    checkIfRepoExist = (req: Request, sourceControlDto, callback: CallableFunction) => {
        // let username = sourceControlDto.get.username()
        git = simplegit('/Users/10decoders/Desktop/test/')

        git.checkIsRepo().then((status) => {
            if (status) {
                this.updateGitRepo(callback)
            } else {
                this.createRepoInGitHub(callback)
            }
            console.log(" - - - >  ", status)
        })
    }

    private createRepoInGitHub = (callback) => {
        let gitBody = {
            "name": "Hello-World-2",
            "description": "This is your first repository",
            "homepage": "",
            "private": false,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true
        }
        
        let USER = 'tibrahul'
        let PASS = 'Rahul6243'
        let remote = `https://${USER}:${PASS}@api.github.com/user/repos`

        request({
            uri: remote,
            method: "POST",
            json: gitBody,
            headers: {
                'User-Agent': "https://api.github.com/meta",
                'Content-Type': 'application/json'
            }
        }, (error, response, body) => {
            if (error !== null) {
                console.log(" =     >   >    >>    >>>    >>>>  ", error)
            } else {
                console.log(" =     >   >    >>   COMING HEER TOO >>>    >>>>  ")
                this.initializeGitAndPushToSource(body.html_url, callback)
            }
            console.log(" = = response.statusCode= = > ", response.statusCode)
            console.log(" = =error = = > ", error)
            console.log(" = = body= = > ", body)
        });

    }

    private initializeGitAndPushToSource = (gitRemote, callback) => {
        git.init().then(()=> {
            return git.add('./*')
        }).then(()=> {
            return git.addConfig('user.name', 'Rahul Tibrewal')
        }).then(()=> {
            return git.addConfig('user.email', 'rahul.tiberwal@10decoders.in')
        }).then(()=> {
            git.commit("first commit!")
        }).then(()=> {
            git.addRemote('origin', gitRemote)
        }).then(()=> {
            git.push('origin', 'master');
        }).then((status)=> {
            console.log("------> > ", status)
        })
        
        callback("Git Init And Pushed to New Repo.")
    }

    private updateGitRepo = (callback) => {
        git.add('./*').then(()=> {
            return git.addConfig('user.name', 'Rahul Tibrewal')
        }).then(()=> {
            return git.addConfig('user.email', 'rahul.tiberwal@10decoders.in')
        }).then(()=> {
            git.commit("updated Github code")
        }).then(()=> {
            git.push('origin', 'master');
        }).then((status)=> {
            console.log("------> > ", status)
        })
        callback("Git code updated with new changes.")
    }

}