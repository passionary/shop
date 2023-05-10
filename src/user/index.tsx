import React, { useEffect, useState } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";
import Filter from "../components/Filter";
import ProductList from "./ProductList";
import axios from "axios-instance";

function Products({}: any) {
  const [products, setProducts] = useState([]);
  const setProductsHandler = (array: any) => {
    console.log(array, 'ARRAY PRODUCTS');

    setProducts(array);
  }
  useEffect(() => {
    axios.post('products')
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