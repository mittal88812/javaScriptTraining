// function sum(a, b) {
//     console.log('The execution of callback function has started.');

//     console.log('The execution of callback function has ended.');
    
    
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             console.log('This is working fine.');
//             resolve(a+b);
//         }, 2000);
        
//     });



//    // return (a+b);
// }

// function asyncCall(a, b, cb){

//     console.log('The execution of main function has started');

//     let s = cb(a, b);

//     console.log('Execution of callback has ended with the answer .',s);

//     console.log('The execution of main function had ended.');

// }

// asyncCall(5, 3, sum);
// Without using  anything.

let datas = [
    {"name" : "Tushar", "Place" : "UP"},
    {"name" : "Dishant", "Place" : "Rajasthan"}
];

function getData(){
    setTimeout(()=>{
        console.log("Getting the data without anything ",datas);
    }, 2000);
}

function addData(){
    setTimeout(()=>{
        datas.push({"name":"Harshit", "Place": "Kanpur"});
        console.log("Added the data without anything ",datas);
    },3000);
}

addData();
getData();


//With Using Callbacks

let datasCallback = [
    {"name" : "Tushar", "Place" : "UP"},
    {"name" : "Dishant", "Place" : "Rajasthan"}
];

function getDataCallback(){
    setTimeout(()=>{
        console.log("Getting the data with callback ",datasCallback);
    }, 2000);
}

function addDataCallback(cb){
    setTimeout(()=>{
        datasCallback.push({"name":"Harshit", "Place": "Kanpur"});
        cb();
    },3000);
}

addDataCallback(getDataCallback);

// With using Promise

let datasPromise = [
    {"name" : "Tushar", "Place" : "UP"},
    {"name" : "Dishant", "Place" : "Rajasthan"}
];

function getDataPromise(){
    setTimeout(()=>{
        console.log("Getting the data with using Promise.",datasPromise);
    }, 2000);
}

function addDataPromise(cb){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            try{
            datasPromise.push({"name":"Harshit", "Place" : "Kanpur"});
            resolve();
        }
            catch(err){
                reject(err);
            }
        },2000);
    });
}

addDataPromise().then(getDataPromise);


// With using async,await

async function start(){
    await addDataPromise();
    getDataPromise();
}

start();




