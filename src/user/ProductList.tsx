import React, { useEffect, useState } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";
import * as jose from 'jose';
import Cookies from "universal-cookie";

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
);
const alg = 'HS256';

function Products({ products, basket, setApp }: any) {
  const cookies = new Cookies();
  const [quantity, setQuantity] = useState<any>({});

  const addToBasket = async (product: any) => {
    let jwt: string;
    let basket = [] as any[];

    try {
      const token = cookies.get('jwt_token') || '';
      let { payload } = await jose.jwtVerify(token, secret) as any || {};

      if (payload) {
        let {
          basket: basketArray,
          exp
        } = payload;
        basket = basketArray || [];

        if (basket) {
          basket = basket.concat(product.id);
          payload = { basket }
        }
        console.log(payload, 'UPDATE JWT PAYLOAD');

        jwt = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setIssuer('urn:example:issuer')
          .setAudience('urn:example:audience')
          .setExpirationTime('1h')
          .sign(secret)

        cookies.set('jwt_token', jwt, {
          expires: new Date(exp * 1000)
        });

        setApp({ basket })

        return;
      }
    } catch (error) {
      console.log(error, 'JWT ERROR');
    }

    basket = [product.id];
    jwt = await new jose.SignJWT({ basket })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .setExpirationTime('1h')
      .sign(secret)

    let { exp, payload } = await jose.jwtVerify(jwt, secret) as any || {};

    console.log(payload, 'CHECK NEW PAYLOAD');

    setApp({ basket })
    cookies.set('jwt_token', jwt, {
      expires: new Date(exp * 1000)
    });
  }

  const removeFromBasket = async (product: any) => {
    let jwt: string;
    let basket = [] as any[];

    try {
      const token = cookies.get('jwt_token') || '';
      let { payload } = await jose.jwtVerify(token, secret) as any || {};

      if (payload) {
        let {
          basket: basketArray,
          exp
        } = payload;
        basket = basketArray || [];

        if (basket.length) {
          const index = basket.findIndex((b: any) => b == product.id);

          basket.splice(index, 1);
          payload = { basket }
        }
        console.log(payload, 'UPDATE JWT PAYLOAD');

        jwt = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setIssuer('urn:example:issuer')
          .setAudience('urn:example:audience')
          .setExpirationTime('1h')
          .sign(secret)

        cookies.set('jwt_token', jwt, {
          expires: new Date(exp * 1000)
        });

        setApp({ basket })

        return;
      }
    } catch (error) {
      console.log(error, 'JWT ERROR');
    }
  }

  const setQuantities = (basket: any) => {
    const object = {} as any;

    basket.forEach((basket_item: any) => {
      if (!object[basket_item]) {
        object[basket_item] = 1;
      }
      else {
        object[basket_item]++;
      }
    });

    setQuantity(object);
  }
  useEffect(() => {
    setQuantities(basket);
  }, [basket]);

  return <div className="d-flex justify-content-between flex-wrap">
    {
      products
      &&
      products.map((product: any) => (
        <div style={{
          width: "47%"
        }} className="card p-0 mb-3" key={product.id}>
          <div className="card-header">
            <div className="card-title">
              <h3>Название: {product.name}</h3>
            </div>
          </div>
          <div className="card-body">
            <h3>Цена: {product.price}</h3>
            <h3>Количество: {quantity && quantity[product.id]}</h3>
            <h3 className="mb-3">Категория: {product.category.name}</h3>
            <button className="app-btn" onClick={() => addToBasket(product)} >Добавить в корзину</button>
              <button className="app-btn btn__delete" onClick={() => removeFromBasket(product)} >Удалить</button>
          </div>
        </div>
      ))
    }
  </div>
}

const mapStateToProps = (state: any) => ({
  basket: state.app.basket
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)