import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PokemonSpecies } from '../utils/models'
import { getPokemonSepecies } from '../utils/apis'
import { AppThunk } from '../store'

export interface SpeciesState {
  items: Record<string, PokemonSpecies>
  loading: boolean
  error: string | null
}

const initialState: SpeciesState = {
  items: {},
  loading: false,
  error: null
}

const pokemonSpecies = createSlice({
  name: 'species',
  initialState,
  reducers: {
    getPokemonSpeciesStart(state) {
      state.loading = true
      state.error = null
    },
    getPokemonSpeciesSuccess(state, action: PayloadAction<PokemonSpecies>) {
      state.items[action.payload.name] = action.payload
      state.loading = false
      state.error = null
    },
    getPokemonSpeciesFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getPokemonSpeciesStart,
  getPokemonSpeciesSuccess,
  getPokemonSpeciesFailure
} = pokemonSpecies.actions
export default pokemonSpecies.reducer

export const fetchPokemonSpeciesById = (
  idOrName: number | string
): AppThunk => async (dispatch) => {
  try {
    dispatch(getPokemonSpeciesStart())
    const res = await getPokemonSepecies(idOrName)
    dispatch(getPokemonSpeciesSuccess(res))
  } catch (err) {
    dispatch(getPokemonSpeciesFailure(err))
  }
}
