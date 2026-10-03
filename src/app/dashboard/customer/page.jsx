'use client'
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const CustomerPage = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const user = session?.user
    useEffect(() =>{
        if(!user){
            router.push('/auth/login')
        }
        else if(user.role === 'business' || user.role === 'admin'){
            router.push('/dashbord')
        }
    }, [router, user])
    return (
        <div>
            <h3>This is customer page</h3>
        </div>
    );
};

export default CustomerPage;