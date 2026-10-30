function isArmstrongNumber(num) {
    const dig = num.toString().split('');

    const n = dig.length;

    const sum = dig.reduce((acc, dig) => acc + Math.pow(Number(dig), n), 0);

    return sum === num;
}

console.log(isArmstrongNumber(153)); 