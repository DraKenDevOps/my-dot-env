import dotenv from "./lib/main";

console.time("finish process.env");
dotenv.config();
console.timeEnd("finish process.env");
console.log(JSON.stringify(process.env));
