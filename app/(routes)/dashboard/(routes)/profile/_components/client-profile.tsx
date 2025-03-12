"use client";
import HeadingCard from "@/app/(routes)/dashboard/_components/heading-card/heading-card";
import { InputContainer, InputWrapper } from "@/app/styles/auth.style";
import { Container } from "@/app/styles/dashboard.style";
import {
    Form,
    InputFlex,
    UserCard,
    UserDetails,
    UserImage,
    UserSection,
    UserWrap,
    Wrapper,
} from "@/app/styles/profile.style";
import { Country, ICountry }  from 'country-state-city';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUserFeature } from "@/lib/hooks/user";
import { useForm } from "react-hook-form";
import { IUpdateProfile } from "@/lib/types/user/user.interface";

const ClientProfile = () => {
    const [countryList] = useState<ICountry[]>(Country.getAllCountries());
    const { user, updateProfile } = useUserFeature();

    const form = useForm<IUpdateProfile>({ defaultValues: {
        name: user?.personal.name,
        username: user?.personal.username,
        phone_number: user?.personal.phone_number,
        country: user?.personal.country
    }});

    useEffect(() => {
        form.setValue('name', user?.personal?.name ?? "");
        form.setValue('username', user?.personal?.username ?? "");
        form.setValue('phone_number', user?.personal?.phone_number ?? "");
    }, [user])

    return (
        <Container>
            <HeadingCard heading={"Profile"} />
            <Wrapper>
                <Form onSubmit={form.handleSubmit(updateProfile)}>
                    <h3>Personal Information</h3>
                    <InputWrapper>
                        <label>Full Name</label>
                        <InputContainer>
                        <input type="text" {...form.register('name')} placeholder="Enter fullname"/>
                        </InputContainer>
                    </InputWrapper>
                    <InputFlex>
                        <InputWrapper>
                        <label>Email Address</label>
                        <InputContainer>
                            <input type="text" {...form.register('username')} placeholder="Enter your username"/>
                        </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                        <label>Phone Number</label>
                        <InputContainer>
                            <input type="tel" {...form.register('phone_number')} placeholder="Enter your phone number"/>
                        </InputContainer>
                        </InputWrapper>
                    </InputFlex>
                    <InputWrapper>
                        <label>Country/Region</label>
                        <InputContainer>
                            <select {...form.register('country')}>
                                <option>Select your country/region</option>
                                {countryList.map(country => (
                                    <option value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </InputContainer>
                    </InputWrapper>
                        <UserSection>
                        <UserWrap>
                            <UserCard>
                                <UserImage>
                                    <Image
                                        src={"/user-1.png"}
                                        alt="user"
                                        objectFit="cover"
                                        objectPosition="center"
                                        layout="fill"
                                    />
                                </UserImage>
                                <UserDetails>
                                    <h3>{user?.personal.name}</h3>
                                    <p>{user?.personal.email_address}</p>
                                </UserDetails>
                            </UserCard>

                            <button>Edit Profile</button>
                        </UserWrap>
                    </UserSection>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default ClientProfile;
