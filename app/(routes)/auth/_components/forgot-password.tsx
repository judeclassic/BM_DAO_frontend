"use client"
import { forgotPassword } from '@/lib/api/auth'
import { AcceptTerms, Container, FormContainer, GoogleBtn, InputContainer, InputWrapper, LogoWrapper, Or, QControl, SubmitButton } from '@/app/styles/auth.style'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthStore } from '@/lib/store/auth'

const ForgotPassword = () => {
  const { setLoading } = useAuthStore()
    const router = useRouter();

    const handleGoHome = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push("/")
    }
    const [email, setEmail] = useState("");

    const handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if(!email) {
        toast.error("Fill in required fields", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      setLoading(true);
      forgotPassword({
        emailAddress: email,
      }).then((res) => {
        router.push("/resetPassword");
        setLoading(false);
      }).catch((e: any) => {
        if(e?.response?.data.error[0].message) {
          toast.error(e?.response?.data.error[0].message, {
            position: toast.POSITION.TOP_RIGHT
          });
          setLoading(false);
          return;
        }
        if(e?.message) {
          toast.error(e?.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          setLoading(false);
          return;
        }
      })
    }
  return (
    <Container>
      <FormContainer onSubmit={(e: any) => { e.preventDefault()}}>
        <LogoWrapper onClick={handleGoHome}>
          <Image src={"./logo-i.svg"} alt="logo" width={44} height={36} />
        </LogoWrapper>
        <h1>Forgot Password</h1>
        <p>Please Enter your details for verification</p>
        <InputWrapper style={{ marginTop: "15px" }}>
          <label>Email Address</label>
          <InputContainer>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email Address"/>
          </InputContainer>
        </InputWrapper>
       
      
        <SubmitButton onClick={handleForgotPassword}>Submit</SubmitButton>
        <AcceptTerms>
            <p style={{ textAlign: "center", width: "100%" }}>Don&apos;t have an account? <Link href="/register" legacyBehavior>Create account</Link></p>
        </AcceptTerms>
      </FormContainer>
    </Container>
  )
}

export default ForgotPassword