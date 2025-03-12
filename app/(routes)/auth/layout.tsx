"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LoadingContainer } from "../../styles/auth.style";
import { useUserStore } from "@/lib/store/user";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const token = typeof window !== "undefined" && localStorage.getItem("bmdao-token");
    const router = useRouter();
    const { isLoading } = useUserStore();
    useEffect(() => {
     if(token) {
        router.replace("/dashboard");
     }
    }, []);
    
    return (
        <div>
           {!token && children} 
           {isLoading && <LoadingContainer>
                <div>
                    <Image src={"../../_components/ui/logo-i.svg"} alt="logo" width={44} height={36} />
                    <h3>LOADING...</h3>
                </div>
           </LoadingContainer>}
        </div>
    );
};

export default AuthLayout;
