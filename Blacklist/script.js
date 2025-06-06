// 替换为你的 Workers 地址
const WORKER_URL = 'https://polished-snow-fe49.liuxc5602.workers.dev'; 

async function checkPassword() {
  const password = document.getElementById('password').value;
  const res = await fetch(WORKER_URL + '/check-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = '/protected/';
  } else {
    document.getElementById('error').innerText = '密码错误，请重试';
  }
}
