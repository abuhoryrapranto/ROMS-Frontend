export default function Cart(props){

    // let items = JSON.parse(localStorage.getItem('cart'));

    // useEffect(() => {
       
    // },[])

    return(
                <div className="relative p-4 w-96 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700" style={{minHeight: "85vh", display: (props.show) ? "block" : "none"}}>
                <div className="flex justify-between items-center mb-4">
                    <h5 className="inline text-xl font-bold leading-none text-gray-900 dark:text-white">Cart Items</h5>
                    <span className="inline"> 
                    <button type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                    onClick={props.click}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    </span>
                </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                               props.items.length > 0 ? props.items.map(item => (

                                <li className="py-3 sm:py-4" key={item.id + Math.random()}>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                               { item.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {item.variant}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {item.price}
                                        </div>
                                    </div>
                                </li>

                               )) :
                            "No Cart Data Found!"
                            }
                        </ul>
                    </div>
                    <div className="absolute bottom-2 right-5">
                    <button type="button" className="text-white bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700">
                        Place Order
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    </div>
                </div>
    );
}