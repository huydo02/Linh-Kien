import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from 'sweetalert2'

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


const EditCategory = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [category, setCategory] = useState([])
    const [image, setImage] = useState('');
    const [brandImage, setBrandImage] = useState('');
    const [loading, setLoading] = useState(true);

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
    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/edit-category/${id}`);
                if (response.data.status === 200) {
                    setCategory(response.data.value[0])
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const onSubmit = (data) => {
        // console.log(data)
        const formData = new FormData();
        formData.append("nameCategory", data.nameCategory);
        formData.append("company", data.company);
        formData.append("description", data.description);
        formData.append("brand", brandImage);
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        axios.get('/sanctum/csrf-cookie').then(response => {
            // Sau khi cookie CSRF được thiết lập, gửi yêu cầu POST
            axios.post(`/api/edit-category-store/${id}`, formData, { headers }).then(res => {

                if (res.data.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: res.data.message,
                    });
                    // Navigate('/admin/list-category')
                } else if (res.data.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.data.message,
                    });
                }

            })
        });
    }

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                category ? (
                    <div>
                        <div className='container py-5'>
                            <div className='row justify-content-center'>
                                <div className='col-md-10'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h4>
                                                View Category
                                                <Link to={'/admin/list-category'} className='btn btn-primary btn-sm float-end' >List Category</Link>
                                            </h4>
                                        </div>
                                        <div className='card-body'>
                                            <form onSubmit={handleSubmit(onSubmit)}>

                                                <div className='form-group mb-3'>
                                                    <input {...register("nameCategory")} placeholder='Enter Name Category'
                                                        defaultValue={category.namecatory} className='form-control' />
                                                    <p>{errors.nameCategory?.message}</p>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <input {...register("company")} placeholder='Enter Company'
                                                        defaultValue={category.company} className='form-control' />
                                                    <p>{errors.company?.message}</p>
                                                </div>

                                                <div className="form-group mb-3">
                                                    <input type="file" {...register("brand")} onChange={onFileChange} className="form-control" />
                                                    <p>{errors.brand?.message}</p>
                                                    {image ?
                                                        <img src={image} width='100px' alt='iamge' /> :
                                                        <img src={`http://localhost:8000/${category.brand}`} alt={category.brand} width="50px" />
                                                    }
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <input {...register("description")} placeholder='description'
                                                        defaultValue={category.description} className='form-control' />
                                                    <p>{errors.description?.message}</p>
                                                </div>

                                                <button type="submit" className='btn btn-primary'>Submit Edit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>No data available</h1>
                )
            )}
        </div>
    )
}

export default EditCategory