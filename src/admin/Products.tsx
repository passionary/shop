import React, { useRef } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import Modal from '../components/modal';

function Products({ modalData, modalText }: any) {
  const callbackHandler = useRef<any>();
  const handleCallback = (callback: Function) => {
    callbackHandler.current = callback;
  }
  const removeProduct = () => {
    const { product } = modalData || {};

    if (product) {
      callbackHandler.current(product);
    }
  }

  return <>
    <h1>Products</h1>
    <Modal name="delete-product">
        <p className="category-title" >{modalText}</p>
        <button
          onClick={removeProduct}
          className="main-button"
          style={{
            width: '300px',
            marginTop: '20px',
            marginBottom: '10px'
          }}>
          Удалить
        </button>
      </Modal>
    <a href="/product/edit">Добавить товар</a>
    <div className="product__list">
      <ProductList callback={handleCallback} />
    </div>
  </>
}

const mapStateToProps = (state: any) => ({
  modalData: state.app.modalData,
  modalText: state.app.modalText
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)