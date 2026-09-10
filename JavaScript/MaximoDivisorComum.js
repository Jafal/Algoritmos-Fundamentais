const readline = require('node:readline');

/**
 * Algoritmo do Máximo Divisor Comum (MDC)
 * Calcula o maior número inteiro que divide a e b utilizando o Algoritmo de Euclides.
 */

/**
 * Calcula o MDC entre dois números inteiros usando o Algoritmo de Euclides.
 *
 * @param {number} a Primeiro número inteiro.
 * @param {number} b Segundo número inteiro.
 * @returns {number} O máximo divisor comum entre a e b.
 */
function calcularMDC(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const resto = a % b;
        a = b;
        b = resto;
    }

    return a;
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
        const respA = await perguntar('Digite o primeiro número inteiro (a): ');
        const a = parseInt(respA, 10);

        const respB = await perguntar('Digite o segundo número inteiro (b): ');
        const b = parseInt(respB, 10);

        const mdc = calcularMDC(a, b);

        console.log(`O MDC(${a}, ${b}) é: ${mdc}`);
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    calcularMDC,
};
