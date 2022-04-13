import { useState } from "react";
import { MdSettings } from "react-icons/md";

export default function ProductCard(props) {

    const [dropdown, setDropdown] = useState(-1);

    function dropDownToggle(id) {
        setDropdown(prev => prev === -1 ? id: -1);
    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                   {
                       props.menus.length > 0 ? props.menus.map(item => (
                           <div className="p-6 max-w-sm bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700" key={item.slug}>
                                <p className="mb-1 text-indigo-500 font-semibold text-xl">{item.name}</p>
                                <hr />
                                <div className="mt-1 mb-1">
                                {
                                    item.offerPrice ? <p className="text-gray-500 font-semibold">Price: <small className="text-red-500"><del>{item.mainPrice}</del></small> <span className="text-emerald-500">{item.offerPrice}</span></p>  : <p className="text-gray-500 font-semibold">Price: <span className="text-emerald-500">{item.mainPrice}</span></p>
                                }
                                </div>
                                <hr />
                                <p className="mt-1 mb-1 text-gray-500 font-semibold">Variants: <small className="text-emerald-500">{item.variants ? item.variants : <span className="text-red-500">None</span> }</small></p>
                                <hr />
                                <p className="mt-1 mb-1 text-gray-500 font-semibold">Type: <span className="text-emerald-500">{item.type}</span></p>
                                <hr />
                                <div className="mt-3 cursor-pointer">
                                <button id="dropdownTopButton" data-dropdown-toggle="dropdownTop" data-dropdown-placement="top"
                                    className="mr-3 mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
                                    onClick={() => dropDownToggle(item.id)}>
                                    <MdSettings />
                                </button>

                                    <div id="dropdownTop" className={"z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 " + (dropdown === item.id ? "block" : "hidden")} 
                                    
                                    style={{position: dropdown === item.id ? "absolute" : "", margin: dropdown === item.id ? "0px 0px 50px 0px" : "", zIndex: "1"}}
                                    
                                    >
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownTopButton">
                                            <li>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                           </div>
                       )) :
   
                       "No Data Found!"
                   }
                   
               </div>
    );
}