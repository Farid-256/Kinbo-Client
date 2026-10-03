'use client'
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";


const DashboardRedirect = () => {
    const {data: session} = useSession()
    const user = session?.user
    const router = useRouter()

    useEffect(() =>{
        if(!user){
            router.push('/auth/login')
            return
        }
        if(user.role === 'admin'){
            router.push('/dashboard/admin')
        }
        if(user.role === 'business'){
            router.push('/dashboard/seller')
        }
        else{
            router.push('/dashboard/customer')
        }
    }, [user, router])
    return (
        <div>
            <h2 className="text-center py-20">Redirecting...</h2>
        </div>
    );
};

export default DashboardRedirect;