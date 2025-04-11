import React, { useState } from 'react'
import authService from '../appWrite/auth'
import { Button, Logo, Input } from './index'
import { login } from '../features/authSlice'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSumbit } = useForm()
    const [error, setError] = useState("")

    const signUp = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const user = await authService.getUser()
                if (user) dispatch(login(user))
                navigate("/")
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSumbit(signUp)}>
                    <div className='space-y-5'>
                        <Input
                            label="Name"
                            placeholder="Enter Your Full Name"
                            {...register("name", {
                                required: true
                            })}
                        />

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="password"
                            placeholder="Enter Password"
                            type="password"
                            {...register("password" , {
                                required : true
                            })}
                            
                            
                        />

                        <Button type='sumbit' className='w-full'>Create Account</Button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default SignUp