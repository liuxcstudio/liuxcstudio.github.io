
const CORRECT_PASSWORD = "Liuxc5602"; // 替换为你的密码

function checkPassword() {
  const input = document.getElementById("password").value;
  
  if (input === CORRECT_PASSWORD) {
    // 设置 sessionStorage 标记（防止直接访问）
    sessionStorage.setItem("authenticated", "true");
    window.location.href = "protected.html";
  } else {
    document.getElementById("error").innerText = "密码错误";
  }
}

// 页面加载时检查是否由登录页跳转
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("direct") === "1") {
    document.getElementById("error")?.innerText = "禁止直接访问";
  }
};
