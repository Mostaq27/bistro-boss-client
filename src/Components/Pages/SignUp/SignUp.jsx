
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider';
import signupImg from "../../../assets/others/authentication2.png"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';

import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';




const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, getValues, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, upodateUserProfole } = useContext(AuthContext);
    const navigate = useNavigate();


    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                upodateUserProfole(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    
                                    Swal.fire({
                                        position: 'top',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };








    // const handleLogin = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     console.log(name, email, password)
    //     signIn(email, password)
    //         .then(result => {
    //             const user = result.user;
    //             console.log(user)
    //         })
    // }


    return (
        <>
            {/* <Toaster></Toaster> */}
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero log-in min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse shadow-2xl">
                    <div className="text-center md:w-1/2 lg:text-left ">
                        <img src={signupImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm  ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className='text-5xl font-bold text-center text-black'>SignUp now!</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered " />
                                {errors.email && <span className="text-red-600">Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{6,}$/i })} name="password" placeholder="password" className="input input-bordered " />
                                {errors.password?.type === 'pattern' && <p className="text-red-500">More than 6 digit with capital latter & special character</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" ref={captchaRef} name="captcha" placeholder="Type the captcha above" className="input input-bordered" required />
                                <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button>
                            </div> */}
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary text-white font-semibold" value="Sign Up" />
                            </div>
                            <div className="form-control">
                                <p className='text-[#e98d4c]'><small>Already registered? <Link to='/login'>  Go to log in</Link></small></p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SignUp;