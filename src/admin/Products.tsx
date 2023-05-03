import React from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";

function Products ({}: any) {
  return <>
    <h1>Products</h1>
    <a href="/product/edit">Добавить товар</a>
    <div className="filter">

    </div>
    <div className="product__list">

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