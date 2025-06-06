// 替换为你的 Workers 地址
// 正确密码的 SHA-256 哈希值（替换为你自己的）
const CORRECT_HASH = "ad44be3eb5fbfc319b37217289305d5f7048685b88ec5c995f0d9900a3ed053f";

// 计算 SHA-256 哈希
async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 验证密码
async function checkPassword() {
  const input = document.getElementById('password').value;
  const hash = await sha256(input);
  
  if (hash === CORRECT_HASH) {
    // 设置 sessionStorage 标记（防止直接访问）
    sessionStorage.setItem("authenticated", "true");
    window.location.href = "protected.html";
  } else {
    document.getElementById('error').innerText = "密码错误";
  }
}

// 页面加载时检查是否由登录页跳转
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('direct') === '1') {
    document.getElementById('error').innerText = "禁止直接访问";
  }
};
