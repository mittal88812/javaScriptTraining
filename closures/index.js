function x(){
    var a = 7;
    function y(){
        console.log(a);
    }
    a = 10;
    return(y);
}

var z = x();
console.log(z);
// function will not lost its reference to 'a' even if it not its execution context has lost
z();