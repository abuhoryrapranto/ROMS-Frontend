import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layouts/Sidebar";
import Loading from '../components/Loading/Loading_1';
import Button from '../components/Buttons/Medium';
import Modal from "../components/Modals/Default";

const axios = require('axios');

function Menu() {

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        document.title = "Menu"
    }, []);

    const fetchMenus = async () => {

        const token = localStorage.getItem('token');

        axios.get('/menus/all', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setLoading(false);
                setMenus(res.data.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {

        fetchMenus();

    }, []);

    return(
       <Layout>

            <div style={{textAlign: "right", marginRight: "10px"}}>
                <Button
                    name="Add New"
                    bgColor="bg-emerald-500"
                    textColor="text-white"
                    fontWeight="font-semibold"
                    hover="hover:bg-emerald-600"
                    focusColor="focus:ring-emerald-500"
                    click={() => {setOpen(prev => prev+1)}}
                />
            </div>
           
           {
               loading ? <Loading /> :

               <div class="grid grid-cols-6 gap-4">
                   {
                       menus.length > 0 ? menus.map(item => (
                           <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                           </div>
                       )) :
   
                       "No Data Found!"
                   }
                   
               </div>
           }

            <Modal title="Add New Menu" buttonName="Save" show={open} submitFun={handleSubmit()}>

                <div className="mb-4 w-auto">
                    <label className="block text-indigo-500 text-sm font-bold mb-2">Name</label>
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

                <div className="mb-4 w-auto">
                    <label className="block text-indigo-500 text-sm font-bold mb-2">Variants</label>
                    <input 
                    className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" 
                    type="text" 
                    placeholder="Big, Medium, Small"
                    {...register("variants")}
                    />

                    {errors.variants && <small className="text-red-500">{errors.variants?.message}</small>}

                </div>

                <div className="mb-4 w-auto">
                    <label className="block text-indigo-500 text-sm font-bold mb-2">Main Price</label>
                    <input 
                    className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" 
                    type="number" 
                    placeholder="100"
                    {...register("mainPrice", { 
                        required: "The field is required",
                    })}
                    />

                    {errors.mainPrice && <small className="text-red-500">{errors.mainPrice?.message}</small>}

                </div>

                <div className="mb-4 w-auto">
                    <label className="block text-indigo-500 text-sm font-bold mb-2">Offer Price</label>
                    <input 
                    className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" 
                    type="number" 
                    placeholder="90"
                    {...register("offerPrice")}
                    />

                    {errors.offerPrice && <small className="text-red-500">{errors.offerPrice?.message}</small>}

                </div>

            </Modal>

       </Layout>
    );
}

export default Menu;