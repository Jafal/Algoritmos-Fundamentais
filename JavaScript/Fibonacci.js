const readline = require('node:readline');

/**
 * Algoritmo de Fibonacci
 * Gera os N primeiros termos da sequência de Fibonacci (onde N > 1).
 * Primeiros termos: 0, 1, 1, 2, 3, 5, 8, 13...
 */

/**
 * Gera um array contendo os primeiros N termos da sequência de Fibonacci.
 *
 * @param {number} n Quantidade de termos desejada (deve ser maior que 1).
 * @returns {number[]} Array contendo a sequência calculada.
 */
function gerarFibonacci(n) {
    if (n <= 1) {
        throw new Error('O valor de N deve ser maior que 1.');
    }

    const sequencia = new Array(n);
    sequencia[0] = 0;
    sequencia[1] = 1;

    for (let i = 2; i < n; i++) {
        sequencia[i] = sequencia[i - 1] + sequencia[i - 2];
    }

    return sequencia;
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
        const resposta = await perguntar('Digite a quantidade de termos N (onde N > 1): ');
        const n = parseInt(resposta, 10);

        if (isNaN(n) || n <= 1) {
            console.log('Erro: N deve ser maior que 1.');
        } else {
            const resultado = gerarFibonacci(n);

            console.log(`Sequência de Fibonacci com ${n} termos: ${resultado.join(', ')}`);
        }
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    gerarFibonacci,
};
