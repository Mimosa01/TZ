import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface UsersState {
  users: User[]
  currentPage: number
  usersPerPage: number
}

const initialState: UsersState = {
  users: [],
  currentPage: 1,
  usersPerPage: 3,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    }
  },
})

export const { setUsers, setCurrentPage } = usersSlice.actions
export default usersSlice
