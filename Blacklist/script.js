async function checkPassword() {
    const password = document.getElementById('password').value;
    const workerUrl = 'https://your-worker.your-subdomain.workers.dev';  // 替换为你的 Workers 地址
    
    const res = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    const data = await res.json();
    
    if (data.success) {
        document.cookie = "authenticated=true; path=/";
        window.location.href = "protected.html";
    } else {
        document.getElementById('error').innerText = "密码错误";
    }
}
