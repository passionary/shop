import React from "react";
import axios from "axios-instance";

export default function FilterOption ({ 
  option,
  filterClass,
  setProducts 
}: any) {
  const filterProducts = () => {
    axios.post('categories/filter/' + option.value)
    .then(res => {
      console.log(res.data, 'RESPONSE FILTER');
      setProducts(res.data);
    })
  }

  return (
    <div className={filterClass}>
      <a onClick={filterProducts} href="#">
        {option && option.title}
      </a>
      {
        option
        &&
        option.children.map((c: any) => (
          <FilterOption 
            key={c.value} 
            option={c} 
            filterClass={"filter-option"}
            setProducts={setProducts} 
          />
        ))
      }
    </div>
  )
}