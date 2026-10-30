const userInput = prompt("Enter a number:");

const number = parseInt(userInput, 10);

if (!isNaN(number)) {

    const binary = number.toString(2);

    const hexadecimal = number.toString(16).toUpperCase();

    console.log(`Binary: ${binary}`);
    console.log(`Hexadecimal: ${hexadecimal}`);
} else {
    console.log("Invalid input. Please enter a valid number.");
}