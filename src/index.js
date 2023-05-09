import React from 'react';
import Index from './admin';
import Products from './admin/Products';
import ProductEdit from './admin/ProductEdit';
import UserIndex from './user';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store from './store/saga.root';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import NavWrapper from './components/nav';
import BasketWrapper from './components/BasketWrapper';
import Basket from './user/Basket';
import Toast from './components/Toast';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <NavWrapper><Index /></NavWrapper>,
  },
  {
    path: "/product",
    element: <NavWrapper><Products /></NavWrapper>,
  },
  {
    path: "/product/edit/:id?",
    element: <NavWrapper><ProductEdit /></NavWrapper>,
  },
  {
    path: "/cart",
    element:
      <NavWrapper>
        <BasketWrapper>
          <Basket />
        </BasketWrapper>
      </NavWrapper>,
  },
  {
    path: "/",
    element:
      <NavWrapper>
        <BasketWrapper>
          <UserIndex />
        </BasketWrapper>
      </NavWrapper>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toast>
        <RouterProvider router={router} />
      </Toast>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();