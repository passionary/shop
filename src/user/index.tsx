import React, { useEffect, useState } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";
import Filter from "../components/Filter";
import ProductList from "./ProductList";
import axios from "axios";

function Products({}: any) {
  const [products, setProducts] = useState([]);
  const setProductsHandler = (array: any) => {
    console.log(array, 'ARRAY PRODUCTS');

    setProducts(array);
  }
  useEffect(() => {
    axios.post('http://127.0.0.1:8000/session-start')
      .then((res: any) => {
        console.log(res.data, 'SESSION START RESPONSE');
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        console.log(document.head.querySelector('meta[name="csrf-token"]'), 'token');

        axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.token;
        axios.defaults.headers.get['Accepts'] = 'application/json';
      })
    axios.post('http://127.0.0.1:8000/api/products')
      .then((res: any) => {
        console.log(res, 'PRODUCT LIST COMPONENT RESPONSE');
        setProducts(res.data);
      })
  }, []);
  return <>
    <h1>Shop</h1>

    <div className="filter">
      <Filter setProducts={setProductsHandler} />
    </div>
    <div className="product__list mt-5">
      <ProductList products={products} />
    </div>
  </>
}

const mapStateToProps = (state: any) => ({
  modal: state.app.modal
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)