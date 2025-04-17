function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function processArray() {
    let input = prompt("Nhập các số nguyên, cách nhau bằng dấu cách (tối đa 50 số):");
    let arr = input.split(" ").map(Number);

    if (arr.length > 50) {
        alert("Vui lòng nhập tối đa 50 số.");
        return;
    }

    let primeArray = arr.filter(isPrime);

    console.log("Mảng a ban đầu:", arr);
    console.log("Mảng b chứa các số nguyên tố của mảng a:", primeArray);

    document.getElementById("result").innerHTML = `
        <p>Mảng a: [${arr.join(", ")}]</p>
        <p>Mảng b (số nguyên tố): [${primeArray.join(", ")}]</p>
    `;
}
processArray()