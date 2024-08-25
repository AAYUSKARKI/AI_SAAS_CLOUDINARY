import { clerkMiddleware , createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const ispublicroute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home"
])

const publicapiroute = createRouteMatcher([
    "/api/videos",
])

export default clerkMiddleware((auth, req) => {
    const {userId} = auth();
    const currenturl = new URL(req.url)
    const ishomepage = currenturl.pathname === "/home"
    const isapirequest = currenturl.pathname.startsWith("/api")

    if (userId && ispublicroute(req) && !ishomepage) {
        return NextResponse.redirect(new URL("/home", req.url))
    }

    //not logged in
    if(!userId) {
        if(!ispublicroute(req) && !publicapiroute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }

        if(isapirequest && !publicapiroute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
}