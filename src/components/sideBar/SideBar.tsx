import { useEffect, useState } from "react";
import Categories from "./Categories";
import InputField from "./InputField";
import Keywords from "./Keywords";
import useFetch from "../../hooks/useFetch";
import { useFilter } from "../../hooks/useFilter";
import Navbar from "../Navbar";

const SideBar = (): JSX.Element => {
    const { data } = useFetch('https://dummyjson.com/products');
    const [category, setCategory] = useState<string[]>([]);
    const {
      searchQuery,setSearchQuery,
      selectedCategory,setSelectedCategory,
      minPrice,setMinPrice,
      maxPrice,setMaxPrice,
      keyword,setKeyWord,
    } = useFilter();
    const [keywords] = useState<string[]>([
      "apple",
      "watch",
      "fashion",
      "trend",
      "shoes",
      "shirt",
    ]);
    useEffect(() => {
      const uniqCategory = Array.from(new Set(data.products.map((ele) => ele.category)));
      setCategory(uniqCategory)
    },[data]);
    function handleResetFilters() {
      setSearchQuery('');
      setSelectedCategory('');
      setMinPrice(undefined);
      setMaxPrice(undefined);
      setKeyWord('');
    }
    const [dropOpen, setDropOpen] = useState<boolean>(false);
  return (
    <>
      <Navbar dropOpen={dropOpen} setDropOpen={setDropOpen} />
      <div className={dropOpen === true ? 'block transition-shadow' : 'hidden md:block' }>
          <div className="mt-3">
              <InputField filterPropInput={{ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyword, setKeyWord }} />
          </div>
          <div>
              <Categories category={category} filterPropCategory={{ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyword, setKeyWord }} />
          </div>
          <div>
            <h1 className="capitalize mb-2 mt-2 font-semibold text-2xl">keyWords</h1>
            {keywords.map((ele, i:number) => (
              <Keywords key={i} keyWordEle={ele} filterPropKeyword={{ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyword, setKeyWord }} />
            ))}
          </div>
          <button onClick={handleResetFilters} className="transition-opacity bg-black text-white w-full p-2 mt-2 rounded-md capitalize text-sm hover:opacity-80">resit filter</button>
      </div>
    </>
  )
};
export default SideBar;