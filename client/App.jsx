import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Router from './Router';
import configureStore from './store';
import ScrollToTop from './components/ScrollToTop';
import { setCurrentUser } from './store/actions/authAction';

const store = configureStore();

if (localStorage.jwt) {
   const user = jwtDecode(localStorage.getItem('jwt'));
   store.dispatch(setCurrentUser(user));
}

const App = () => (
   <Provider store={store}>
      <BrowserRouter>
         <ScrollToTop>
            <Router />
         </ScrollToTop>
      </BrowserRouter>
   </Provider>
);

export default hot(module)(App);
