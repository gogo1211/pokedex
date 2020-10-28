import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { replace } from 'connected-react-router'

import { PokedexState } from '../../reducers'
import { fetchPokemonSpeciesById } from '../../reducers/speciesSlice'
import { addRecent } from '../../reducers/recentSearchSlice'

import Loader from '../../components/Loader'
import PokemonDetail from '../../components/PokemonDetail/PokemonDetail'
import './style.scss'

interface MatchParams {
  name: string
}

const PokemonDetailPage: React.FC = () => {
  const dispatch = useDispatch()
  const { name } = useParams<MatchParams>()
  const { loading, items } = useSelector((state: PokedexState) => state.species)
  const { items: pokemons } = useSelector(
    (state: PokedexState) => state.pokemon
  )

  React.useEffect(() => {
    dispatch(addRecent(name))
    if (!species) {
      dispatch(fetchPokemonSpeciesById(name))
    }
  }, [name])

  const species = items[name]
  const pokemon = pokemons.find((item) => item.name === name)
  const index = pokemons.findIndex((item) => item.name == name)

  if (loading || !species) {
    return <Loader />
  }

  const visitPokemon = (name: string) => dispatch(replace(`/pokemon/${name}`))

  return (
    <>
      <div className="control-container">
        <button
          className="button"
          onClick={() => visitPokemon(pokemons[index - 1].name)}
          disabled={index === 1}
        >
          {index > 1
            ? `< ${pokemons[index - 1].name} #${pokemons[index - 1].id}`
            : 'Prev'}
        </button>
        <button
          className="button is-white"
          onClick={() => dispatch(replace('/'))}
        >
          Back to Search
        </button>
        <button
          className="button"
          onClick={() => visitPokemon(pokemons[index + 1].name)}
          disabled={pokemons.length === index + 1}
        >
          {index < pokemons.length
            ? `#${pokemons[index + 1].id} ${pokemons[index + 1].name} >`
            : 'Next'}
        </button>
      </div>

      <PokemonDetail
        allPokemons={pokemons}
        pokemon={pokemon}
        species={species}
        onEvolutionClick={visitPokemon}
      />
    </>
  )
}

export default PokemonDetailPage
