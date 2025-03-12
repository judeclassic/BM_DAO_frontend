"use client"
import { AcceptTerms, Container, FormContainer, GoogleBtn, InputContainer, InputWrapper, LogoWrapper, Or, SubmitButton } from '@/app/styles/auth.style'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { Country, ICountry }  from 'country-state-city';
import { useAuthFeature } from '@/lib/hooks/auth'
import { useForm } from 'react-hook-form'
import { getSpecificError } from '@/lib/helpers/error_handler'
import { IUserRegister } from '@/lib/types/auth'
import { AccountType } from '@/lib/types/user/user.interface'


const Register = () => {
    const searchParams = useSearchParams();
    const [terms, setTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [countryList] = useState<ICountry[]>(Country.getAllCountries());

    const { errors, register } = useAuthFeature()
    const form = useForm<IUserRegister>({ defaultValues: { email_address: '', password: '' }});
    
    useEffect(() => {
      if(searchParams.get("code")) {
        form.setValue('referral_code', searchParams.get("code") ?? "");
      }
    }, [searchParams])
    
  return (
    <Container>
      <FormContainer onSubmit={form.handleSubmit(register)}>
        <Link href={'/'}>
          <LogoWrapper>
            <Image src={"./logo-i.svg"} alt="logo" width={44} height={36} />
          </LogoWrapper>
        </Link>
        <h1>Create your Account</h1>
        <p>Please Enter your details to Sign up</p>
        {/* <GoogleBtn>
            <Image src={"./google.svg"} alt="logo" width={24} height={24} />
            <span>Sign up with Google</span>
        </GoogleBtn> */}
        <Or />
        <InputWrapper>
          <label>Full Name</label>
          <InputContainer>
            <input type="text" {...form.register('name')} placeholder="Enter your Full Name"/>
          </InputContainer>
          <p style={{ color: "#B92828", fontSize: "12px" }}>{getSpecificError('username', errors)}</p>
        </InputWrapper>
        <InputWrapper>
          <label>Email Address</label>
          <InputContainer>
            <input type="email" {...form.register('email_address')} placeholder="Enter your email address"/>
          </InputContainer>
          <p style={{ color: "#B92828", fontSize: "12px" }}>{getSpecificError('email_address', errors)}</p>
        </InputWrapper>
        <InputWrapper>
          <label>Username</label>
          <InputContainer>
            <input type="text" {...form.register('username')} placeholder="Enter your username"/>
          </InputContainer>
          <p style={{ color: "#B92828", fontSize: "12px" }}>{getSpecificError('username', errors)}</p>
        </InputWrapper>
        <InputWrapper>
          <label>Phone Number</label>
          <InputContainer>
            <input type="tel" {...form.register('phone_number')} placeholder="Enter your username"/>
          </InputContainer>
          <p style={{ color: "#B92828", fontSize: "12px" }}>{getSpecificError('phone_number', errors)}</p>
        </InputWrapper>
        <InputWrapper>
          <label>Password</label>
          <InputContainer>
            <input type={showPassword ? "text" : "password"} {...form.register('password')} placeholder="Enter your password"/>
            {/* <button onClick={handlePasswordToggle}><Image src={showPassword ? "eye-slash.svg" : "eye-open.svg"} alt="eye" height={24} width={24}/></button> */}
          </InputContainer>
          <p style={{ color: "#B92828", fontSize: "12px" }}>{getSpecificError('password', errors)}</p>
        </InputWrapper>
        <InputWrapper>
          <label>Country/Region</label>
          <InputContainer>
            <select {...form.register('country')}>
                <option>Select your country/region</option>
                {
                  countryList.map(country => (
                    <option value={country.name}>{country.name}</option>
                  ))
                }
            </select>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>Account Type</label>
          <InputContainer>
            <select {...form.register('account_type')}>
                <option>Select your account type</option>
                {Object.values(AccountType).map((accountType) => (
                    <option value={accountType}>{accountType.toLocaleLowerCase()}</option>
                ))}
            </select>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>Referral Code</label>
          <InputContainer>
            <input {...form.register('referral_code')} placeholder="Enter your referral code"/>
          </InputContainer>
        </InputWrapper>
        <AcceptTerms>
            <button onClick={(e) => setTerms(!terms)}><Image src={terms ? "checkbox-checked.svg" : "checkbox-unchecked.svg"} alt="eye" height={24} width={24}/></button>
            <p>Accept <Link href="/terms" legacyBehavior>Terms &amp; Condition</Link></p>
        </AcceptTerms>
        <SubmitButton>Create Account</SubmitButton>
        <AcceptTerms>
            <p style={{ textAlign: "center", width: "100%" }}>Already have an account? <Link href="/auth/login" legacyBehavior>Login</Link></p>
        </AcceptTerms>
      </FormContainer>
    </Container>
  )
}

export default Register
