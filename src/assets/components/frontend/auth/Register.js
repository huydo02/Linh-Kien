import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const schema = yup
    .object({
        name: yup.string().required().max(20),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        password_confirmation: yup.string().required().min(8),

    })
    .required()
const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({
        error_list: [],
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        // console.log(data)
        axios.get('/sanctum/csrf-cookie').then(response => {
            // Sau khi cookie CSRF được thiết lập, gửi yêu cầu POST
            axios.post('/api/register', data).then(res => {
                console.log(res)
                if (res.data.status === 200) {
                    // console.log(localStorage.setItem('auth_token'))

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username)
                    localStorage.setItem('role', res.data.role)

                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: res.data.message,
                        // footer: '<a href="#">Why do I have this issue?</a>'
                    });
                    navigate('/')
                }
                else {
                    // console.log(res.data.validation_errors)
                    setError({ ...error, error_list: res.data.validation_errors })
                }
            })
        });
    }
    return (
        <div>
            <Navbar />
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Register</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='form-group mb-3'>
                                        <input {...register("name")} placeholder='name' className='form-control' />
                                        <p>{errors.name?.message}</p>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input {...register("email")} placeholder='email' className='form-control' />
                                        <p>{errors.email?.message}</p>
                                        <p>{error.error_list?.email}</p>

                                    </div>
                                    <div className='form-group mb-3'>
                                        <input {...register("password")} type='password'
                                            placeholder='password' className='form-control' />
                                        <p>{errors.password?.message}</p>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input {...register("password_confirmation")} type='password'
                                            placeholder='password_confirmation' className='form-control' />
                                        <p>{errors.password_confirmation?.message}</p>
                                        <p>{error.error_list?.password}</p>

                                    </div>
                                    <button type="submit" className='btn btn-primary'>submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register