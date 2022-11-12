import { hot } from 'react-hot-loader/root';
import './main.global.css';
import React, { useEffect, useState } from "react";
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardsList } from './shared/CardsList';
import { useToken } from './hooks/useToken';

import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer, setToken } from './store/reducer';
import thunk from 'redux-thunk';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Post } from './shared/Post';
import { NotFoundPage } from './shared/NotFoundPage';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function AppComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [ token ] = useToken();

  useEffect(() => {
    if(token) {
      store.dispatch(setToken(token));
    }
  }, [token]);

  return (
    <>
      {mounted && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/posts/" replace />} />
            <Route path="/auth" element={<Navigate to="/posts/" replace />} />
          </Routes>
          <Layout>
            <Header />
              <Routes>
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route
                  path="/posts/*"
                  element=
                  {
                    <Content>
                      <CardsList />
                      <Routes>
                        <Route path=":id" element={ <Post /> } />
                      </Routes>
                    </Content>
                  }
                  >
                </Route>
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
}

export  const App = hot(() => ( <Provider store={store}><AppComponent /></Provider>));

