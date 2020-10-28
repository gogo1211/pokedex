import { BASE_URL } from './constants'
import { ApiResponse, Pokemon, PokemonSpecies, EvolutionChain } from './models'

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request)
  const body = await response.json()
  return body
}

export const getAllPokemons = async (): Promise<Array<Pokemon>> => {
  try {
    let res = await http<ApiResponse>(`${BASE_URL}pokemon/`)
    if (res.next) {
      res = await http<ApiResponse>(`${BASE_URL}pokemon/?limit=${res.count}`)
    }
    return await Promise.all(res.results.map((item) => http<Pokemon>(item.url)))
  } catch (error) {
    throw error
  }
}

export const getPokemonSepecies = async (
  idOrName: number | string
): Promise<PokemonSpecies> => {
  try {
    const res = await http<PokemonSpecies>(
      `${BASE_URL}pokemon-species/${idOrName}/`
    )
    let chain_detail
    if (res.evolution_chain.url) {
      chain_detail = await http<EvolutionChain>(res.evolution_chain.url)
    }
    return { ...res, chain_detail }
  } catch (error) {
    throw error
  }
}
