import { d as defineMiddleware, s as sequence } from './chunks/index_CSCp_PPW.mjs';
import { v as validateSession } from './chunks/auth_BRi6n9U_.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_D9im8bGT.mjs';
import 'piccolore';
import './chunks/astro/server_CUZ8bU2-.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { request, url, locals } = context;
  if (url.pathname.startsWith("/admin")) {
    if (url.pathname === "/admin/login" || url.pathname === "/admin/login/") {
      return next();
    }
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")).filter(([k, v]) => k && v)
    );
    const sessionToken = cookies["session_token"];
    if (!sessionToken) {
      return context.redirect("/admin/login");
    }
    const session = validateSession(sessionToken);
    if (!session) {
      return context.redirect("/admin/login");
    }
    locals.user = {
      id: session.user_id,
      username: session.username
    };
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
