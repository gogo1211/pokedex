import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { SearchParams } from '../../utils/models'
import { PokedexState } from '../../reducers'
import { allRecentPokemonsSelector } from '../../reducers/selectors'

import SearchView from '../../components/SearchView'
import PokemonGridView from '../../components/PokemonGridView'
import RecentView from '../../components/RecentView'
import './style.scss'

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const { items: pokemons } = useSelector(
    (state: PokedexState) => state.pokemon
  )
  const [displayItems, setDisplayItems] = React.useState(pokemons)
  const recentItems = useSelector(allRecentPokemonsSelector)

  const onItemClick = (name: string) => {
    dispatch(push(`/pokemon/${name}`))
  }

  const handleChangeFilter = (filter: SearchParams) => {
    setDisplayItems(
      pokemons.filter(
        (pokemon) =>
          pokemon.id.toString().includes(filter.id) &&
          pokemon.name.toLowerCase().includes(filter.name) &&
          pokemon.types.reduce(
            (a, { type }) => a || type.name.toLowerCase().includes(filter.type),
            false
          ) &&
          pokemon.abilities.reduce(
            (a, { ability }) =>
              a || ability.name.toLowerCase().includes(filter.ability),
            false
          )
      )
    )
  }

  return (
    <div className="main-page-container">
      <SearchView onChangeFilter={handleChangeFilter} />
      <PokemonGridView items={displayItems} onItemClick={onItemClick} />
      <RecentView items={recentItems} onItemClick={onItemClick} />
    </div>
  )
}

export default MainPage
