import java.util.Arrays;

public class Runner {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.err.println("{\"error\": \"No arguments provided\"}");
            return;
        }

        String algo = args[0];
        try {
            switch (algo) {
                case "Contagem": {
                    int n = Integer.parseInt(args[1]);
                    int[] dados = new int[args.length - 2];
                    for (int i = 0; i < dados.length; i++) {
                        dados[i] = Integer.parseInt(args[i + 2]);
                    }
                    int result = Contagem.contarValoresNoIntervalo(dados, n);
                    System.out.println("{\"result\": " + result + "}");
                    break;
                }
                case "Fibonacci": {
                    int n = Integer.parseInt(args[1]);
                    long[] result = Fibonacci.gerarFibonacci(n);
                    System.out.print("{\"result\": [");
                    for (int i = 0; i < result.length; i++) {
                        System.out.print(result[i]);
                        if (i < result.length - 1) System.out.print(", ");
                    }
                    System.out.println("]}");
                    break;
                }
                case "MDC": {
                    int a = Integer.parseInt(args[1]);
                    int b = Integer.parseInt(args[2]);
                    int result = MaximoDivisorComum.calcularMDC(a, b);
                    System.out.println("{\"result\": " + result + "}");
                    break;
                }
                case "NumeroPrimo": {
                    int n = Integer.parseInt(args[1]);
                    boolean result = NumeroPrimo.ehPrimo(n);
                    System.out.println("{\"result\": " + result + "}");
                    break;
                }
                case "Quicksort": {
                    int n = Integer.parseInt(args[1]);
                    int[] arr = new int[args.length - 2];
                    for (int i = 0; i < arr.length; i++) {
                        arr[i] = Integer.parseInt(args[i + 2]);
                    }
                    Quicksort.ordenar(arr, 0, arr.length - 1);
                    System.out.print("{\"result\": [");
                    for (int i = 0; i < arr.length; i++) {
                        System.out.print(arr[i]);
                        if (i < arr.length - 1) System.out.print(", ");
                    }
                    System.out.println("]}");
                    break;
                }
                case "Somatorio": {
                    int n = Integer.parseInt(args[1]);
                    double[] arr = new double[args.length - 2];
                    for (int i = 0; i < arr.length; i++) {
                        arr[i] = Double.parseDouble(args[i + 2]);
                    }
                    double result = Somatorio.calcularSoma(arr);
                    System.out.println("{\"result\": " + result + "}");
                    break;
                }
                case "TrocaDeVariaveis": {
                    int a = Integer.parseInt(args[1]);
                    int b = Integer.parseInt(args[2]);
                    // Troca
                    int aux = a;
                    a = b;
                    b = aux;
                    System.out.println("{\"result\": {\"a\": " + a + ", \"b\": " + b + "}}");
                    break;
                }
                default:
                    System.err.println("{\"error\": \"Unknown algorithm\"}");
            }
        } catch (Exception e) {
            System.err.println("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
