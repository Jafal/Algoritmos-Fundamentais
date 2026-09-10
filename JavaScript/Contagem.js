const readline = require('node:readline');

/**
 * Algoritmo de Contagem
 * Dado um conjunto de N números de entrada, conta quantos valores inteiros
 * existem neste conjunto entre o primeiro dado (inclusive) e N (inclusive).
 */

/**
 * Conta a quantidade de valores presentes no array que estão no intervalo
 * fechado entre o primeiro elemento (dados[0]) e N.
 *
 * @param {number[]} dados Array contendo o conjunto de números.
 * @param {number} n       Valor limite N (também correspondente à quantidade de dados).
 * @returns {number} Quantidade de valores no intervalo [primeiroDado, N].
 */
function contarValoresNoIntervalo(dados, n) {
    if (!dados || dados.length === 0) {
        return 0;
    }

    const primeiroDado = dados[0];
    const limiteInferior = Math.min(primeiroDado, n);
    const limiteSuperior = Math.max(primeiroDado, n);

    let contador = 0;
    for (const valor of dados) {
        if (valor >= limiteInferior && valor <= limiteSuperior) {
            contador++;
        }
    }

    return contador;
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
        const respostaN = await perguntar('Digite o valor de N (quantidade de números a serem inseridos): ');
        const n = parseInt(respostaN, 10);

        if (isNaN(n) || n <= 0) {
            console.log('A quantidade N deve ser maior que zero.');
        } else {
            const dados = [];

            console.log(`Insira os ${n} valores inteiros:`);
            for (let i = 0; i < n; i++) {
                const entrada = await perguntar(`Dado ${i + 1}: `);
                dados.push(parseInt(entrada, 10));
            }

            const primeiroDado = dados[0];
            const totalContados = contarValoresNoIntervalo(dados, n);

            const min = Math.min(primeiroDado, n);
            const max = Math.max(primeiroDado, n);

            console.log('\n--- Resultado ---');
            console.log(`Primeiro dado inserido: ${primeiroDado}`);
            console.log(`Valor de N: ${n}`);
            console.log(`Intervalo avaliado: [${min}, ${max}]`);
            console.log(`Quantidade de valores encontrados no intervalo: ${totalContados}`);
        }
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    contarValoresNoIntervalo,
};
