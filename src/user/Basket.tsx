import React, { useEffect, useRef, useState } from "react";
import axios from "axios-instance";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { setApp } from "../store/app/app.actions";

function Basket({ basket, message, setApp }: any) {
  const total = useRef<number>(0);
  const cookies = new Cookies();
  const [basketList, setBasketList] = useState([]);
  const setBasketItems = async (basket: any[]) => {
    console.log(basket, "BASKET SET ITEMS");

    if (!basket) return;

    const object = {} as any;
    const array = [] as any;

    basket.forEach((basket_item: any) => {
      if (!object[basket_item]) {
        array.push(basket_item);

        object[basket_item] = 1;
      }
      else {
        object[basket_item]++;
      }
    });

    const response = await axios.post('products/get', {
      products: array
    })
    console.log(response, 'PRODUCT GET RESPONSE');

    let products = response.data || [] as any;
    products = products.map((p: any) => ({
      ...p,
      quantity: object[p.id]
    }));

    console.log(products, 'CART PRODUCTS');


    setBasketList(products);

    console.log(array, 'BASKET !!!!!!!');
  }
  useEffect(() => {
    setBasketItems(basket);
  }, [basket]);

  const purchaseHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = document.getElementById('basket-form');

    axios.post('order/create', form)
      .then(res => {
        console.log(res.data, 'PURCHASE RESPONSE');

        if (!res.data.errors) {
          setApp({
            message: res.data.message,
            messageStatus: 'Message',
          });
          cookies.remove('jwt_token');
        }
        else {
          const error = res.data.errors[0] || 'Some went wrong';

          setApp({
            basket,
            message: error,
            messageStatus: 'ERROR'
          });
        }
      })
  }

  const renderCart: any = () => {
    let totalAmount = 0;
    total.current = 0;

    if (basketList) {
      if (!!basketList.length) {
        return basketList.map((b: any, index: number) => {
          totalAmount += b.price * b.quantity;

          if (index == basketList.length - 1) {
            total.current = totalAmount;
          }

          console.log(b.price, b.quantity, 'TOTAL CURRENT');

          return (
            <div key={b.id}>
              <h2 className="mb-3">{b.name}</h2>
              <p>Количество: {b.quantity}</p>
              <p>Стоимость: {b.price} x {b.quantity} шт = {b.price * b.quantity} тенге</p>
              <input type="hidden" name="products[]" value={JSON.stringify(b)} />
              <hr />
            </div>
          )
        })
      }
    }
  }
  const renderAmount: any = () => {
    setTimeout(() => {
      console.log(total.current, 'TOTAL CURRENT');
    }, 1000)

    if (total.current) {
      return (
        <h3 className="text-end">
          Общая стоимость: {total.current} тенге
        </h3>
      )
    }
  }
  return (
    <div className="pb-5">
      <h1 className="mb-5 text-end">Товары</h1>

      <form id="basket-form" onSubmit={purchaseHandler}>
        <div className="d-flex justify-content-between">
          <div className="form-cart pt-2 col-5">
            <div className="form-control px-4 pb-4 pt-3 mb-4">
              <label className="mb-2" htmlFor="name">Имя</label>
              <br />
              <input className="w-100" id="name" name="name" type="text" placeholder="Введите имя" />
            </div>
            <div className="form-control px-4 pb-4 pt-3 mb-4">
              <label className="mb-2" htmlFor="name">Телефон</label>
              <br />
              <input className="w-100" id="name" name="phone" type="text" placeholder="Введите телефон" />
            </div>
            <div className="form-control px-4 pb-4 pt-3 mb-4">
              <label className="mb-2" htmlFor="email">Почта</label>
              <br />
              <input className="w-100" id="email" name="email" type="email" placeholder="Введите почту" />
            </div>
            <div className="form-control px-4 pb-4 pt-3 mb-4">
              <label className="mb-2" htmlFor="address">Адрес</label>
              <br />
              <input className="w-100" id="address" name="address" type="text" placeholder="Введите адрес" />
            </div>
            <input className="app-btn" type="submit" value="Купить" />
          </div>
          <div className="cart-info col-5">
            {renderCart()}
            {renderAmount()}
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  basket: state.app.basket,
  message: state.app.message,
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)