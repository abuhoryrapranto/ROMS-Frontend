import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layouts/Sidebar";
import Loading from '../components/Loading/Loading_1';
import Button from '../components/Buttons/Medium';
import Modal from "../components/Modals/Default";
import Toast from '../components/Alert/Toast';
import ProductCard from "../components/Cards/ProductCard";
import Cart from "../components/Cards/Cart";

const axios = require('axios');

function Menu() {

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(0);
    const [category, setCategory] = useState([]);
    const [serverMessage, setServerMessage] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        document.title = "Menus"
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

    const fetchCategories = async () => {

        const token = localStorage.getItem('token');
        axios.get('/categories/all', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setCategory(res.data.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {

        fetchCategories();

    }, []);

    const onSubmit = async (data) => {

        

        const filterData = {
            "name" : data.name,
            "categoryId": data.category,
            "variants": data.variants ? data.variants : null,
            "mainPrice": parseFloat(data.mainPrice),
            "offerPrice": data.offerPrice ? parseFloat(data.offerPrice) : null,
            "type": data.type
        }

        console.log(filterData);

        const token = localStorage.getItem('token');
        await axios.post('/menus/save', filterData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if(res.status === 201) {
                    setServerMessage("Menu saved successfully");
                    setOpen(0);
                    fetchMenus();
                }
            })
            .catch(err => {
                console.log(err)
            })

            reset();
       
    }

    return(
       <Layout>

            { serverMessage && <Toast message={serverMessage} /> }

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
            <br />
            <Cart />
           { loading ? <Loading /> : <ProductCard menus={menus} /> }

            <Modal title="Add New Menu" buttonName="Save" show={open} submitFun={handleSubmit(onSubmit)}>

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
                    <label className="block text-indigo-500 text-sm font-bold mb-2">Category</label>
                    <select id="countries" className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline"
                    {...register("category", { 
                        required: "The field is required",
                    })}
                    >
                    <option value="">---Select---</option>
                    {category?.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                    </select>

                    {errors.categoryId && <small className="text-red-500">{errors.categoryId?.message}</small>}

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
                </div>

                <div className="mb-4 w-auto">
                    <label className="block text-indigo-500 text-sm font-bold mb-2">Type</label>
                    <select className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline"
                    {...register("type", { 
                        required: "The field is required",
                    })}
                    >
                    <option value="">---Select---</option>
                    <option value="regular">Regular</option>
                    <option value="addon">Addon</option>
                    </select>

                    {errors.type && <small className="text-red-500">{errors.type?.message}</small>}


                </div>

            </Modal>

       </Layout>
    );
}

export default Menu;