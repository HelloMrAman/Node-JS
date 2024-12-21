import fs from "fs";
import os from "os";

//TO determine OS length (It determines THREAD size)
console.log(os.cpus().length);

// Sync.. ----> [BLOCKING REQUEST]
// fs.writeFileSync("./test.txt", "Hey there")

//Async.. ----> [NON-BLOCKING REQUEST]
//fs.writeFile("./test.txt", "Hey there Async", (err) => {})


//read file sync

// const result = fs.readFileSync("./test.txt", "utf-8");
// console.log(result)



//IMP-----> //read file async (does not return any thing so we can't store it in variables)
//we need one callback in async

// fs.readFile("./test.txt", "utf-8", (err, result) => {
//     if(err) {
//         console.log("Error", err);
//     } else {
//         console.log(result);
//     }
// });

//To avoid overwriting we use appendFileSync
// fs.appendFileSync("./test.txt", "Aman\n")

//To copy one file in another
// fs.cpSync("./test.txt", "./copy.txt");



//TO delete a file
// fs.unlinkSync("./copy.txt");