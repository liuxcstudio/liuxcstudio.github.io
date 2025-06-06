const AUTH_COOKIE_NAME = "authenticated";
const CORRECT_PASSWORD = "your_password"; // 替换为你自己的密码

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // 处理密码验证请求
  if (url.pathname === "/check-password" && request.method === "POST") {
    const { password } = await request.json();
    if (password === CORRECT_PASSWORD) {
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `${AUTH_COOKIE_NAME}=true; path=/; Secure; HttpOnly`
        }
      });
    } else {
      return new Response(JSON.stringify({ success: false }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // 拦截受保护路径 /protected/*
  if (url.pathname.startsWith("/protected/")) {
    const cookies = request.headers.get("Cookie") || "";
    const authCookie = cookies.split(";").find(c => c.trim().startsWith(`${AUTH_COOKIE_NAME}=`));

    if (!authCookie) {
      // 未认证，重定向到首页
      return Response.redirect("https://your-site.com/",  302);
    }
  }

  // 其他请求正常处理
  return fetch(request);
}
