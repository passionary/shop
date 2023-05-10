import React, { useEffect } from "react";
import Cookies from 'universal-cookie';
import * as jose from 'jose';
import { connect } from "react-redux";
import { setApp } from "../store/app/app.actions";

function BasketWrapper ({ setApp, basket, children }: any) {
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
    } catch(error) {
      console.log(error, "ERROR");
    }
    
    setApp({ basket: [] })
  }
  useEffect(() => {
    getBasket();
  }, []);
  return (
    <div className="container w-25">
      <h1>Basket: { basket.length } elements</h1>

      { children }
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  basket: state.app.basket
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketWrapper)