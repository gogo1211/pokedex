import * as React from 'react'

import { Pokemon } from '../../utils/models'
import './style.scss'

interface RecentViewProps {
  items: Pokemon[]
  onItemClick: (name: string) => void
}

const RecentView: React.FC<RecentViewProps> = ({ items, onItemClick }) => {
  const renderItems = () => {
    if (items.length === 0) {
      return <div className="p-3">No recent</div>
    }
    return items.slice(0, 5).map((item) => (
      <div
        key={item.id}
        className="recent-item-container"
        onClick={() => onItemClick(item.name)}
      >
        {item.name}
        <img src={item.sprites.front_default} alt={item.name} />
      </div>
    ))
  }
  return (
    <div className="message is-primary">
      <div className="message-header">Recent</div>
      <div className="message-body-wrapper">{renderItems()}</div>
    </div>
  )
}

export default RecentView
