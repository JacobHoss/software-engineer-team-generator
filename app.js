const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const managerQuestions = [{
    type: "input",
    message: "What is the your Name?",
    name: "name",
    validate: function (name) {
        if (typeof parseInt(name) === "Number") {
            return "Please don't enter a number in the name field"
        }
        if (name === "") {
            return "Please type something in"
        }
        return true;
    }
},
{
    type: "input",
    message: "What is the your ID?",
    name: "id",
    validate: function (id) {
        if (typeof parseInt(id) === 'Number') {
            return "Please enter a valid number"
        }
        if (id.length <= 0 || id.length > 10) {
            return "Please enter a number with 1-10 digits."
        }
        return true;
    }
},
{
    type: "input",
    message: "What is the your email?",
    name: "email",
    validate: function (email) {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (valid) {
            return true;
        } else {
            return "Please enter a valid email"
        }
    }
},
{
    type: "input",
    message: "What is the your Office Number?",
    name: "officeNumber"
}
];

const questions = [
    {
        type: "input",
        message: "What is their Name?",
        name: "name",
        validate: function (name) {
            if (typeof parseInt(name) === "Number") {
                return "Please don't enter a number in the name field"
            }
            if (name === "") {
                return "Please type something in"
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is their ID?",
        name: "id",
        validate: function (id) {
            if (typeof parseInt(id) === 'Number') {
                return "Please enter a valid number"
            }
            if (id.length <= 0 || id.length > 10) {
                return "Please enter a number with 1-10 digits."
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is their email?",
        name: "email",
        default: () => { },
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
                return true;
            }
            else {
                return "Please enter a valid email"
            }
        }
    },
    {
        type: "input",
        message: "What is their Github?",
        name: "github",
        validate: function (github) {
            if (github === "") {
                return "Please type something in"
            }
            return true;
        }
    }
];

const school = {
    type: "input",
    message: "What is their school?",
    name: "school",
    validate: function (school) {
        if (school === "") {
            return "Please type something in"
        }
        return true;
    }
};

function getManager() {
    inquirer.prompt(managerQuestions).then(response => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);
        addTeamMember();
    })
}

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which team member would you like to add?",
            name: "teamMember",
            choices: ["Engineer", "Intern", "I don't want anymore team members"]
        }
    ]).then(response => {
        if (response.teamMember === "Engineer") {
            return getEngineer();
        } else if (response.teamMember === "Intern") {
            return getIntern();
        } else {
            return fs.writeFileSync(outputPath, render(employees), "utf-8");
        }
    })
}
function getEngineer() {
    inquirer.prompt(questions).then(response => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        addTeamMember();
    });
}
function getIntern() {
    questions.pop();
    questions.push(school);
    inquirer.prompt(questions).then(response => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        addTeamMember();
    });
}

getManager(); // this function starts the application