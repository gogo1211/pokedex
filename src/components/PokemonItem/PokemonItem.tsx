import * as React from 'react'

import { Pokemon } from '../../utils/models'
import './style.scss'

interface PokemonItemProps {
  item: Pokemon
  onClick?: (name: string) => void
}

const PokemonItem: React.FC<PokemonItemProps> = ({ item, onClick }) => {
  return (
    <div className="box pokemon-item-container p-3">
      <figure
        className="front-image"
        onClick={() => onClick && onClick(item.name)}
      >
        <img src={item.sprites.front_default} alt={item.name} />
      </figure>
      <div className="information">
        <div className="index">#{item.id}</div>
        <div className="name">{item.name}</div>
        <div className="tags">
          {item.types.map(({ type }, index) => (
            <span key={index} className="tag is-rounded is-info">
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonItem
