import React, { useState } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";

function Products({ products }: any) {
  return <>
    {
      products
      &&
      products.map((product: any) => (
        <section key={product.id}>
          <h3>Название: {product.name}</h3>
          <h3>Цена: {product.price}</h3>
          <h3>Категория: {product.category.name}</h3>
          <hr />
        </section>
      ))
    }
  </>
}

const mapStateToProps = (state: any) => ({
  modal: state.app.modal
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)