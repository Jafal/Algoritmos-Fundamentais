import java.util.Scanner;

public class NumeroPrimo {

    public static boolean ehPrimo(int n) {
        // Números menores ou iguais a 1 não são primos
        if (n <= 1) {
            return false;
        }
        // 2 e 3 são primos
        if (n <= 3) {
            return true;
        }
        // Elimina pares e múltiplos de 3
        if (n % 2 == 0 || n % 3 == 0) {
            return false;
        }

        // Verifica divisores da forma 6k ± 1 até a raiz quadrada de n
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Digite um número inteiro positivo: ");
        int numero = scanner.nextInt();

        if (ehPrimo(numero)) {
            System.out.println(numero + " é um número primo.");
        } else {
            System.out.println(numero + " não é um número primo.");
        }

        scanner.close();
    }
}