const axios = require("axios")
const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")

init()

const writeFileAsync = util.promisify(fs.writeFile);

async function init(){
    console.log("YEET")
}

prompts();

function prompts(){
    return inquirer
    .prompt({
        message: "What is your Github username?",
        name: "username",
        type: "input",
    })
    .then(function({username}){
        const URL = `https://api.github.com/users/${username}`
        // const starURL = `https://api.github.com/users/${username}/starred`
    

    axios.get(URL).then(function(response){
        console.log(response.data)
        const name = response.login
        const avatar = response.avatar_url
    })

});
}

// axios 
//     .get("https://api.github.com/users/alexgignilliat")
//     .then(function(res){
//         console.log(res.data)
//     })

//     const name = res.login
//     const image = res.avatar_url
//     const githubURL = res.html_url
//     const bio = res.bio
//     const publicrepos = res.public_repos
//     const followers = res.followers
//     const following = res.following
//     const stars = "";


// init();

// function init(){
    
// }


// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init();