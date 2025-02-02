import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { config } from "./config/env";

export async function middleware(req:NextRequest){
    const token = await getToken({req,secret:config.NEXTAUTH_SECRET})

    // define protected routes
    const protectedRoutes = ['/dashboard','/profile','/flavors']

    if(protectedRoutes.some((route:any)=> req.nextUrl.pathname.startsWith(route))){
        if(!token){
            return NextResponse.redirect(new URL('/auth/login',req.url))
        }
    }

    return NextResponse.next()
}

export const configuration = {
    matcher:['/dashboard/:path*','/profile/:path*','/flavors/:path*'],
}