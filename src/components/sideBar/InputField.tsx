import { ChangeEvent, FC } from "react"
import { FilterContextShape } from "../../context/FilterContextProvider"

interface ContextInputShape {
  filterPropInput: FilterContextShape;
}
const InputField: FC<ContextInputShape> = ({ filterPropInput }): JSX.Element => {
  const { searchQuery, setSearchQuery, minPrice, setMinPrice, maxPrice, setMaxPrice } = filterPropInput;
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined);
  }
  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined);
  }
  return (
    <div className="w-[100%] space-y-3 text-black">
      <input type="text" value={searchQuery} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} placeholder="Search Products" className="px-4 py-2 w-[100%] border-[1px] border-[#7777774d] border-solid text-sm focus:outline outline-[.1px] outline-[#3e3c3c]" />
      <div className="flex space-x-1 text-black w-full">
        <input value={minPrice ?? ''} onChange={handleMinPriceChange} type="text" placeholder="Min" className="w-[50%] px-2 py-2 border-[1px] border-[#7777774d] border-solid text-sm focus:outline outline-[.1px] outline-[#3e3c3c] focus:border-none"/>
        <input type="text" value={maxPrice ?? ''} onChange={handleMaxPriceChange} placeholder="Max" className="w-[50%] px-2 py-2 border-[1px] border-[#7777774d] border-solid text-sm focus:outline outline-[.1px] outline-[#3e3c3c] focus:border-none"/>
      </div>
    </div>
  )
}
export default InputField