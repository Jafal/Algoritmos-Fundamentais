import java.util.Scanner;

/**
 * Algoritmo de Contagem
 * Dado um conjunto de N números de entrada, conta quantos valores inteiros
 * existem neste conjunto entre o primeiro dado (inclusive) e N (inclusive).
 */
public class Contagem {

    /**
     * Conta a quantidade de valores presentes no array que estão no intervalo
     * fechado entre o primeiro elemento (dados[0]) e N.
     *
     * @param dados Array contendo o conjunto de números.
     * @param n     Valor limite N (também correspondente à quantidade de dados).
     * @return Quantidade de valores no intervalo [primeiroDado, N].
     */
    public static int contarValoresNoIntervalo(int[] dados, int n) {
        if (dados == null || dados.length == 0) {
            return 0;
        }

        int primeiroDado = dados[0];
        int limiteInferior = Math.min(primeiroDado, n);
        int limiteSuperior = Math.max(primeiroDado, n);

        int contador = 0;
        for (int valor : dados) {
            if (valor >= limiteInferior && valor <= limiteSuperior) {
                contador++;
            }
        }

        return contador;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite o valor de N (quantidade de números a serem inseridos): ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("A quantidade N deve ser maior que zero.");
        } else {
            int[] dados = new int[n];

            System.out.println("Insira os " + n + " valores inteiros:");
            for (int i = 0; i < n; i++) {
                System.out.print("Dado " + (i + 1) + ": ");
                dados[i] = scanner.nextInt();
            }

            int primeiroDado = dados[0];
            int totalContados = contarValoresNoIntervalo(dados, n);

            int min = Math.min(primeiroDado, n);
            int max = Math.max(primeiroDado, n);

            System.out.println("\n--- Resultado ---");
            System.out.println("Primeiro dado inserido: " + primeiroDado);
            System.out.println("Valor de N: " + n);
            System.out.println("Intervalo avaliado: [" + min + ", " + max + "]");
            System.out.println("Quantidade de valores encontrados no intervalo: " + totalContados);
        }

        scanner.close();
    }
}
