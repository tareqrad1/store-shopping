import { LoaderPinwheel, ShoppingCart, Tally3, WifiOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react"
import { useFilter } from "../../hooks/useFilter";
import useFetch from "../../hooks/useFetch";
import { DataProducts } from "../../Types";
import Card from "./Card";
import { useCart } from "../../hooks/useCart";


const MiddleProducts = () => {
  const Navigate = useNavigate();
  const { state } = useCart();
  const { selectedCategory, searchQuery, minPrice, maxPrice, keyword } = useFilter();  
  const [ dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemPerPage = 18;
  const [disableBtn] = useState<boolean>(true);
  const [dataFetching, setDataFetching] = useState<DataProducts[]>([]);
    const url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage - 1) * itemPerPage}`;
  const { isLoading, data, isError } = useFetch(url);
  const filterProductByAll = () => {
    //search query
    if(searchQuery) {
      const filterProducts = data.products.filter((prod) => prod.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return setDataFetching(filterProducts);
    }
    //selected Category
    if(selectedCategory) {
      const filterProducts = data.products.filter((prod) => prod.category === selectedCategory);
      return setDataFetching(filterProducts);
    }
    // minimum price
    if(minPrice !== undefined) {
      const filterProducts = data.products.filter((prod) => prod.price >= minPrice);
      return setDataFetching(filterProducts);
    }
    // maximum price
    if(maxPrice !== undefined) {
      const filterProducts = data.products.filter((prod) => prod.price <= maxPrice);
      return setDataFetching(filterProducts);
    }
    // keyword section
    if(keyword) {
      const filterProduct = data.products.filter((prod) => prod.description === keyword)
      return setDataFetching(filterProduct);
    }
    return setDataFetching(data.products);
  }
  useEffect(() => {
    filterProductByAll();
  },[searchQuery, selectedCategory, data.products, minPrice, maxPrice]);

  function handleClickAll() {
    setDataFetching(data.products);
    setDropDownOpen(!dropDownOpen);
  }
  const totalProduct = 100;
  const totalPage = Math.ceil(totalProduct / itemPerPage);
  function handleChangePage(direction: 'next' | 'prev') { if (direction === 'next' && currentPage < totalPage) { setCurrentPage(currentPage + 1); } else if (direction === 'prev' && currentPage > 1) { setCurrentPage(currentPage - 1); } }
  return (
    <div className="relative mt-1 p-[10px]">
        <div className="flex justify-between w-full cursor-pointer mb-9">
          <Tally3  onClick={() => setDropDownOpen(!dropDownOpen)} />
          <div className="relative"><ShoppingCart onClick={() => Navigate('/cart')}  />
            <span className="text-sm absolute right-[-11px] top-[20px]">{state.cart.length}</span>
          </div>
        </div>
        {dropDownOpen && 
        <div className=" px-4 w-fit flex flex-col absolute top-8 left-7 z-10 bg-black text-white rounded-r">
          <button className="text-left capitalize" onClick={handleClickAll}>all</button>
        </div>}
      <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-y-3 gap-x-2">
        {isLoading && !isError && <LoaderPinwheel className="absolute left-1/2 top-1/2 animate-spin w-[30px] h-[30px]" />}
        {!isLoading && isError && <h1 className="flex text-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{isError}<WifiOff className="ml-2" /> </h1>}
        {!isLoading && !isError && data.products.length > 0 && (
          dataFetching.map((prod) => (
            <Card dataProps={prod} key={prod.id} />
          ))
        )}
      </div>
        {!isLoading && (
          <div className="text-right space-x-1 mt-4 sm:mt-3">
            <button className={`px-4 py-1 bg-black text-white ${disableBtn ? 'text-slate-300' : 'text-white'}`} disabled={disableBtn} onClick={() => handleChangePage ('prev')}>Prev</button>
            <button className="px-4 py-1 bg-black text-white" onClick={() => handleChangePage ('next')}>Next</button>
          </div>
        )}
    </div>
  )
}

export default MiddleProducts