export interface ApiResponse {
  count: number
  next: string
  previous: string
  results: NamedAPIResource[]
}

export interface NamedAPIResource {
  name: string
  url: string
}

export interface SearchParams {
  id: string
  name: string
  type: string
  ability: string
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  is_default: boolean
  height: number
  weight: number
  abilities: PokemonAbility[]
  sprites: PokemonSprites
  species: NamedAPIResource
  types: PokemonType[]
}

interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

interface PokemonSprites {
  front_default: string
  front_shiny: string
  front_female: string
  front_shiny_female: string
  back_default: string
  back_shiny: string
  back_female: string
  back_shiny_female: string
}

interface PokemonType {
  slot: number
  type: NamedAPIResource
}

export interface PokemonSpecies {
  id: number
  name: string
  gender_rate: number
  capture_rate: number
  base_happiness: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  has_gender_differences: boolean
  growth_rate: NamedAPIResource
  color: NamedAPIResource
  shape: NamedAPIResource
  evolves_from_species: NamedAPIResource
  evolution_chain: NamedAPIResource
  habitat: NamedAPIResource
  flavor_text_entries: FlavorText[]
  varieties: PokemonSpeciesVariety[]
  chain_detail?: EvolutionChain
}

interface PokemonSpeciesVariety {
  is_default: boolean
  pokemon: NamedAPIResource
}

interface FlavorText {
  flavor_text: string
}

export interface EvolutionChain {
  id: number
  baby_trigger_item: NamedAPIResource
  chain: ChainLink
}

export interface ChainLink {
  is_baby: boolean
  species: NamedAPIResource
  evolves_to: ChainLink[]
}
