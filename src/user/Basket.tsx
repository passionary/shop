import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

function Basket({ basket }: any) {
  const [basketList, setBasketList] = useState([]);
  const setBasketItems = async (basket: any[]) => {
    console.log(basket, "BASKET SET ITEMS");
    
    if(!basket) return;

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

    const response = await axios.post('http://127.0.0.1:8000/api/products/get', {
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
  return (
    <div className="container w-25">
      <h1>Basket</h1>


      {
        basketList
        &&
        !!basketList.length
        &&
        basketList.map((b: any) => (
          <div key={b.id}>
            <h1>{b.name}</h1>
            <p>Количество: {b.quantity}</p>
          </div>
        ))
        ||
        `${basketList} IS NULL`
        }
        
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  basket: state.app.basket
})
const mapDispatchToProps = {
  // setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)