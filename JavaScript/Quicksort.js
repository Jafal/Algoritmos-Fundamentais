const readline = require('node:readline');

/**
 * Algoritmo de Ordenação Quicksort
 * Implementa a ordenação por divisão e conquista usando o método Quicksort.
 */

/**
 * Troca dois elementos de posição no array.
 *
 * @param {number[]} arr Array a ser modificado.
 * @param {number} i Primeiro índice.
 * @param {number} j Segundo índice.
 */
function trocar(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Particiona o array em torno de um pivô (esquema de Lomuto).
 * Elementos menores que o pivô ficam à esquerda, e maiores à direita.
 *
 * @param {number[]} arr Array a ser particionado.
 * @param {number} inicio Índice de início.
 * @param {number} fim Índice de fim (escolhido como pivô).
 * @returns {number} A posição final do pivô.
 */
function particionar(arr, inicio, fim) {
    const pivo = arr[fim];
    let i = inicio - 1;

    for (let j = inicio; j < fim; j++) {
        if (arr[j] <= pivo) {
            i++;
            trocar(arr, i, j);
        }
    }

    // Coloca o pivô na posição correta
    trocar(arr, i + 1, fim);
    return i + 1;
}

/**
 * Função recursiva principal do Quicksort.
 *
 * @param {number[]} arr Array de inteiros a ser ordenado.
 * @param {number} [inicio=0] Índice inicial da partição.
 * @param {number} [fim=arr.length-1] Índice final da partição.
 */
function ordenar(arr, inicio = 0, fim = arr.length - 1) {
    if (inicio < fim) {
        const indicePivo = particionar(arr, inicio, fim);
        ordenar(arr, inicio, indicePivo - 1);
        ordenar(arr, indicePivo + 1, fim);
    }
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
        const respostaN = await perguntar('Quantos elementos deseja ordenar? ');
        const n = parseInt(respostaN, 10);

        if (isNaN(n) || n <= 0) {
            console.log('O tamanho do array deve ser maior que zero.');
        } else {
            const array = [];
            for (let i = 0; i < n; i++) {
                const elemento = await perguntar(`Elemento [${i}]: `);
                array.push(parseInt(elemento, 10));
            }

            console.log(`\nArray original: [${array.join(', ')}]`);

            ordenar(array, 0, array.length - 1);

            console.log(`Array ordenado (Quicksort): [${array.join(', ')}]`);
        }
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    ordenar,
    particionar,
    trocar,
};
