import * as React from 'react'

import { SearchParams } from '../../utils/models'
import Input from '../Input'

interface SearchViewProps {
  onChangeFilter: (value: SearchParams) => void
}

const SearchView: React.FC<SearchViewProps> = ({ onChangeFilter }) => {
  const [filter, setFilter] = React.useState<SearchParams>({
    id: '',
    name: '',
    type: '',
    ability: ''
  })

  const handleChange = (item: string, value: string) => {
    const newFilter = {
      ...filter,
      [item]: value.toLowerCase()
    }
    setFilter(newFilter)
    onChangeFilter(newFilter)
  }

  return (
    <div className="message is-info">
      <div className="message-header">Search</div>
      <div className="message-body message-body-wrapper">
        <Input
          label="# of Pokemon"
          value={filter.id}
          onChange={(e) => handleChange('id', e.target.value)}
        />
        <Input
          label="Name"
          value={filter.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <Input
          label="Type"
          value={filter.type}
          onChange={(e) => handleChange('type', e.target.value)}
        />
        <Input
          label="Ability"
          value={filter.ability}
          onChange={(e) => handleChange('ability', e.target.value)}
        />
        <img
          className="mt-4"
          src="https://upload.wikimedia.org/wikipedia/en/0/09/AshXYanime.png"
          alt="Ash"
        />
      </div>
    </div>
  )
}

export default SearchView
