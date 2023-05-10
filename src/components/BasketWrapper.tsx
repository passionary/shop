import React, { useEffect } from "react";
import Cookies from 'universal-cookie';
import * as jose from 'jose';
import { connect } from "react-redux";
import { setApp } from "../store/app/app.actions";

function BasketWrapper ({ setApp, basket, children }: any) {
  return (
    <div className="container w-25">
      <h1>Basket: { basket.length } elements</h1>

      { children }
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  basket: state.app.basket
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketWrapper)