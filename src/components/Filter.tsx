import React, { useEffect, useState } from "react";
import FilterOption from "./FilterOption";
import axios from "@/axios";

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
    <div className="container w-25">
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