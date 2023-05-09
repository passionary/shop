import React, { useEffect, useState } from 'react';
import { setApp } from '../store/app/app.actions';
import { connect } from 'react-redux';
import { Toast } from 'bootstrap';

function ToastComponent({ app, children }: any) {
  const [toast, setToast] = useState<any>();

  useEffect(() => {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
      return new Toast(toastEl);
    })

    if (toastList) {
      if (toastList.length) {
        setToast(toastList[0]);
      }
    }
  }, []);
  useEffect(() => {
    if (toast) {
      if (app.message) {
        toast.show();
      }
    }
  }, [app]);

  return (
    <>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">{app.messageStatus}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {app.message}
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  app: state.app,
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastComponent)