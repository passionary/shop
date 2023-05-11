import React, { useEffect, useState } from "react";
import { setApp } from "../store/app/app.actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { TreeSelect } from 'antd';
import axios from "axios-instance";

function Products({ setApp }: any) {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let url = 'products/edit';

    if (id) {
      url += `/${id}`;
    }
    const form = document.querySelector('#form') as any;
    axios.post(url, new FormData(form))
      .then(res => {
        console.log(res.data, 'PRODUCTS RESPONSE');

        if (!res.data.errors) {
          setApp({
            message: res.data.message,
            messageStatus: 'Message',
          });
        }
        else {
          const error = res.data.errors[0] || 'Some went wrong';

          setApp({
            message: error,
            messageStatus: 'ERROR'
          });
        }
      })
  }
  const title = id ? "Редактирование товара" : "Создание товара";

  useEffect(() => {
    if (id) {
      axios.post('products/get/' + id)
        .then(({ data }: any) => {
          console.log(data, 'PRODUCT GET RESPONSE');
          setName(data.name);
          setPrice(data.price);
          setValue(data.parent_id);
        })
    }
    axios.post('categories/tree')
      .then((res: any) => {
        console.log(res, 'TREE RESPONSE');
        setCategories(res.data.items);
      })
  }, []);

  return <>
    <h1 className="text-center mb-5">{title}</h1>
    <div className="container pb-5 w-50">
      <form id="form" onSubmit={onSubmitHandler} action="">
        <div className="form-control px-4 pb-4 pt-3 mb-4">
          <label className="mb-2" htmlFor="">Категория</label>
          <input type="hidden" name="parent_id" value={value} />
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Выберите категорию"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={categories}
          />
        </div>
        <div className="form-control px-4 pb-4 pt-3 mb-4">
          <label className="mb-2" htmlFor="name">Имя</label>
          <br />
          <input placeholder="Введите имя" value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} className="w-100" id="name" name="name" type="text" />
        </div>
        <div className="form-control px-4 pb-4 pt-3 mb-4">
          <label className="mb-2" htmlFor="price">Цена</label>
          <br />
          <input placeholder="Введите цену" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)} value={price} name="price" className="w-100" id="price" type="text" />
        </div>
        <input className="app-btn mt-3" type="submit" />
      </form>
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