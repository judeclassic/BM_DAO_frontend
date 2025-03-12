"use client"
import React from 'react'
import ClientDashboard from "./client_dashboard/client-dashboard";
import UserDashboard from './user_dashboard/user-dashboard';
import { AccountType } from '@/lib/types/user/user.interface';
import { useUserStore } from '@/lib/store/user';

const Dashboard = () => {
  const { user } = useUserStore();
  return (
    <div>
      {user?.account_type === AccountType.USER && <UserDashboard />}
      {user?.account_type === AccountType.CLIENT && <ClientDashboard />}
    </div>
  )
}

export default Dashboard;
