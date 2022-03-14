import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layouts/Sidebar";
import Modal from "../components/Modals/Default";
import Button from '../components/Buttons/Medium';
import Table from "../components/Tables/Table_1";
const axios = require('axios');

function Categories() {

    const [open, setOpen] = useState(0);
    const cancelButtonRef = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const [serverMessage, setServerMessage] = useState("");

    useEffect(() => {
        document.title = "Categories"
    }, []);


    const onSubmit = (data) => {
        
       
     }

    return(

        <Layout>
            <div className="categories-main">
            <div>
                <Button
                    name="Add New"
                    bgColor="bg-emerald-500"
                    textColor="text-white"
                    fontWeight="font-semibold"
                    hover="hover:bg-emerald-600"
                    focusColor="focus:ring-emerald-500"
                    click={() => setOpen(prev => prev+1)}
                />
                </div>


                <Table />

                <Modal title="Add New Category" show={open}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 w-96">
                            <label className="block text-emerald-500 text-sm font-bold mb-2">Name</label>
                            <input 
                            className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" 
                            type="text" 
                            placeholder="Burger"
                            {...register("name", { 
                                required: "The field is required",
                            })}
                            />

                            {errors.name && <small className="text-red-500">{errors.name?.message}</small>}

                        </div>

                        <div className="float-right">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-500 text-base font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                            Save
                            </button>

                            <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                            >
                            Cancel
                        </button>
                        </div>
                    </form>
                    
                </Modal>
            </div>
        </Layout>
    );
}

export default Categories;