/**
 * Algoritmo de Troca de Variáveis
 * Demonstra a troca de valores entre duas variáveis utilizando uma variável auxiliar.
 */

function executarTroca() {
    let a = 10;
    let b = 20;
    console.log(`A = ${a}`);
    console.log(`B = ${b}`);
    console.log('+++++++');

    const aux = a;
    a = b;
    b = aux;

    console.log(`A = ${a}`);
    console.log(`B = ${b}`);

    return { a, b };
}

if (require.main === module) {
    executarTroca();
}

module.exports = {
    executarTroca,
};
