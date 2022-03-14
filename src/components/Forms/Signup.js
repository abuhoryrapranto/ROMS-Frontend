import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from '../Buttons/Small';

function Signup() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [data, setData] = useState("");

    const onSubmit = (data) => console.log(data);

    return (
        <div className="w-5/12 px-3 pb-1">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-1" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="font-semibold text-xl text-emerald-500 mb-3">Register</h4>
                <hr className="mb-2" />

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name
                    </label>
                    <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("fullName", 
                    { required: "The field is required"})} 
                    type="text" 
                    placeholder="John Doe" 
                    />

                    {errors.fullName && <small className="text-red-500">{errors.fullName?.message}</small>}

                </div>

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

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone
                    </label>
                    <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("phone", 
                    { required: "The field is required"})} 
                    type="number" 
                    placeholder="8801*********" 
                    />

                    {errors.phone && <small className="text-red-500">{errors.phone?.message}</small>}

                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"} 
                    {...register("password", { required: "The field is required"})} 
                    type="password" 
                    placeholder="******************" />

                    {errors.password && <small className="text-red-500">{errors.password?.message}</small>}

                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"} 
                    {...register("passwordConfirmation", { 
                        required: "The field is required",
                        validate: (value) => value === watch('password') || "Passwords don't match."
                    })} 
                    type="password" 
                    placeholder="******************" />

                    {errors.passwordConfirmation && <small className="text-red-500">{errors.passwordConfirmation?.message}</small>}

                </div>

                <div className="flex items-center justify-between">

                    <Button 
                    name="Register"
                    bgColor="bg-emerald-500"
                    textColor="text-white"
                    fontWeight="font-bold"
                    hover="hover:bg-emerald-700"
                    type="submit"
                    />

                    <Link className="inline-block align-baseline font-bold text-sm text-emerald-500 hover:text-emerald-800" to="/">
                        Already registered? Login
                    </Link>

                </div>
            </form>
        </div>
    );
}

export default Signup;