// Import the react JS packages 
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {useState} from "react";
import axios from "axios";
import Nav from 'react-bootstrap/Nav';


export const Login = () => {     

    const [username, setUsername] = useState('');     
    const [password, setPassword] = useState('');    
    const submit = async e => {          
        e.preventDefault();           
        const user = { // Create the user object.
                username: username,
                password: password
            };

        // Create the POST request
        const {data} = await axios.post('https://badmintonfixtures-71b4cbceb35a.herokuapp.com/token/', user, { 
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });

        console.log(data)
        // Initialize the access & refresh token in localstorage.      
        localStorage.clear();         
        localStorage.setItem('access_token', data.access);         
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('username', username);         
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;    // Set the authorization header for the axios requests. 
        console.log("redirecting")    
        window.location.href = '/'; // Redirect to the home page.
    }

    return (
        <div className="flex justify-center items-center h-screen -mt-16 ">
        <div className="mx-auto max-w-[350px] space-y-6 border-2 border-gray p-4 rounded" >
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your information to login to your account</p>
            </div>
            <div>
                <div className="space-y-4">
                    <form className="Auth-form" onSubmit={submit}>
                        <div className="space-y-2">
                            <Label className="font-semibold" htmlFor="username">Username</Label>
                            <Input id="username" 
                                placeholder="Username" 
                                name='username'  
                                type='text' 
                                value={username}
                                required 
                                onChange={e => setUsername(e.target.value)}/>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-semibold" htmlFor="password">Password</Label>
                            <Input id="password" 
                                name='password' 
                                type="password"     
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}/> 
                        </div>
                        <div className="mt-4">
                        <Button className="w-full bg-green-500 hover:bg-green-700 rounded font-bold text-white" type="submit">
                            Login
                        </Button>
                        </div>
                    </form>
                </div>
                
                <Separator className="my-8" />
                <div className="space-y-4">
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?
                        <Nav.Link href="/register" className="underline" >
                        Register
                        </Nav.Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
    }


