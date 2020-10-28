import { AnyAction, combineReducers } from '@reduxjs/toolkit'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { Reducer } from 'react'

import pokemonsReducer, { PokemonsState } from './pokemonsSlice'
import speciesReducer, { SpeciesState } from './speciesSlice'
import recentReducer, { RecentSearchState } from './recentSearchSlice'

const pokedexReducer = (history: History): Reducer<PokedexState, AnyAction> =>
  combineReducers({
    router: connectRouter(history),
    pokemon: pokemonsReducer,
    species: speciesReducer,
    recent: recentReducer
  })

export interface PokedexState {
  router: RouterState
  pokemon: PokemonsState
  species: SpeciesState
  recent: RecentSearchState
}

export default pokedexReducer
