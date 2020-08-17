// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.role = 'Manager'
        this.officeNumber = officeNumber;
    }
    getRole() {
        return this.role;
    }
}

const crazy = new Manager("Crazy-Bob", 12499, "crazybob@gmail.com", 770-973-5150)
crazy.getEmail();

module.exports = Manager;