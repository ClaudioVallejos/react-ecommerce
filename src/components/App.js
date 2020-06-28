import React from 'react';

//css styletron
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

//Librerias
import { BrowserRouter as Router, Switch, Route }  from 'react-router-dom';

//Contextos
import ShopProvider from '../context/shopContext';

//Components
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import NavBar from '../components/Navbar';
import Cart from '../components/Cart'

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Crea una instancia del motor del cliente.
const engine = new Styletron();


function App() {
  return (
    <ShopProvider>
       <StyletronProvider value={engine} debug={debug} debugAfterHydration>
         <Router>
           <NavBar />
           <Cart/>
           <Switch>
              <Route path="/product/:id">
               <ProductPage/>
              </Route>
              <Route path="/">
                <HomePage/>
              </Route>
            </Switch>
          </Router>
        </StyletronProvider>
    </ShopProvider>

  );
}

export default App;
