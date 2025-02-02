'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({children}:{children:React.ReactNode})=>{
    const {status} = useSession()
    const router = useRouter()

    useEffect(()=>{
        if(status === 'unauthenticated'){
            router.push('/auth/login')
        }
    },[status,router])

    if(status == 'loading'){
        return <div>Loading...</div>
    }

    return status == 'authenticated' ? children : null
}

export default ProtectedRoute