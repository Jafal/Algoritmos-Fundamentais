import java.util.Scanner;

/**
 * Algoritmo do Máximo Divisor Comum (MDC)
 * Calcula o maior número inteiro que divide a e b utilizando o Algoritmo de Euclides.
 */
public class MaximoDivisorComum {

    /**
     * Calcula o MDC entre dois números inteiros usando o Algoritmo de Euclides.
     *
     * @param a Primeiro número inteiro.
     * @param b Segundo número inteiro.
     * @return O máximo divisor comum entre a e b.
     */
    public static int calcularMDC(int a, int b) {
        a = Math.abs(a);
        b = Math.abs(b);

        while (b != 0) {
            int resto = a % b;
            a = b;
            b = resto;
        }

        return a;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite o primeiro número inteiro (a): ");
        int a = scanner.nextInt();

        System.out.print("Digite o segundo número inteiro (b): ");
        int b = scanner.nextInt();

        int mdc = calcularMDC(a, b);

        System.out.println("O MDC(" + a + ", " + b + ") é: " + mdc);

        scanner.close();
    }
}
