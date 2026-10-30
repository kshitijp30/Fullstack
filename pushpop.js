// let arr=[1,2,3,4,5];
// console.log(arr);

// // arr.push(6);
// // console.log(arr);

// // arr.unshift(0);
// // console.log(arr);

// // arr.pop();
// // console.log(arr);

// // arr.shift();
// // console.log(arr);

// console.log(arr.join("lol"));

// arr.f = "bar";
// console.log(arr);

// ?? -> Nulliesh coalesence 
// let price = 100, quantity;
// let total = price * Number.parseInt(quantity??1);
// console.log(total);

// ?. (Optional chaining) & ??= (nullish coalesence assignment operator)
// let obj = {
//     name: "aba",
//     location :{
//         city: "NYC",
//         country: "USA"
//     }
// };

// console.log(obj.location.state??='California');
// console.log(obj);

// console.log("inner text:", document.getElementById("p").innerText);
// console.log("text content:", document.getElementById("p").textContent);

let btn = document.querySelector("#btn");
let p = document.querySelector("#p");
btn.addEventListener("click",() =>{p.classList.toggle("hide")} );