import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import logger from 'redux-logger'

import pokedexReducer, { PokedexState } from './reducers'

export const history = createBrowserHistory()

const store = configureStore({
  reducer: pokedexReducer(history),
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().prepend(routerMiddleware(history)).concat(logger)
})

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, PokedexState, null, Action<string>>

export default store
