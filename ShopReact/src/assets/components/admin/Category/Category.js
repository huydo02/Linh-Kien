import React, { useState } from 'react'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const schema = yup
    .object({
        nameCategory: yup.string().required(),
        company: yup.string().required(),
        brand: yup.mixed().test('required', value => {
            return value && value[0] instanceof File;
        }),
        description: yup.string().required(),

    })
    .required()
const Category = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [brandImage, setBrandImage] = useState('');
    // const [error, setError] = useState({
    //     error_list: '',
    // });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const convert2base64 = file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result.toString())
        }
        reader.readAsDataURL(file)

    }
    const onFileChange = (e) => {
        if (e.target.files.length > 0) {
            setBrandImage(e.target.files[0])
            convert2base64(e.target.files[0])
        }
    };
    const onSubmit = (data) => {
        const formData = new FormData();
        // console.log(brandImage);
        formData.append("nameCategory", data.nameCategory);
        formData.append("company", data.company);
        formData.append("description", data.description);
        formData.append("brand", brandImage);
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        axios.get('/sanctum/csrf-cookie').then(response => {
            // Sau khi cookie CSRF được thiết lập, gửi yêu cầu POST
            axios.post('/api/category', formData, { headers }).then(res => {

                if (res.data.status === 200) {

                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: res.data.message,
                    });
                    // navigate('/')
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.data.message,
                    });
                    // setError({ ...error, error_list: res.data.validation_errors })
                }
            })
        });
    }
    return (
        <>

            <div>
                <div className='container py-5'>
                    <div className='row justify-content-center'>
                        <div className='col-md-10'>
                            <div className='card'>
                                <div className="card-header">
                                    <h3 className="card-title">Add Category</h3>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className='form-group mb-3'>
                                            <input {...register("nameCategory")} placeholder='Enter Name Category' className='form-control' />
                                            <p>{errors.nameCategory?.message}</p>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input {...register("company")} placeholder='Enter Company' className='form-control' />
                                            <p>{errors.company?.message}</p>
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="file" {...register("brand")} onChange={onFileChange} className="form-control" />
                                            <p>{errors.brand?.message}</p>
                                            {image ?

                                                <img src={image} width='100px' alt='iamge' />
                                                : null
                                            }
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input {...register("description")} placeholder='description' className='form-control' />
                                            <p>{errors.description?.message}</p>
                                        </div>

                                        <button type="submit" className='btn btn-primary'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category