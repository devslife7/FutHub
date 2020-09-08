import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
  // applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
      // main: '#43a047'
    }
  },
  // typography: {
  //   fontFamily: 'Arial',
  //   h1: {
  //     fontSize: '1.5em',
  //     fontFamily: 'Arial'
  //   }
  // }
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)