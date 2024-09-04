"use client"
import { verifyUserEmail } from '@/app/api/auth'
import { AcceptTerms, Container, FormContainer, GoogleBtn, InputContainer, InputWrapper, LogoWrapper, Or, QControl, SubmitButton } from '@/app/styles/auth.style'
import { setLoading, setUser, useDispatch } from '@/lib/redux'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const VerifyEmail = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleGoHome = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push("/")
    }
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const handleVerifyEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if(!email || !otp) {
        toast.error("Fill in required fields", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      dispatch(setLoading(true));
      verifyUserEmail({
        emailAddress: email,
        code: parseFloat(otp),
      }).then((res) => {
        dispatch(setUser(res.data.data))
        localStorage.setItem("bmdao-token", res.data.data.accessToken);
        router.push("/dashboard");
        dispatch(setLoading(false));
      }).catch((e: any) => {
        if(e?.response?.data.error[0].message) {
          toast.error(e?.response?.data.error[0].message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(setLoading(false));
          return;
        }
        if(e?.message) {
          toast.error(e?.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(setLoading(false));
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
        <h1>Verify Your Account</h1>
        <p>Please Enter your details for verification</p>
        <InputWrapper style={{ marginTop: "15px" }}>
          <label>Email Address</label>
          <InputContainer>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email Address"/>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>OTP</label>
          <InputContainer>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter your OTP"/>
          </InputContainer>
        </InputWrapper>
        <QControl>
            <AcceptTerms style={{ width: "auto" }}>
                
            </AcceptTerms>
            <AcceptTerms style={{ width: "auto" }}>
                <Link href="/forgotPassword" legacyBehavior>Forget password?</Link>
            </AcceptTerms>
        </QControl>
        <SubmitButton onClick={handleVerifyEmail}>Submit</SubmitButton>
        <AcceptTerms>
            <p style={{ textAlign: "center", width: "100%" }}>Don&apos;t have an account? <Link href="/register" legacyBehavior>Create account</Link></p>
        </AcceptTerms>
      </FormContainer>
    </Container>
  )
}

export default VerifyEmail