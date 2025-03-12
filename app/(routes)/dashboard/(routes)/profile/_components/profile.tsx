"use client"
import React from 'react'
import ClientProfile from "./client-profile";
import UserProfile from './user-profile';
import { AccountType } from '@/lib/types/user/user.interface';
import { useUserStore } from '@/lib/store/user';

const Profile = () => {
  const { user } = useUserStore();
  return (
    <div>{user?.account_type === AccountType.CLIENT ? <ClientProfile /> : <UserProfile />}</div>
  )
}

export default Profile;
