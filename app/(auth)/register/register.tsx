"use client"
import { AcceptTerms, Container, FormContainer, GoogleBtn, InputContainer, InputWrapper, LogoWrapper, Or, SubmitButton } from '@/app/styles/auth.style'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { Country, ICountry }  from 'country-state-city';
import { toast } from 'react-toastify'
import { registerUser } from '@/app/api/auth'
import { setLoading, setUser, useDispatch } from '@/lib/redux'


const Register = () => {
    const [terms, setTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [accountType, setAccountType] = useState<string>("");
    const [referralCode, setReferralCode] = useState("");
    const [countryList] = useState<ICountry[]>(Country.getAllCountries());
    const [phone, setPhone] = useState("");
    const searchParams = useSearchParams();
    const dispatch = useDispatch()

    const router = useRouter();

    const handlePasswordToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }
    const handleTermToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setTerms(!terms)
    }
    const handleGoHome = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push("/")
    }
    const handleRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if(!username || !fullname || !email || !accountType || !country || !username || !password || !phone) {
        toast.error("Fill in required fields", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      if(!terms) {
        toast.error("Accept terms and condition before proceeding", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      dispatch(setLoading(true));
      registerUser({
        name: fullname,
        emailAddress: email,
        username,
        referralCode: referralCode,
        country,
        accountType: accountType,
        password,
        phoneNumber: phone,
      }).then((res) => {
        // dispatch(setUser(res.data.data))
        // localStorage.setItem("bmdao-token", res.data.data.accessToken);
        // router.push("/dashboard");
        router.push("/verifyEmail");
        dispatch(setLoading(false));
      }).catch((e: any) => {
        toast.error(e?.response?.data.error[0].message, {
          position: toast.POSITION.TOP_RIGHT
        });
        dispatch(setLoading(false));
      })
    }
    useEffect(() => {
      if(searchParams.get("code")) {
        setReferralCode(searchParams.get("code") ?? "");
      }
    }, [searchParams])
    
  return (
    <Container>
      <FormContainer>
        <LogoWrapper onClick={handleGoHome}>
          <Image src={"./logo-i.svg"} alt="logo" width={44} height={36} />
        </LogoWrapper>
        <h1>Create your Account</h1>
        <p>Please Enter your details to Sign up</p>
        <GoogleBtn>
            <Image src={"./google.svg"} alt="logo" width={24} height={24} />
            <span>Sign up with Google</span>
        </GoogleBtn>
        <Or />
        <InputWrapper>
          <label>Full Name</label>
          <InputContainer>
            <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Enter your Full Name"/>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>Email Address</label>
          <InputContainer>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"/>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>Username</label>
          <InputContainer>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username"/>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>Phone Number</label>
          <InputContainer>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your username"/>
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
          <label>Country/Region</label>
          <InputContainer>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
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
            <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                <option>Select your account type</option>
                <option value={"user"}>User</option>
                <option value={"client"}>Client</option>
            </select>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <label>Referral Code</label>
          <InputContainer>
            <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} placeholder="Enter your referral code"/>
          </InputContainer>
        </InputWrapper>
        <AcceptTerms>
            <button onClick={handleTermToggle}><Image src={terms ? "checkbox-checked.svg" : "checkbox-unchecked.svg"} alt="eye" height={24} width={24}/></button>
            <p>Accept <Link href="/terms" legacyBehavior>Terms &amp; Condition</Link></p>
        </AcceptTerms>
        <SubmitButton onClick={handleRegister}>Create Account</SubmitButton>
        <AcceptTerms>
            <p style={{ textAlign: "center", width: "100%" }}>Already have an account? <Link href="/login" legacyBehavior>Login</Link></p>
        </AcceptTerms>
      </FormContainer>
    </Container>
  )
}

export default Register
