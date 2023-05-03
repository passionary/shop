import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { setApp } from '../store/app/app.actions';

const toggleClass = {
  'true': 'toggle',
  'false': ''
} as any
const hasChildClass = {
  'true': 'has-child',
  'false': ''
} as any
const scaleClass = {
  'true': 'scale',
  'false': ''
} as any

function Category({
  callback,
  updateHandler,
  category,
  parent,
  setApp,
  categoryClass,
}: any) {
  const [categoryInstance, setCategoryInstance] = useState(category);
  const [toggle, setToggle] = useState(false);
  const [scale, setScale] = useState(false);
  const hasChild = useMemo(() => !(categoryInstance.children && categoryInstance.children.length), [categoryInstance]);
  const toggleMenu = () => {
    setScale(true);
    setToggle(toggle => !toggle);
  }
  const resetScale = () => {
    setScale(false);
  }
  const addCategory = () => {
    callback(updateStateHandler);

    setApp({
      modal: 'add-modal',
      modalText: `Добавление категории в ${category.name}`,
      modalData: {
        category: categoryInstance
      }
    });
  }
  const updateStateHandler = (data: any) => {
    setCategoryInstance(data);
    setToggle(true);
  }
  const removeCategory = (event: React.MouseEvent<HTMLDivElement> & { target: Element }) => {
    event.preventDefault();
    
    const update = updateHandler ? updateHandler : updateStateHandler;

    callback(update);
    setApp({
      modal: 'delete-modal',
      modalText: `Удаление категории ${category.name}`,
      modalData: {
        category: categoryInstance,
        parent
      }
    });
  }

  return (
    <div className={categoryClass}>
      <div className="flex-container justify-content">
        <div className="flex-container">
          <div
            onAnimationEnd={resetScale}
            onClick={toggleMenu}
            className={`category__icon ${toggleClass[toggle + '']} ${hasChildClass[hasChild + '']} ${scaleClass[scale + '']}`}>
          </div>
          <h1>
            {category.name}
          </h1>
        </div>
        <div className="flex-container">
          <div onClick={addCategory} className="category__add"></div>
          <div onClick={removeCategory} className="category__remove"></div>
        </div>
      </div>
      {
        toggle
        &&
        categoryInstance.children.map((category: any) => (
          renderCategory(category, categoryInstance, callback, updateStateHandler)
        ))
      }
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

const CategoryComponent = connect(mapStateToProps, mapDispatchToProps)(Category);
const renderCategory = (category: any, parent: any, callback: Function, update: Function) => {
  return (
    <CategoryComponent
      key={category.id}
      categoryClass="category"
      category={category}
      parent={parent}
      callback={callback}
      updateHandler={update}
    />
  )
}

export default CategoryComponent