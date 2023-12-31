import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useRef, useImperativeHandle } from 'react';
import './App.css';
import '../src/assets/font/fontawesome-free-6.4.0-web/css/all.css'
import GlobalStyle from './components/GlobalStyles';

import { publicRoutes, privateRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout/index'

function App() {
 

  return (
    <BrowserRouter>
      <GlobalStyle>
        <div className="App">
          <Routes>
            {
              publicRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                const Component = route.component;
                return <Route key={index} path={route.path} element={<Layout value><Component /></Layout>}></Route>
              })
            }
          </Routes>
        </div>
      </GlobalStyle>
    </BrowserRouter>

  );
}

export default App;
