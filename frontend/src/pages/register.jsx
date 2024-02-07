
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Nav from 'react-bootstrap/Nav';

export const Register = () => {

    const schema = yup.object().shape({ //schema is used to define the rules for the form
        username: yup.string().required("Username is Required"),
        email: yup.string().email().required("Email is Required"),
        password: yup.string().required("Password is Required").min(4).max(20),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords Do Not Match").required(), //oneOf is used to check if the value is equal to the value of another field, in this case, the password field
    });

    const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(schema)}); //resolver is used to validate the form

    const onSubmit = (data) => {

        data = {
            username: data.username,
            email: data.email,
            password: data.password,
        }

        fetch("http://localhost:8000/register/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(() => {
            window.location.href = '/login'
            console.log(data)
            console.log("success")
        })
    };
    
    return (
        <div className="flex justify-center items-center h-screen -mt-16 ">
            <div className="mx-auto w-[350px] max-w-[350px] space-y-6 border-2 border-gray p-4 rounded" >
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Register</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter Your Registration Details</p>
                </div>
                <div>
                    <div className="space-y-4 mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}> 
                            <div className="space-y-2"> 
                                <Label className="font-semibold" htmlFor="username">Username</Label>
                                <Input type="text" placeholder="Username" {...register("username")} /> {errors.username?.message}
                            </div>

                            <div className="space-y-2 mt-2"> 
                                <Label className="font-semibold" htmlFor="username">Email</Label>
                                <Input type="text" placeholder="Email" {...register("email")} /> {errors.email?.message}
                            </div>
                            <div className="space-y-2 mt-2"> 
                                <Label className="font-semibold" htmlFor="username">Password</Label>
                                <Input type="password" placeholder="Password" {...register("password")} />  {errors.password?.message}
                            </div>
                            <div className="space-y-2 mt-2"> 
                                <Label className="font-semibold" htmlFor="username">Confirm Password</Label>
                                <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />   {errors.confirmPassword?.message}
                            </div>
                            <div className="mt-4">
                                <Button className="w-full bg-green-500 hover:bg-green-700 rounded font-bold text-white" type="submit">
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>

                    <Separator className="my-8" />
                    <div className="space-y-4">
                        <div className="mt-4 text-center text-sm">
                            Already have an account?
                            <Nav.Link href="/login" className="underline" >
                            Login
                            </Nav.Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

