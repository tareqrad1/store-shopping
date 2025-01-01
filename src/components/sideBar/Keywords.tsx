import { FC, useCallback } from "react";
import { FilterContextShape } from "../../context/FilterContextProvider";

interface KeywordShape {
  keyWordEle: string;
}
interface ContextInputShape {
  filterPropKeyword: FilterContextShape;
}
const Keywords: FC<KeywordShape & ContextInputShape> = ({ keyWordEle, filterPropKeyword }): JSX.Element => {
  const { keyword, setKeyWord } = filterPropKeyword
  const handleClickKeyword = useCallback((keyword: string) => {
    setKeyWord(keyword.toLowerCase());
  },[keyword]);
  return (
    <div>
        <div className="mb-2 cursor-pointer hover:bg-slate-50 font-sans">
          <button onClick={() => handleClickKeyword(keyWordEle)} className=" text-left capitalize py-2 px-2 w-full border-[1px] text-[14px] border-[#7777774d]">{keyWordEle}</button>
        </div>
    </div>
  )
}

export default Keywords