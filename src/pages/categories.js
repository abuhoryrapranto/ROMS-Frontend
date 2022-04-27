import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layouts/Sidebar";
import Modal from "../components/Modals/Default";
import Button from '../components/Buttons/Medium';
import Table from "../components/Tables/Table_1";
import Toast from '../components/Alert/Toast';

const axios = require('axios');

function Categories() {

    const [open, setOpen] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, setValue, formState: { errors: errors2 } } = useForm();
    const [serverMessage, setServerMessage] = useState("");

    const [category, setCategory] = useState([]);

    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateModalOpen, setUpdateModalOpen] = useState(0);


    useEffect(() => {
        document.title = "Categories"
    }, []);

    const fetchCategories = async () => {

        const token = localStorage.getItem('token');
        axios.get('/categories/all', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setLoading(false);
                setCategory(res.data.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    }

    useEffect(() => {

        fetchCategories();

    }, []);


    const onSubmit = async (data) => {

        const token = localStorage.getItem('token');
        await axios.post('/categories/save', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setServerMessage("Category saved successfully");
                setOpen(0);
                fetchCategories();
            })
            .catch(err => {
                console.log(err)
            })
       
    }

    function updateModalValue(e) {
        e.preventDefault();
        setValue("update_name",e.target.attributes.getNamedItem('data-name').value);
        setId(e.target.attributes.getNamedItem('data-id').value)
    }

    const updateData = async (data) => {

        const token = localStorage.getItem('token');
        
        const filterData = {
            "name": data.update_name
        };

        await axios.put(`/categories/update/${id}`, filterData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                fetchCategories();
                setUpdateModalOpen(0);
                setServerMessage("Category updated successfully");
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(

        <Layout>
            <div className="categories-main">
            {
                serverMessage && <Toast message={serverMessage} />
            }
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
                    category.length > 0 ?

                    <Table tableHeaders={['Name', 'Active']} tableData={category} loading={loading} >
                    <>
                        {category.map(item => (
                            <tr className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600" key={item.id}>
                                
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </td>

                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {
                                        item.status ? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Yes</span>
                                        :
                                        <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">No</span>
                                    }
                                </td>

                                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                    <button data-name={item.name} data-id={item.id} className="text-blue-600 dark:text-blue-500 hover:underline" onClick={(e) => {updateModalValue(e);setUpdateModalOpen(prev => prev+1)}}>Edit</button> 
                                </td>

                            </tr>
                        ))}
                    </>
                    </Table> :

                    "No Data Found!"
                }

                <div>
                    <Modal title="Add New Category" buttonName="Save" show={open} submitFun={handleSubmit(onSubmit)}>

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
                    </Modal>
                </div>

                <div>
                    <Modal title="Update Category" buttonName="Update" show={updateModalOpen} submitFun={handleSubmit2(updateData)}>

                        <div className="mb-4 w-auto">
                            <label className="block text-indigo-500 text-sm font-bold mb-2">Name</label>
                            <input 
                            className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" 
                            type="text" 
                            {...register2("update_name", { 
                                required: "The field is required",
                            })}
                            />

                            {errors2.update_name && <small className="text-red-500">{errors2.update_name?.message}</small>}

                        </div>
                    </Modal>
                </div>
            </div>
        </Layout>
    );
}

export default Categories;