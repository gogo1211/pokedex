import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { push } from 'connected-react-router'
import { hot } from 'react-hot-loader'

import { PokedexState } from './reducers'
import { fetchPokemons } from './reducers/pokemonsSlice'

import MainPage from './pages/MainPage'
import PokemonPage from './pages/PokemonPage'
import Loader from './components/Loader'

import './style/style.scss'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: PokedexState) => state.pokemon)

  React.useEffect(() => {
    dispatch(fetchPokemons())
  }, [])

  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <a onClick={() => dispatch(push('/'))}>
              <h1 className="title">Pokédex</h1>
              <h2 className="subtitle">
                A way for Ash and his friends to identify any Pokémon
              </h2>
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="app-content">
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route path="/pokemon/:name">
                <PokemonPage />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        )}
      </div>
    </>
  )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
