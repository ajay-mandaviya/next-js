import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const cookie = req.cookies.get("NEXT_ACCESS_TOKEN");
    if (!cookie) {
      return NextResponse.rewrite(new URL("/signin", req.url));
    }
  }
}
