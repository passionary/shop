import React, { useEffect, useState } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";
import axios from "axios-instance";

function ProductList({ setApp, callback }: any) {
  const [products, setProducts] = useState([]);
  const removeProductHandler = (product: any) => {
    const { id } = product;
    let url = `products/delete/${id}`;

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
  const removeProduct = (product: any) => {
    setApp({
      modal: 'delete-product',
      modalText: `Удаление товара "${product.name}"`,
      modalData: { product }
    })
  }
  useEffect(() => {
    callback(removeProductHandler);

    axios.post('products')
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
            <div style={{
              width: "47%"
            }} className="card p-0 mb-5" key={product.id}>
              <div className="card-header">
                <div className="card-title">
                  <h3>Название: {product.name}</h3>
                </div>
              </div>
              <div className="card-body">
                <h3>Цена: {product.price}</h3>
                <h3 className="mb-3">Категория: {product.category.name}</h3>
                <button style={{
                  width: '200px'
                }} className="app-btn">
                  <a style={{
                    textDecoration: 'none'
                  }} href={'/product/edit/' + product.id}>Редактировать</a>
                </button>
                <button className="app-btn" onClick={() => removeProduct(product)}>Удалить</button>
              </div>
            </div>
          ))
        )
      }
    }
  }

  return <>
    <div className="product__list d-flex justify-content-between flex-wrap">
      {renderProducts()}
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