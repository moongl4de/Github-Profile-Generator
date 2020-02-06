const axios = require("axios")
const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")
const htmlJS = require("./generateHTML")


const userObject = {}

mainFunction();

function mainFunction(){

const questions = [{
    message: "What is your Github username?",
    name: "username",
    type: "input"
},
{
    message: "What is your favorite color?",
    choices: [ "Green", "Blue", "Pink", "Red"],
    name: "color",
    type: "list"
}]

prompts();
 
//build out the userData object as we go and then feed it to the htmlJS function as a parameter
const userData = {};

function prompts(){
    return inquirer
    .prompt(questions)
    .then(function(response){
        const URL = `https://api.github.com/users/${response.username}`
        console.log(response.color)
        userData.color = response.color;
        userData.username = response.username;
        userData.picture = response.avatar_url;
        userData.location = response.location;
        userData.githubLink = response.html_url
        userData.blog = response.blog
        userData.bio = response.bio;
        userData.followers = response.followers;
        userData.following = response.following;
        userData.publicRepos = response.public_repos
        
    
        return axios.get(URL);

    }).then(function(response){
        const userLogin = response.data.login
        console.log(response.data)
        console.log(response.color)
        githubStarred(userLogin)

        
    }).catch(err => {
        throw err;
    });
}


function githubStarred(input){
    const queryUrl = `https://api.github.com/users/${input}/repos`;
      axios.get(queryUrl).then(function(response) {
        console.log(response)
        let starCount = 0;
        for(i=1; i<response.data.length; i++)
            
           starCount += response.data[i].stargazers_count
           console.log(starCount)
           console.log(input)
           userData.stars = starCount
           
    }.finally(console.log(userData)
    ));
}
}








// module.exports = {
