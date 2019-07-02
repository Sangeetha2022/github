
import { Request } from 'express';
import * as simplegit from 'simple-git/promise';
import * as request from "request-promise-native";
import { GithubConfig } from '../config/GithubConfig';

let git = null;
let commitTo = 'GitHub';

export class GitHubService {

    checkIfRepoExist = (req: Request, callback: CallableFunction) => {
        const details = req.body;
        const path = `${details.codeGenerationPath}/${details.name}`;
        git = simplegit(path)
        let creds = {};
    try {
        git.checkIsRepo().then((status) => {
            this.githubCreds((response) => {
                creds = response;
                if (!status && commitTo.toLocaleLowerCase() === 'github') {
                    this.createRepoInGitHub(creds, details, callback)
                } else {
                    this.updateGitRepo(creds, callback)
                }
            })
        })
    } catch(err) {
        callback('cannot able to push the code in github');
    }
    }

    private githubCreds(callback) {
        let gConfig = new GithubConfig();
        gConfig.githubConfig(function (response) {
            callback(response);
        });
    }

    private createRepoInGitHub = async (creds, details,callback) => {
        let gitBody = {
            "name": details.name,
            "description": "Generated by Geppetto",
            "homepage": "",
            "private": false,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true
        }

        let USER = creds.username;
        let PASS = creds.password;
        let remote = `https://${USER}:${PASS}@api.github.com/user/repos`
        await request({
            uri: remote,
            method: "POST",
            json: gitBody,
            headers: {
                'User-Agent': "https://api.github.com/meta",
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            this.initializeGitAndPushToSource(resp.html_url, creds, callback)
        }).catch((err) => {
            callback(err.error.message)
        })
    }

    private initializeGitAndPushToSource = (gitRemote, creds, callback) => {
        git.init().then(() => {
            return git.add('.')
        }).then(() => {
            return git.addConfig('user.name', creds.username)
        }).then(() => {
            return git.addConfig('user.email', creds.email)
        }).then(() => {
            return git.commit("code commited from geppetto!")
        }).then(() => {
            return git.addRemote('origin', gitRemote)
        }).then(() => {
            return git.push('origin', 'master');
        }).then(() => {
            return git.checkoutLocalBranch('geppetto');
        }).then(() => {
            return git.add('.')
        }).then(() => {
            return git.push(['-u', 'origin', 'geppetto']);
        }).then((status) => {
            callback("Git Init And Pushed to New Repo.")
        })
    }

    private updateGitRepo = (creds, callback) => {
        git.add('.').then(() => {
            return git.addConfig('user.name', creds.username)
        }).then(() => {
            return git.addConfig('user.email', creds.username)
        }).then(() => {
            return git.commit("updated generated code")
        }).then(() => {
            return git.push('origin', 'geppetto');
        }).then((status) => {
            callback("Git code updated with new changes.")
        })
    }
}