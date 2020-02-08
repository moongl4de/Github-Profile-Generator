const axios = require("axios")
const inquirer = require("inquirer")
const fs = require("fs")
const htmlJS = require("./generateHTML")
const pdf = require('html-pdf');

function userInput() {
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
    prompts(questions);
}

//Big shout out to Esterling and Matt for helping me refactor my code and understand async/await. If you look at my past commits, I had so many different functions and while it worked, it was a total disaster to look at. 

const prompts = async function(questions) {

    try {
        const userInput = await inquirer.prompt(questions);
        const userProfile = await axios.get(`https://api.github.com/users/${userInput.username}`);
        const userStars = await axios.get(`https://api.github.com/users/${userInput.username}/repos`);

        let starCount = 0;

        for (let i = 1; i < userStars.data.length; i++)
            starCount += userStars.data[i].stargazers_count
        const updatedUser = { ...userProfile.data, color: userInput.color.toLowerCase(), stars: starCount };

        //writing file to html, calling function from generateHTML.js
        
        const htmlData = htmlJS.generateHTML(updatedUser);
        fs.writeFile('index.html', htmlData, 'utf8', function (error) {
            if (error) {
                console.log(error)
            }
        });
        //converting htmlData to pdf
        //For some reason, flex doesn't work with html-to-pdf, so the HTML display just fine but as a PDF, some things aren't where they need to be.
        const options = { format: 'Letter' };
        pdf.create(htmlData, options).toFile('./githubProfileDocument.pdf', function (error, response) {
            if (error) return console.log(error);
            console.log(response);
        });
    } catch (err) {
        console.log(err)
    }
}
//Main function... I'm not sure if this is the best or even right way but hey, it works!
userInput();