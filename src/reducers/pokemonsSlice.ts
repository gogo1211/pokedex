import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Pokemon } from '../utils/models'
import { getAllPokemons } from '../utils/apis'
import { AppThunk } from '../store'

export interface PokemonsState {
  items: Pokemon[]
  loading: boolean
  error: string | null
}

const initialState: PokemonsState = {
  items: [],
  loading: false,
  error: null
}

const pokemons = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    getPokemonsStart(state) {
      state.loading = true
      state.error = null
    },
    getPokemonsSuccess(state, action: PayloadAction<Pokemon[]>) {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    getPokemonsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getPokemonsStart,
  getPokemonsSuccess,
  getPokemonsFailure
} = pokemons.actions
export default pokemons.reducer

export const fetchPokemons = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getPokemonsStart())
    const pokemons = await getAllPokemons()
    dispatch(getPokemonsSuccess(pokemons))
  } catch (err) {
    dispatch(getPokemonsFailure(err))
  }
}
