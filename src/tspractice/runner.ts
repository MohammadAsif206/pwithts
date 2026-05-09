import readline from "readline";
import { TSPractice } from "./TSPractice";

// Get user input
const getMsg = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const result = new TSPractice([]);

getMsg.question("Enter number of array to be created: ", (answer:string) => {
  const n = Number(answer);

  if (isNaN(n) || n <= 0) {
    console.log("Invalid number");
    getMsg.close();
    return; // ✅ stop execution
  }

  console.log("Number is:", n);

  // Create input array
  const arr: number[] = [];

  for (let i = 0; i < n; i++) {
    
    let num = Math.floor(Math.random() * 10);
    if(!arr.includes(num)){
        arr.push(num);
    }
  }

  console.log("Original array:", arr);

  // Call your function
  const result = new TSPractice(arr);

  console.log("Processed array:", result.bubbleSort());

  getMsg.close();
});
const data = [1, [2, [3, [4, [5]]]]];
console.log('============ flattend array : ',result.flattenNestedArr(data))