import { useEffect } from 'react';
import SignupForm from '../components/Forms/Signup'

function Login() {

    useEffect(() => {
        document.title = "Register"
    }, []);

    return (
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    
                    <div>
                        <div className="" style={{marginTop: "20rem", marginLeft: "15rem"}}>
                            <p className="text-3xl font-semibold text-slate-600">Restaurant Order Manager</p>
                            <p className="font-semibold"><span className="text-slate-600">By</span> <span className="text-emerald-600">FlabApp</span></p>
                        </div>
                        
                    </div>

                    <div className="flex justify-center items-center bg-emerald-500"  style={{minHeight: "100vh"}}>
                        <SignupForm />
                    </div>
                </div>
    );
}

export default Login;