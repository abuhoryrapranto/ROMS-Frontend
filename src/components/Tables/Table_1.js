import Loading from '../Loading/Loading_1';

function Table_1(props) {

    return(
        <>
            {
                props.loading ? 
                
                <Loading />
                
                
                :

                <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-5">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-auto shadow-md sm:rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        {props.tableHeaders.map(item => (
                                            <th scope="col" className="py-3 px-6 text-xs font-bold tracking-wider text-left text-indigo-500 uppercase dark:text-gray-400" key={item.name}>
                                                {item}
                                            </th>
                                        ))}
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 float-right"
                                        >
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {props.children}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default Table_1