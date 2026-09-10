const readline = require('node:readline');

/**
 * Algoritmo de Somatório
 * Realiza a soma de um conjunto de N números fornecidos pelo usuário.
 */

/**
 * Calcula a soma de um array de números.
 *
 * @param {number[]} numeros Array contendo os números a serem somados.
 * @returns {number} O somatório total dos elementos.
 */
function calcularSoma(numeros) {
    let soma = 0;
    for (const num of numeros) {
        soma += num;
    }
    return soma;
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
        const respostaN = await perguntar('Quantos números deseja somar? ');
        const n = parseInt(respostaN, 10);

        if (isNaN(n) || n <= 0) {
            console.log('A quantidade de números deve ser maior que zero.');
        } else {
            const numeros = [];
            for (let i = 0; i < n; i++) {
                const entrada = await perguntar(`Digite o ${i + 1}º número: `);
                numeros.push(parseFloat(entrada.replace(',', '.')));
            }

            const resultado = calcularSoma(numeros);
            console.log(`\nO somatório dos ${n} números é: ${resultado}`);
        }
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    calcularSoma,
};
