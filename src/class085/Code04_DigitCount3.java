package class085;

// 数字1的个数
// 给定一个整数n
// 计算所有小于等于n的非负整数中数字1出现的个数
// 测试链接 : https://leetcode.cn/problems/number-of-digit-one/
public class Code04_DigitCount3 {

	public static int countDigitOne(int n) {
		return count(n, 1);
	}

	public static int count(int num, int d) {
		int ans = 0;
		for (int base = 1, tmp = num, left,right,cur; tmp != 0; base *= 10, tmp /= 10) {
			left = tmp / 10;
			right = num % base;
			cur = tmp % 10;
			if (d == 0) {
				left--;
			}
			ans += left * base;
			if (cur > d) {
				ans += base;
			} else if (cur == d) {
				ans += right + 1;
			}
		}
		return ans;
	}

}
