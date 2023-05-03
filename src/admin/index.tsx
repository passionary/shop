import React, { useEffect, useRef, useState } from 'react';
import CategoryList from './CategoryList';
import Modal from '../components/modal';
import { setApp } from '../store/app/app.actions';
import { connect } from 'react-redux';

function Admin({ modalText, modalData, setApp }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const callbackHandler = useRef<any>({
    addHandler: Function,
    removeHandler: Function
  });
  const handleCallback = (key: string, callback: Function) => {
    callbackHandler.current[key] = callback;
  }
  const setModal = () => {
    setApp({
      modal: 'add-modal',
      modalText: "Добавление категории"
    });
  }
  const removeCategory = () => {
    const { 
      category,
      parent 
    } = modalData || {};

    if (category) {
      callbackHandler.current.removeHandler(category, parent);
    }
  }
  const addCategory = () => {
    if (inputRef.current) {
      const { category } = modalData || {};

      callbackHandler.current.addHandler(inputRef.current.value, category);
    }
  }

  return (
    <div className="category__wrapper">
      <Modal name="add-modal">
        <p className="category-title" >{modalText}</p>
        <input
          ref={inputRef}
          className="modal-input"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key == 'Enter') {
              addCategory();
            }
          }}
          placeholder="Введите название"
          type="text"
        />
        <br />
        <button
          onClick={addCategory}
          className="main-button"
          style={{
            width: '300px',
            marginTop: '20px',
            marginBottom: '10px'
          }}>
          Добавить
        </button>
      </Modal>
      <Modal name="delete-modal">
        <p className="category-title" >{modalText}</p>
        <button
          onClick={removeCategory}
          className="main-button"
          style={{
            width: '300px',
            marginTop: '20px',
            marginBottom: '10px'
          }}>
          Удалить
        </button>
      </Modal>
      <div className="flex-container justify-content">
        <h1>Категории</h1>
        <div className="css-modal-target-container">
          <a onClick={setModal} className="css-modal-open" href="#css-modal-target">Добавить категорию</a>
        </div>
      </div>
      <hr />
      <CategoryList
        callback={handleCallback}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  modalText: state.app.modalText,
  modalData: state.app.modalData
})
const mapDispatchToProps = {
  setApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)