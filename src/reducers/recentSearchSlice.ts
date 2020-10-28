import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RecentSearchState {
  items: string[]
}

const initialState: RecentSearchState = {
  items: []
}

const recent = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    addRecent(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item !== action.payload)
      state.items.unshift(action.payload)
    },
    resetRecent(state) {
      state.items = []
    }
  }
})

export const { addRecent, resetRecent } = recent.actions
export default recent.reducer
