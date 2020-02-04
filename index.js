const axios = require("axios")
const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")
const htmlJS = require("./generateHTML")

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
        // const starsURL = `https://api.github.com/users/${username}/starred`
    

    axios.get(URL).then(function(response){
        console.log(response.data)
        const name = response.login
        const avatar = response.avatar_url
    })

});
}


init();



// init();

// function init(){
    
// }


// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init();