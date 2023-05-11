import React, { useEffect, useState } from "react";
import FilterOption from "./FilterOption";
import axios from "axios-instance";

export default function ({ setProducts }: any) {
  const [categories, setCategories] = useState<any>(null);
  
  useEffect(() => {
    axios.post('categories/tree')
      .then((res: any) => {
        console.log(res, 'FILTER COMPONENT RESPONSE');
        setCategories(res.data.items);
      })
  }, []);
  return (
    <div>
      <h2 style={{
        marginLeft: '-22px',
        marginBottom: '24px'
      }}>Фильтр</h2>
      {
      categories
      &&
      categories.map((category: any) => (
        <FilterOption 
          key={category.value} 
          option={category}
          setProducts={setProducts} 
          filterClass={"filter-option parent"}
        />
      ))}
    </div>
  )
}