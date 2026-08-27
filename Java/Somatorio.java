import java.util.Scanner;

/**
 * Algoritmo de Somatório
 * Realiza a soma de um conjunto de N números fornecidos pelo usuário.
 */
public class Somatorio {

    /**
     * Calcula a soma de um array de números (double).
     *
     * @param numeros Array contendo os números a serem somados.
     * @return O somatório total dos elementos.
     */
    public static double calcularSoma(double[] numeros) {
        double soma = 0.0;
        for (double num : numeros) {
            soma += num;
        }
        return soma;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Quantos números deseja somar? ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("A quantidade de números deve ser maior que zero.");
        } else {
            double[] numeros = new double[n];
            for (int i = 0; i < n; i++) {
                System.out.print("Digite o " + (i + 1) + "º número: ");
                numeros[i] = scanner.nextDouble();
            }

            double resultado = calcularSoma(numeros);
            System.out.println("\nO somatório dos " + n + " números é: " + resultado);
        }

        scanner.close();
    }
}
