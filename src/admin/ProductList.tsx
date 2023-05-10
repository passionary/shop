import React, { useEffect, useState } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";
import axios from "axios";

function ProductList({ setApp, callback }: any) {
  const [products, setProducts] = useState([]);
  const removeProductHandler = (product: any) => {
    const { id } = product;
    let url = `http://127.0.0.1:8000/api/products/delete/${id}`;

    axios.post(url)
    .then(res => {
      setProducts(products => products.filter((p: any) => p.id != product.id));

      setApp({
        modal: false,
        message: res.data.message,
        messageStatus: 'Message'
      });
    })
  }
  const removeProduct = (event: React.MouseEvent<HTMLAnchorElement>, product: any) => {
    event.preventDefault();
    
    setApp({
      modal: 'delete-product',
      modalText: `Удаление товара "${product.name}"`,
      modalData: { product }
    })
  }
  useEffect(() => {
    callback(removeProductHandler);

    axios.post('http://127.0.0.1:8000/api/products')
      .then((res: any) => {
        setProducts(res.data);
        console.log(res, 'TREE RESPONSE');
      })
  }, []);
  const renderProducts = () => {
    if (products) {
      if (products.length) {
        return (
          products.map((product: any) => (
            <section key={product.id}>
              <h3>Название: {product.name}</h3>
              <h3>Цена: {product.price}</h3>
              <h3>Категория: {product.category.name}</h3>
              <a href={'/product/edit/' + product.id}>Редактировать</a>
              <br />
              <a onClick={(event: React.MouseEvent<HTMLAnchorElement>) => removeProduct(event, product)} href="#">Удалить</a>
              <hr />
            </section>
          ))
        )
      }
    }
  }

  return <>
    <div className="product__list">
      { renderProducts() }
    </div>
  </>
}

const mapStateToProps = (state: any) => ({
  modal: state.app.modal
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)