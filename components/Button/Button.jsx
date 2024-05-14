import React from 'react'

const Button = ({ title }) => {
    return <button className="px-10 bg-gray-700 text-white py-3 rounded-full hover:bg-gray-800 hover:transition hover:ease-in-out hover:duration-500 font-bold">{title}</button>
}

export default Button