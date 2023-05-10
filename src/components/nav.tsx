import React from "react";
import { useNavigate } from "react-router-dom";

export default function ({ children }: any) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div style={{
        width: '35%'
      }} className="mt-4 d-flex justify-content-between">
        <a href="#" onClick={() => navigate(-1)}>Назад</a>
        <a href="/">Главная</a>
        <a href="/product">Товары</a>
        <a href="/cart">Корзина</a>
        <a href="/admin">Категории</a>
      </div>
      <div className="mb-5"></div>
      {children}
    </div>
  )
}