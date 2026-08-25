public class TrocaDeVariaveis {
	public static void main(String[] args) {
		int a = 10;
		int b = 20;
        System.out.println("A = " + a);
		System.out.println("B = " + b);
       	System.out.println("+++++++");

		int aux = a;
		a = b;
		b = aux;

		System.out.println("A = " + a);
		System.out.println("B = " + b);
	}
}
