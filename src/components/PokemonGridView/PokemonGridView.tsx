import * as React from 'react'

import { Pokemon } from '../../utils/models'
import PokemonItem from '../PokemonItem'
import './style.scss'

interface PokemonGridViewProps {
  items: Pokemon[]
  onItemClick?: (name: string) => void
}

const PokemonGridView: React.FC<PokemonGridViewProps> = ({
  items,
  onItemClick
}) => {
  if (items.length === 0) {
    return <div>No items</div>
  }
  return (
    <div className="pokemon-grid-view-container">
      {items.map((pokemon) => (
        <div key={pokemon.id} className="item">
          <PokemonItem item={pokemon} onClick={onItemClick} />
        </div>
      ))}
    </div>
  )
}

export default PokemonGridView
