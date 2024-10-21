/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '@/app/interface/user.interface'

const initialState: IUser = {} as IUser;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      initialState
      return action.payload;
    },
  },
})
export const { setUser } = userSlice.actions;
