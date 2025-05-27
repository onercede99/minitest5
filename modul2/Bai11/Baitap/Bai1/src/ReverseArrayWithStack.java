import java.util.Stack;


public class Reverse {
    public static void Reverse(int[] arr) {
        Stack<Integer> stack = new Stack<>();
        for (int num : arr)
            stack.push(num);
        for (int i = 0; i < arr.length; i++) {
            arr[i] = stack.pop();
        }
    }
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
    public static void main(String[] args) {
        int[] numbers = {15,20,30,50,70};
        System.out.println("first Array: ");
        printArray(numbers);
        Reverse(numbers);
        System.out.println("second Array: ");
        printArray(numbers);

    }


}
