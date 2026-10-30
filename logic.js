// let random = 0;
// function start(){
//     setInterval(randomSelct,600);
// }

// function randomSelct(){
//     let random = Math.floor(Math.random() * 8) + 1;
//     let btn = document.getElementById(random.toString());

//     let span = btn.querySelector("span");

//     span.classList.toggle("hide");

//     setTimeout(()=>{
//         span.classList.toggle("hide");
//     },500)
// }

// start();

const greeet = (a="world") => {
    console.log(`Hello ${a}`);
}

// all premitive data types are immutable in js

let arr = [1, 2, 3, 4, 5];

// let brr = arr;

// brr.push(6);

// console.log(arr);

let brr = [...arr];

brr.push(6);

console.log(arr);
console.log(brr);
