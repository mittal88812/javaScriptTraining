
// Using prototyping for the adding the custom functionality to the object
Object.prototype.customFunctionality = function() {
    console.log('this is a custom fucntionality using prototyping.');
}

// With the help of prototyping we could also change the inbuilt functionality but that is not recommended.

Object.prototype.length = function(){
    console.log("changing the inbuilt funtionality of Object");
}


// Creating the new functionality
var user = {
    getFullName : function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

var u1 = { 
    firstName : "ab",
    lastName : "cd"
}

var u2 = { 
    firstName : 'xy',
    lastName : 'z'
}

// These users will inherit the properties of the user

u1.__proto__ = user;
u2.__proto__ = user;

u1.getFullName();
u2.getFullName();

Object.customFunctionality();
u1.length();