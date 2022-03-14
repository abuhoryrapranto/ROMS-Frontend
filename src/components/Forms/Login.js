import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from '../Buttons/Small';
const axios = require('axios');


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const [serverMessage, setServerMessage] = useState("");

    let navigate = useNavigate();

    const onSubmit = (data) => {
       // navigate('/dashboard')

       axios.post('/auth/login', data)
       .then(res => {
           if(res.status === 200) {
            navigate('/dashboard');
           }
        //console.log(res.status);
       })
       .catch(err => {
           
           if(err.response.status === 404) setServerMessage(err.response.data.message);
        
       })
      
    }

    return (
        <div className="w-5/12 px-3 pb-1">
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

                    <Button 
                        name="Login"
                        bgColor="bg-emerald-500"
                        textColor="text-white"
                        fontWeight="font-bold"
                        hover="hover:bg-emerald-700"
                        type="submit"
                    />

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