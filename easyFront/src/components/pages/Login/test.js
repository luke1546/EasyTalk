function solution(n) {
  let answer = 0;

  const tmp = [0, 1];

  for (let i = 2; i <= n; i++) {
    const a = tmp[i - 1];
    const b = tmp[i - 2];
    tmp.push((a + b) % 1234567);
  }

  answer = tmp[n];

  return answer;
}

solution(500);
