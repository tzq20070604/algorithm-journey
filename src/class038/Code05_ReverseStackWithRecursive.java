package class038;

import java.util.Stack;

// 用递归函数逆序栈
public class Code05_ReverseStackWithRecursive {

	public static void reverse(Stack<Integer> stack) {
		if (stack.isEmpty()) {
			return;
		}
		int num = bottomOut(stack);
		reverse(stack);
		stack.push(num);
	}

	// 栈底元素移除掉，上面的元素盖下来
	// 返回移除掉的栈底元素
	public static int bottomOut(Stack<Integer> stack) {
		int ans = stack.pop();
		// 条件1
		if (stack.isEmpty()) {
			// 这里没有加上stack.push(ans)，所以移除了栈底元素
			return ans;
		} else {
			// 拿到条件1，一直往上传
			int last = bottomOut(stack);
			stack.push(ans);
			return last;
		}
	}

	public static void main(String[] args) {
		Stack<Integer> stack = new Stack<Integer>();
		stack.push(1);
		stack.push(2);
		stack.push(3);
		stack.push(4);
		stack.push(5);
		reverse(stack);
		while (!stack.isEmpty()) {
			System.out.println(stack.pop());
		}
	}

}
