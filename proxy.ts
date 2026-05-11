import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
    const host = request.headers.get("host") || ""
    const url = request.nextUrl.clone()

    // admin.mydomain.com
    if (host.startsWith("admin.")) {
        // avoid rewrite loop
        if (!url.pathname.startsWith("/admin")) {
            url.pathname = `/admin${url.pathname}`
        }

        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next|favicon.ico).*)",
    ],
}