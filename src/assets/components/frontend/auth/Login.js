import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CryptoJS from 'crypto-js';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const schema = yup
    .object({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
    })
    .required()
const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({
        error_list: '',
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
            axios.post('/api/login', data).then(res => {
                // console.log(res)
                if (res.data.status === 200) {
                    // const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(res.data), 'user').toString();
                    const encryptedname = CryptoJS.AES.encrypt(JSON.stringify(res.data.username), 'auth_name').toString();
                    // const encryptedUrole = CryptoJS.AES.encrypt(JSON.stringify(res.data.role), 'role').toString();
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', encryptedname)
                    localStorage.setItem('role', res.data.role)
                    localStorage.setItem('user', res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                    });
                    navigate('/')
                }
                else if (res.data.status === 401) {
                    // console.log(res)

                    setError({ ...error, error_list: res.data.message })

                } else {
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
                                <h4>Login</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {error.error_list}

                                    <div className='form-group mb-3'>
                                        <input {...register("email")} placeholder='EmailID' className='form-control' />
                                        <p>{errors.email?.message}</p>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input {...register("password")} type='password'
                                            placeholder='password' className='form-control' />
                                        <p>{errors.password?.message}</p>
                                    </div>
                                    <button type="submit" className='btn btn-primary'>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login