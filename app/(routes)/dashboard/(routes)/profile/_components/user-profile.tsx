"use client";
import HeadingCard from "@/app/(routes)/dashboard/_components/heading-card/heading-card";
import { InputContainer, InputWrapper } from "@/app/styles/auth.style";
import { Container } from "@/app/styles/dashboard.style";
import {
  Form,
  InputFlex,
  RoleCapsule,
  RoleWrapper,
  UserCard,
  UserDetails,
  UserImage,
  UserSection,
  UserWrap,
  Wrapper,
} from "@/app/styles/profile.style";
import Image from "next/image";
import { Country, ICountry } from "country-state-city";
import React, { useEffect, useState } from "react";
import { useUserFeature } from "@/lib/hooks/user";
import { useForm } from "react-hook-form";
import { IUpdateProfile } from "@/lib/types/user/user.interface";
import EditRaiderSocialsModal from "./accounts/raider/edit_model";

const Profile = () => {
  const [countryList] = useState<ICountry[]>(Country.getAllCountries());
  const { user, updateProfile } = useUserFeature();
  const [ showModal, setShowModal ] = useState(false);

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
        {user?.setting.subscription.raider &&
          <EditRaiderSocialsModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        }
        <Form onSubmit={form.handleSubmit(updateProfile)}>
          <h3>Personal Information</h3>
          <InputWrapper>
            <label>Full Name</label>
            <InputContainer>
              <input
                type="text"
                {...form.register('name')}
                placeholder="Enter fullname"
              />
            </InputContainer>
          </InputWrapper>
          <InputFlex>
            <InputWrapper>
              <label>Email Address</label>
              <InputContainer>
                <input
                  type="username"
                  {...form.register('username')}
                  placeholder="Enter your username"
                />
              </InputContainer>
            </InputWrapper>
            <InputWrapper>
              <label>Phone Number</label>
              <InputContainer>
                <input
                  type="tel" 
                  {...form.register('phone_number')}
                  placeholder="Enter your phone number" />
              </InputContainer>
            </InputWrapper>
          </InputFlex>
          <InputWrapper>
            <label>Country/Region</label>
            <InputContainer>
              <select {...form.register('country')}>
                <option>Select your country/region</option>
                {countryList.map((country) => (
                  <option value={country.name}>{country.name}</option>
                ))}
              </select>
            </InputContainer>
          </InputWrapper>
          <h3>Sevices</h3>

        </Form>
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
                <h3>{user?.personal?.name}</h3>
                <p>{user?.personal?.email_address}</p>
              </UserDetails>
            </UserCard>
            <RoleWrapper>
              <RoleCapsule>Moderator</RoleCapsule>
              <RoleCapsule>Collab Manager</RoleCapsule>
              <RoleCapsule>Chat Engager</RoleCapsule>
              <RoleCapsule>Twitter Raider</RoleCapsule>
            </RoleWrapper>
            <button>Update Profile</button>
          </UserWrap>
        </UserSection>
      </Wrapper>
    </Container>
  );
};

export default Profile;
