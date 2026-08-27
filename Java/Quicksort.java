import java.util.Arrays;
import java.util.Scanner;

/**
 * Algoritmo de Ordenação Quicksort
 * Implementa a ordenação por divisão e conquista usando o método Quicksort.
 */
public class Quicksort {

    /**
     * Função recursiva principal do Quicksort.
     *
     * @param arr    Array de inteiros a ser ordenado.
     * @param inicio Índice inicial da partição.
     * @param fim    Índice final da partição.
     */
    public static void ordenar(int[] arr, int inicio, int fim) {
        if (inicio < fim) {
            int indicePivo = particionar(arr, inicio, fim);
            ordenar(arr, inicio, indicePivo - 1);
            ordenar(arr, indicePivo + 1, fim);
        }
    }

    /**
     * Particiona o array em torno de um pivô (esquema de Lomuto).
     * Elementos menores que o pivô ficam à esquerda, e maiores à direita.
     *
     * @param arr    Array a ser particionado.
     * @param inicio Índice de início.
     * @param fim    Índice de fim (escolhido como pivô).
     * @return A posição final do pivô.
     */
    private static int particionar(int[] arr, int inicio, int fim) {
        int pivo = arr[fim];
        int i = inicio - 1;

        for (int j = inicio; j < fim; j++) {
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
     * Troca dois elementos de posição no array.
     */
    private static void trocar(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Quantos elementos deseja ordenar? ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("O tamanho do array deve ser maior que zero.");
        } else {
            int[] array = new int[n];
            for (int i = 0; i < n; i++) {
                System.out.print("Elemento [" + i + "]: ");
                array[i] = scanner.nextInt();
            }

            System.out.println("\nArray original: " + Arrays.toString(array));

            ordenar(array, 0, array.length - 1);

            System.out.println("Array ordenado (Quicksort): " + Arrays.toString(array));
        }

        scanner.close();
    }
}
