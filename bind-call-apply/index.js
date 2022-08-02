var object1 = {
    firstName : 'abc',
    lastName : 'xyz',
    getFullName : function() {
        console.log(this.firstName + " " + this.lastName);
    }
}

//Call Method (Mainly used to borrow method)

var object2 = {
    firstName : 'pqr',
    lastName : 'mno'
}

// We want to make a use of getFullName() method for object2 but don't want to write in the object.
// We can borrow this method from the object1

object1.getFullName.call(object2);


// Borrowing the regular function

function getCompleteName() {
    console.log(this.firstName + " " + this.lastName);
}

getCompleteName.call(object2);

// call function with the parameters

function getCompleteNameWithTown(hometown){
    console.log(this.firstName + " " + this.lastName + " from " + hometown );
}

getCompleteNameWithTown.call(object2, "Rajasthan");


function getDetails(hometown, profession){
    console.log(this.firstName + " " + this.lastName + " from " + hometown + " and is a " + profession );
}


// apply() methed differs from the call method form the way parameters passed to it
// We pass the parameters inside the list while using apply() method.

getDetails.apply(object2, ['UP', 'Engineer']);

//Bind method is used to bind the property so that it could be used later.

var bindProperty = getDetails.bind(object2, "MP", "Doctor");
bindProperty();