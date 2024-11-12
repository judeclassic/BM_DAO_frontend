"use client"
import { loginUser, resetPassword, verifyUserEmail } from '@/app/api/auth'
import { AcceptTerms, Container, FormContainer, GoogleBtn, InputContainer, InputWrapper, LogoWrapper, Or, QControl, SubmitButton } from '@/app/styles/auth.style'
import { setLoading, setUser, useDispatch } from '@/lib/redux'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
   

    const router = useRouter();
    const dispatch = useDispatch();

    const handlePasswordToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const handleGoHome = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push("/")
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const handleResetPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if(!email || !otp) {
        toast.error("Fill in required fields", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      dispatch(setLoading(true));
      resetPassword({
        emailAddress: email,
        code: otp,
        password: password,
        confirmPassword: comfirmPassword
      }).then((res) => {
        router.push("/login");
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
        <h1>Reset Your Password</h1>
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
        <InputWrapper>
          <label>Password</label>
          <InputContainer>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
            <button onClick={handlePasswordToggle}><Image src={showPassword ? "eye-slash.svg" : "eye-open.svg"} alt="eye" height={24} width={24}/></button>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>confirm password</label>
          <InputContainer>
            <input type={showPassword ? "text" : "password"} value={comfirmPassword} onChange={(e) => setComfirmPassword(e.target.value)} placeholder="confirm password"/>
            <button onClick={handlePasswordToggle}><Image src={showPassword ? "eye-slash.svg" : "eye-open.svg"} alt="eye" height={24} width={24}/></button>
          </InputContainer>
        </InputWrapper>
        <QControl>
            <AcceptTerms style={{ width: "auto" }}>
                
            </AcceptTerms>
            <AcceptTerms style={{ width: "auto" }}>
                <Link href="/forgotPassword" legacyBehavior>Forget password?</Link>
            </AcceptTerms>
        </QControl>
        <SubmitButton onClick={handleResetPassword}>Submit</SubmitButton>
        <AcceptTerms>
            <p style={{ textAlign: "center", width: "100%" }}>Don&apos;t have an account? <Link href="/register" legacyBehavior>Create account</Link></p>
        </AcceptTerms>
      </FormContainer>
    </Container>
  )
}

export default ResetPassword