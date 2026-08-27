import java.util.Scanner;

/**
 * Algoritmo de Fibonacci
 * Gera os N primeiros termos da sequência de Fibonacci (onde N > 1).
 * Primeiros termos: 0, 1, 1, 2, 3, 5, 8, 13...
 */
public class Fibonacci {

    /**
     * Gera um array contendo os primeiros N termos da sequência de Fibonacci.
     *
     * @param n Quantidade de termos desejada (deve ser maior que 1).
     * @return Array de long contendo a sequência calculada.
     */
    public static long[] gerarFibonacci(int n) {
        if (n <= 1) {
            throw new IllegalArgumentException("O valor de N deve ser maior que 1.");
        }

        long[] sequencia = new long[n];
        sequencia[0] = 0;
        sequencia[1] = 1;

        for (int i = 2; i < n; i++) {
            sequencia[i] = sequencia[i - 1] + sequencia[i - 2];
        }

        return sequencia;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite a quantidade de termos N (onde N > 1): ");
        int n = scanner.nextInt();

        if (n <= 1) {
            System.out.println("Erro: N deve ser maior que 1.");
        } else {
            long[] resultado = gerarFibonacci(n);

            System.out.print("Sequência de Fibonacci com " + n + " termos: ");
            for (int i = 0; i < resultado.length; i++) {
                System.out.print(resultado[i]);
                if (i < resultado.length - 1) {
                    System.out.print(", ");
                }
            }
            System.out.println();
        }

        scanner.close();
    }
}
