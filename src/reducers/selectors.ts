import { createSelector } from 'reselect'
import { PokedexState } from '.'
import { Pokemon } from '../utils/models'

export const allPokemonsSelector = (state: PokedexState): Pokemon[] =>
  state.pokemon.items

const allRecentItemsSelector = (state: PokedexState): string[] =>
  state.recent.items

export const allRecentPokemonsSelector = createSelector(
  allPokemonsSelector,
  allRecentItemsSelector,
  (pokemons, recents) =>
    recents.map((recent) => pokemons.find((pokemon) => pokemon.name === recent))
)
