const { readFileSync} = require("node:fs")
const https = require('https')

class ClientCredentials
{
    projectId
    clientToken
    constructor(project, token) {
        this.projectId = project
        this.clientToken = token
    }
}

class Client {
    client_credentials;
    constructor(runcfg_path) {
        let content = readFileSync(runcfg_path)
        let jsn = JSON.parse(content)
        this.client_credentials = new ClientCredentials(jsn.projectId, jsn.clientToken)
    }

    async Load(objectType) {
        const headers = {
            "Authorization": `${this.client_credentials.clientToken}`,
            "User-Agent": `runcfg-js/1.0.0`
        }
        return new Promise((resolve, reject) => {
            let body = [];
            https.get(
            `https://runcfg.com/app/project/${this.client_credentials.projectId}/view`,
            { headers: headers }, resp => {
                resp.on('data', (chunk) => {
                    body.push(chunk);
                });

                resp.on('end', () => {
                    let output = JSON.parse(Buffer.concat(body).toString())
                    resolve(Object.assign(JSON.parse(output), objectType));
                });

                resp.on('error', err => reject(err))
            })
        })
    }
}

module.exports = {
    Client
}