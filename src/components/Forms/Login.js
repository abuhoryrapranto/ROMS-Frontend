import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from '../Buttons/Small';
const axios = require('axios');


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [spinner, setSpinner] = useState(false);

    let navigate = useNavigate();

    const onSubmit = (data) => {

        setSpinner(true);

        axios.post('/auth/login', data)
        .then(res => {

            if(res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            }
        })
        .catch(err => {

            setSpinner(false);

            if(err.response.status === 404) setServerMessage(err.response.data.message);
       })
      
    }

    return (
        <div className="px-3 pb-1 sm:w-96 md:5/12 lg:5/12">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-1" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="font-semibold text-xl text-emerald-500 mb-3">Login</h4>
                <hr className="mb-2" />
                {serverMessage && <p className="font-semibold text-red-500">{serverMessage}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("email", 
                    { required: "The field is required",
                    pattern:{
                        value:  /^\S+@\S+$/i,
                        message: "This is not valid email"
                    }})} 
                    type="text" 
                    placeholder="johndoe@company.com" 
                    />

                    {errors.email && <small className="text-red-500">{errors.email?.message}</small>}

                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("password", { 
                        required: "The field is required",
                        minLength:{
                            value: 5,
                            message: "Password should be 5 digits"
                        }
                    })} 
                    type="password" 
                    placeholder="******************" />

                    {errors.password && <small className="text-red-500">{errors.password?.message}</small>}

                </div>

                <div className="flex items-center justify-between">

                    {
                        spinner == false ? <Button 
                        name="Login"
                        bgColor="bg-emerald-500"
                        textColor="text-white"
                        fontWeight="font-bold"
                        hover="hover:bg-emerald-700"
                        type="submit"
                    /> :

                    <button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-white bg-emerald-500 rounded-lg border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                        <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Loading...
                    </button>
                    }

                    <a className="inline-block align-baseline font-bold text-sm text-emerald-500 hover:text-emerald-800" href="/">
                        Forgot Password?
                    </a>

                </div>

                <Link className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-emerald-800 mt-2" to="/register">
                    Create an account
                </Link>
            </form>
        </div>
    );
}

export default Login;