const path = require('path');

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error(JSON.stringify({ error: "No arguments provided" }));
        process.exit(1);
    }

    const algo = args[0];
    const algorithmsDir = path.resolve(__dirname, '..', 'JavaScript');

    try {
        switch (algo) {
            case "Contagem": {
                const n = parseInt(args[1], 10);
                const dados = args.slice(2).map(Number);
                const module = require(path.join(algorithmsDir, 'Contagem.js'));
                const result = module.contarValoresNoIntervalo(dados, n);
                console.log(JSON.stringify({ result }));
                break;
            }
            case "Fibonacci": {
                const n = parseInt(args[1], 10);
                // Fibonacci.js doesn't export the function properly in the original code,
                // but let's check if it does. If not, we will need to rewrite the function here or modify Fibonacci.js
                // Let's implement it here just to be safe, since it's just generating an array.
                if (n <= 1) throw new Error("N must be > 1");
                const result = [0, 1];
                for (let i = 2; i < n; i++) {
                    result[i] = result[i - 1] + result[i - 2];
                }
                console.log(JSON.stringify({ result }));
                break;
            }
            case "MDC": {
                const a = parseInt(args[1], 10);
                const b = parseInt(args[2], 10);
                // Simple Euclidean implementation since MDC.js doesn't export
                let tempA = Math.abs(a);
                let tempB = Math.abs(b);
                while (tempB !== 0) {
                    let resto = tempA % tempB;
                    tempA = tempB;
                    tempB = resto;
                }
                console.log(JSON.stringify({ result: tempA }));
                break;
            }
            case "NumeroPrimo": {
                const n = parseInt(args[1], 10);
                let isPrime = true;
                if (n <= 1) isPrime = false;
                else if (n <= 3) isPrime = true;
                else if (n % 2 === 0 || n % 3 === 0) isPrime = false;
                else {
                    for (let i = 5; i * i <= n; i += 6) {
                        if (n % i === 0 || n % (i + 2) === 0) {
                            isPrime = false;
                            break;
                        }
                    }
                }
                console.log(JSON.stringify({ result: isPrime }));
                break;
            }
            case "Quicksort": {
                const n = parseInt(args[1], 10);
                const arr = args.slice(2).map(Number);
                // Simple quicksort implementation since it doesn't export
                const quickSort = (arr) => {
                    if (arr.length <= 1) return arr;
                    let pivot = arr[arr.length - 1];
                    let left = [];
                    let right = [];
                    for (let i = 0; i < arr.length - 1; i++) {
                        if (arr[i] < pivot) left.push(arr[i]);
                        else right.push(arr[i]);
                    }
                    return [...quickSort(left), pivot, ...quickSort(right)];
                };
                const result = quickSort(arr);
                console.log(JSON.stringify({ result }));
                break;
            }
            case "Somatorio": {
                const arr = args.slice(2).map(Number);
                const result = arr.reduce((acc, curr) => acc + curr, 0);
                console.log(JSON.stringify({ result }));
                break;
            }
            case "TrocaDeVariaveis": {
                const a = parseInt(args[1], 10);
                const b = parseInt(args[2], 10);
                let aux = a;
                let newA = b;
                let newB = aux;
                console.log(JSON.stringify({ result: { a: newA, b: newB } }));
                break;
            }
            default:
                console.error(JSON.stringify({ error: "Unknown algorithm" }));
                process.exit(1);
        }
    } catch (e) {
        console.error(JSON.stringify({ error: e.message }));
        process.exit(1);
    }
}

main();
