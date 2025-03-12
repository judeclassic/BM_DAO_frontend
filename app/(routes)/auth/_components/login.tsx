"use client"
import { AcceptTerms, Container, FormContainer, GoogleBtn, InputContainer, InputWrapper, LogoWrapper, Or, QControl, SubmitButton } from '@/app/styles/auth.style'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuthFeature } from '@/lib/hooks/auth'
import { useForm } from 'react-hook-form'
import { IUserLogin } from '@/lib/types/auth'
import { getSpecificError } from '@/lib/helpers/error_handler'

const Login = () => {
    const { login, errors } = useAuthFeature()
    const form = useForm<IUserLogin>({ defaultValues: { email_address: '', password: '' }});

  return (
    <Container>
      <FormContainer onSubmit={form.handleSubmit(login)}>
        <Link href={"/"}>
          <LogoWrapper>
            <Image src={"./logo-i.svg"} alt="logo" width={44} height={36} />
          </LogoWrapper>
        </Link>
        <h1>Welcome Back</h1>
        <p>Please Enter your details to Sign in</p>
        <InputWrapper style={{ marginTop: "15px" }}>
          <label>Email Address</label>
          <InputContainer>
            <input type="email" {...form.register('email_address')} placeholder="Enter your Email Address"/>
            <p style={{ color: "#B92828", fontSize: "12px" }}>{getSpecificError('email_address', errors)}</p>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>Password</label>
          <InputContainer>
            <input type={"password"} {...form.register('password')} placeholder="Enter your password"/>
            <p style={{ color: "#B92828", fontSize: "12px" }}>{getSpecificError('password', errors)}</p>
            {/* <button onClick={handlePasswordToggle}><Image src={showPassword ? "eye-slash.svg" : "eye-open.svg"} alt="eye" height={24} width={24}/></button> */}
          </InputContainer>
        </InputWrapper>
        <QControl>
            <AcceptTerms style={{ width: "auto" }}>
                {/* <button onClick={handleRememberToggle}></button> */}
                <p>Remember me</p>
            </AcceptTerms>
            <AcceptTerms style={{ width: "auto" }}>
                <Link href="/auth/password" legacyBehavior>Forget password?</Link>
            </AcceptTerms>
        </QControl>
        <SubmitButton type='submit'>Sign in</SubmitButton>
        <AcceptTerms>
            <p style={{ textAlign: "center", width: "100%" }}>Don&apos;t have an account? <Link href="/auth/register" legacyBehavior>Create account</Link></p>
        </AcceptTerms>
      </FormContainer>
    </Container>
  )
}

export default Login