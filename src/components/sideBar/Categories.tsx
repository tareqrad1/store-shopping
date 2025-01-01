import { FC } from "react";
import { FilterContextShape } from "../../context/FilterContextProvider";

interface ContextInputShape {
  filterPropCategory: FilterContextShape;
}
interface CategoryShape {
    category: string[];
}
const Categories:FC<CategoryShape & ContextInputShape> = ({ category, filterPropCategory }): JSX.Element => {
  const { selectedCategory, setSelectedCategory } = filterPropCategory;
  return (
    <div>
        <h1 className="capitalize mb-3 mt-2 font-semibold text-2xl">categories</h1>
        {category.map((cat, i:number) => (
            <div className="space-x-1" key={i}>
                <input type="radio" value={cat} onChange={() => setSelectedCategory(cat)} checked={selectedCategory === cat} id={cat} className="font-normal text-sm"/>
                <label htmlFor={cat} className="uppercase cursor-pointer text-sm">{cat}</label>
            </div>
        ))}
    </div>
  )
}

export default Categories;