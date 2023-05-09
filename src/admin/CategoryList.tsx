import React, { useEffect, useRef, useState } from 'react';
import Category from './Category';
import axios from 'axios';
import { connect } from 'react-redux';
import { setApp } from '../store/app/app.actions';

function CategoryList({
  setApp,
  callback,
}: any) {
  const [categories, setCategories] = useState<any>([]);
  const callbackHandler = useRef<Function>(Function);
  const setCallbackHandler = (callback: Function) => {
    callbackHandler.current = callback;
  }
  const removeRootCategory = (category: any) => {
    setCategories((categories: any[]) => categories.filter((c: any) => c.id != category.id));
  }
  const addRootCategory = (category: any) => {    
    setCategories((categories: any[]) => categories.concat(category));
  }
  const addCategoryHandler = (name: string, category: any) => {
    if (!name) return;

    const { id } = category || {};
    let url = 'http://127.0.0.1:8000/api/categories/add';

    if (id) {
      url += `/${id}`;
    }

    axios.post(url, {
      name
    })
      .then(res => {
        if (category) {
          callbackHandler.current({
            ...category,
            children: [
              ...category.children,
              res.data
            ]
          });
        }
        else {
          addRootCategory(res.data);
        }
        setApp({
          modal: false,
          message: 'Категория добавлена успешно!',
          messageStatus: 'Message'
        })
      });
  }
  const removeCategoryHandler = (category: any, parent: any) => {
    const { id } = category;
    let url = `http://127.0.0.1:8000/api/categories/delete/${id}`;

    axios.post(url)
      .then(res => {
        if (category.parent_id) {
          callbackHandler.current({
            ...parent,
            children: parent.children.filter((c: any) => c.id != id)
          });
        }
        else {
          removeRootCategory(category);
        }

        setApp({
          modal: false,
          message: res.data.message,
          messageStatus: 'Message'
        })
      })
  }
  const renderCategoryList = () => {
    if (categories) {
      if (categories.length) {
        return categories.map((category: any) => (
          <Category
            key={category.id}
            category={category}
            callback={setCallbackHandler}
            categoryClass="parent category"
          />
        ));
      }
    }
  }

  const loadCategories = () => {
    axios.post('http://127.0.0.1:8000/api/categories')
      .then(res => {
        setCategories(res.data.items);
      })
  }

  useEffect(() => {
    loadCategories();
    callback('addHandler', addCategoryHandler);
    callback('removeHandler', removeCategoryHandler);
  }, []);

  return (
    <div className="category__list">
      {renderCategoryList()}
    </div>
  );
}
const mapStateToProps = (state: any) => ({
  modalData: state.app.modalData
})
const mapDispatchToProps = {
  setApp
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)