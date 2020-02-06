const axios = require("axios")
const inquirer = require("inquirer")
const fs = require("fs")
// const path = require("path")
// const util = require("util")
const htmlJS = require("./generateHTML")
var pdf = require('html-pdf'); 

// Debugger
// console.log('Process PID: ', process.pid);
mainFunction();
function mainFunction() {
    const questions = [{
        message: "What is your Github username?",
        name: "username",
        type: "input"
    }, {
        message: "What is your favorite color?",
        choices: ["Green", "Blue", "Pink", "Red"],
        name: "color",
        type: "list"
    }]
    prompts();
    //build out the userData object as we go and then feed it to the htmlJS function as a parameter
    const userData = {};
    function prompts() {
        return inquirer
            .prompt(questions)
            .then(function (response) {
                const URL = `https://api.github.com/users/${response.username}`;
                // TODO - make a http request
                // console.log(response.color)
                userData.color = response.color.toLowerCase();
                userData.username = response.username;
                return axios.get(URL);
            }).then(function (response) {
                const userLogin = response.data.login;
                userData.picture = response.data.avatar_url;
                userData.location = response.data.location;
                userData.githubLink = response.data.html_url
                userData.blog = response.data.blog
                userData.bio = response.data.bio;
                userData.followers = response.data.followers;
                userData.following = response.data.following;
                userData.publicRepos = response.data.public_repos
                userData.name = response.data.name
                userData.public_repos = response.data.public_repos
                userData.avatar_url = response.data.avatar_url
                // console.log(response.data)
                // console.log(response.color)
                githubStarred(userLogin)
                //writing file to html
                const htmlData = htmlJS.generateHTML(userData);
                // Async
                fs.writeFile('index.html', htmlData, 'utf8', function (error, data) {
                    if (error) {
                        // TODO - do something
                    } else {
                        // TODO - do something else
                    }
                });
                console.log('Hello World!!');
                // TODO - Write the PDF right he
                var options = { format: 'Letter' };
                pdf.create(htmlData, options).toFile('./developerProfile.pdf', function(error, response) {
                    if (error) return console.log(error);
                    console.log(response); // { filename: '/app/businesscard.pdf' }
                  });
            }).catch(err => {
                throw err;
            });
    }
    function githubStarred(input) {
        const queryUrl = `https://api.github.com/users/${input}/repos`;
        axios.get(queryUrl).then(function (response) {
                // console.log(response)
                let starCount = 0;
                for (i = 1; i < response.data.length; i++)
                    starCount += response.data[i].stargazers_count
                console.log(starCount)
                console.log(input)
                userData.stars = starCount
            })
            .then(() => {
                console.log('Hello World!!');
            })
            .catch(() => {
                console.log('Hello World!!');
            })
            .finally(() => {
                console.log(userData)
            })
    }
}
