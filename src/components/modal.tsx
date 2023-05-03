import React from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";

function Modal ({ name, children, setApp, modal }: any) {
  const closeModal = () => {    
    setApp({
      modal: false,
      modalData: null
    })
  }
  if(modal == name) {
    return (
      <div className="css-modal-target" id="css-modal-target">
        <div className="cmt">
          { children }
        </div>
        <a href="#" onClick={closeModal} className="css-modal-close"></a>
      </div>
    )
  }
  return <></>
}

const mapStateToProps = (state: any) => ({
  modal: state.app.modal
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)