const readline = require('node:readline');

/**
 * Algoritmo para Verificação de Número Primo
 * Determina se um número inteiro positivo é primo.
 */

/**
 * Verifica se um número inteiro é primo.
 *
 * @param {number} n Número a ser testado.
 * @returns {boolean} True se for primo, false caso contrário.
 */
function ehPrimo(n) {
    // Números menores ou iguais a 1 não são primos
    if (n <= 1) {
        return false;
    }
    // 2 e 3 são primos
    if (n <= 3) {
        return true;
    }
    // Elimina pares e múltiplos de 3
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }

    // Verifica divisores da forma 6k ± 1 até a raiz quadrada de n
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }

    return true;
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const iterador = rl[Symbol.asyncIterator]();

    const perguntar = async (mensagem) => {
        process.stdout.write(mensagem);
        const { value, done } = await iterador.next();
        return done ? '' : value.trim();
    };

    try {
        const resposta = await perguntar('Digite um número inteiro positivo: ');
        const numero = parseInt(resposta, 10);

        if (ehPrimo(numero)) {
            console.log(`${numero} é um número primo.`);
        } else {
            console.log(`${numero} não é um número primo.`);
        }
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    ehPrimo,
};
