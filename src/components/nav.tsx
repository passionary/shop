import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import * as jose from 'jose';
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";

function NavComponent({ setApp, basket, children }: any) {
  const location = useLocation();
  const navigate = useNavigate();

  const cookies = new Cookies();
  const getBasket = async () => {
    try {
      const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      );
      const token = cookies.get('jwt_token') || '';
      let { payload } = await jose.jwtVerify(token, secret) as any;
      payload = payload || {};
      let { basket } = payload;
      basket = basket || [];
      setApp({ basket });
      return;
    } catch (error) {
      console.log(error, "ERROR");
    }

    setApp({ basket: [] })
  }
  useEffect(() => {
    getBasket();
  }, []);

  const renderCart = () => {
    if (['/', '/cart'].includes(location.pathname)) {
      return (
        <div className="mt-4">
          <a className="nav__cart" href="/cart">
            <div className="nav__cart-image">
              <img src={
                basket
                &&
                basket.length
                &&
                require('assets/icons/shopping-cart-filled.png')
                ||
                require('assets/icons/shopping-cart.png')
              }
                alt=""
              />
            </div>
            <div className="nav__cart-count">
              <p>
                {basket.length}
              </p>
            </div>
            Корзина
          </a>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div style={{
          width: '25%'
        }} className="mt-4 d-flex justify-content-between">
          <a href="#" onClick={() => navigate(-1)}>Назад</a>
          <a href="/">Главная</a>
          <a href="/product">Товары</a>
          <a href="/categories">Категории</a>
        </div>
        {renderCart()}
      </div>
      <div className="mb-5"></div>
      {children}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  basket: state.app.basket
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent)