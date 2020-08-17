// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, git) {
        super(name, id, email)
        this.role = 'Engineer'
        this.git = git;
    }
    getSchool() {
        return this.school;
    }
    getGithub() {
        return this.git;
    }
}

module.exports = Engineer;