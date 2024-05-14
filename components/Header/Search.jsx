import { BsX, BsSearch } from "react-icons/bs";

const Search = ({ setOpenHeader }) => {
    return (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-300 px-2 py-5">
            <div>
                <BsX
                    className="text-[30px] text-left bg-gray-700 text-white rounded"
                    onClick={() => setOpenHeader("")}
                />
            </div>

            <input
                type="text"
                name="search" id="id"
                placeholder="Search item here..."
                className="outline-none bg-transparent text-sm placeholder:text-gray-500 h-12 pr-3 w-52"
            />
        </div>
    )
}

export default Search