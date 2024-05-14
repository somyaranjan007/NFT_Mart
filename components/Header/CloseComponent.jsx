import { BsX } from "react-icons/bs";

const CloseComponent = ({ setOpenHeader, children, right }) => {
    return (
        <div className={`absolute w-64 py-5 px-2 rounded-[5px] bg-slate-300 text-black top-20 s(1):top-[100px] s(1):right-[481px] s(2):right-[603px] `}>
            <div className="flex items-center justify-end">
                <BsX className="text-[30px] text-left bg-gray-700 text-white rounded mb-2" onClick={() => setOpenHeader("")} />
            </div>
            {children}
        </div>
    )
}

export default CloseComponent