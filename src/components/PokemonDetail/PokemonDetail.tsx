import * as React from 'react'
import classnames from 'classnames'

import { ChainLink, Pokemon, PokemonSpecies } from '../../utils/models'
import './style.scss'

interface PokemonDetailProps {
  allPokemons: Pokemon[]
  pokemon: Pokemon
  species: PokemonSpecies
  onEvolutionClick?: (name: string) => void
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  allPokemons,
  pokemon,
  species,
  onEvolutionClick
}) => {
  const getPokemonByName = (name: string) =>
    allPokemons.find((item) => item.name === name)

  const percentageString = (value) => {
    return (value * 100).toFixed(1) + '%'
  }

  const renderGeneral = (
    label: string,
    value: number | string | JSX.Element
  ) => (
    <p>
      {label}: <b>{value}</b>
    </p>
  )

  const getGenderInfo = () =>
    species.gender_rate === -1
      ? 'Genderless'
      : `${percentageString(
          1 - species.gender_rate / 8
        )} male, ${percentageString(species.gender_rate / 8)} female`

  const renderTypes = () =>
    pokemon.types.map(({ type }, index) => (
      <span key={index} className="tag is-info">
        {type.name}
      </span>
    ))

  const renderAbilities = () =>
    pokemon.abilities.map(({ ability, is_hidden }, index) => (
      <span
        key={index}
        className={classnames('tag', {
          'is-success': !is_hidden,
          'is-danger': is_hidden
        })}
      >
        {ability.name}
      </span>
    ))

  const renderVarieties = () =>
    species.varieties.map((variety) => {
      const pokemonObj = getPokemonByName(variety.pokemon.name)
      if (pokemonObj) {
        return (
          <div key={pokemonObj.id} className="column">
            <h6>{pokemonObj.name}</h6>
            <img
              className="image is-48x48"
              src={pokemonObj.sprites.front_default}
              alt={pokemonObj.name}
            />
          </div>
        )
      }
      return <></>
    })

  const renderChain = (chain: ChainLink) => {
    const obj = getPokemonByName(chain.species.name)
    return (
      <li key={obj.id}>
        <a onClick={() => onEvolutionClick && onEvolutionClick(obj.name)}>
          {obj.name} #{obj.id}{' '}
          <img className="image is-48x48" src={obj.sprites.front_default} />
        </a>
        <ul>{chain.evolves_to.map((item) => renderChain(item))}</ul>
      </li>
    )
  }

  return (
    <div className="information-container">
      <div className="title">
        {pokemon.name} #{pokemon.id}
      </div>
      <div className="columns">
        <div className="column content">
          <img
            className="pokemon-sprite"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          {renderGeneral('Height', pokemon.height)}
          {renderGeneral('Weight', pokemon.weight)}
          {renderGeneral('Color', species.color.name)}
          {renderGeneral('Gender', getGenderInfo())}
          {renderGeneral(
            'Catch Rate',
            percentageString(species.capture_rate / 255)
          )}
          {renderGeneral('Leveling Rate', species.growth_rate.name)}
        </div>
        <div className="column content">
          <p>{species.flavor_text_entries[0].flavor_text}</p>
          <h5>Types</h5>
          <div className="tags">{renderTypes()}</div>
          <h5>Abilities</h5>
          <div className="tags">{renderAbilities()}</div>
          {species.varieties.length > 1 && (
            <>
              <h5>Varieties</h5>
              <div className="columns">{renderVarieties()}</div>
            </>
          )}
          <h5>Evolutions</h5>
          <div className="menu">
            <ul className="menu-list">
              {renderChain(species.chain_detail.chain)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
