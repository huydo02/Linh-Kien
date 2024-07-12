import React, { useState, useEffect } from 'react'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const schema = yup
    .object({
        name_product: yup.string().required('name product is required'),
        id_company: yup.string().required('category product is required'),
        image: yup.mixed().test('required', value => {
            return value && value[0] instanceof File;
        }),
        price: yup.number().integer().required('price product is required'),
        price_discount: yup.number().required('price discount product is required'),
        content: yup.string().required('content product is required'),
        description: yup.string().required('description product is required'),

    })
    .required()
const Product = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [productImage, setProductImage] = useState([]);
    const [listCategory, setListCategory] = useState('');


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/list-category');
                if (response.data.status === 200) {
                    setListCategory(response.data.category[0])
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    const convert2base64 = (files) => {
        const promises = [];
        files.forEach((file) => {
            const reader = new FileReader();
            const promise = new Promise((resolve, reject) => {
                reader.onload = () => {
                    resolve(reader.result.toString());
                };
                reader.onerror = reject;
            });
            reader.readAsDataURL(file);
            promises.push(promise);
        });

        Promise.all(promises)
            .then((results) => {
                setImage(results); // Đưa ra một mảng các base64 images
            })
            .catch((error) => {
                console.error('Error converting files to base64:', error);
            });
    };
    const onFileChange = (e) => {
        if (e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setProductImage(filesArray);
            convert2base64(filesArray);
        }
    };
    const onSubmit = (data) => {
        const formData = new FormData();
        console.log(productImage);
        formData.append("name_product", data.name_product);
        formData.append("id_company", data.id_company);
        productImage.forEach((file) => {
            formData.append("image[]", file);
        });
        formData.append("price", data.price);
        formData.append("price_discount", data.price_discount);
        formData.append("content", data.content);
        formData.append("description", data.description);

        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        axios.get('/sanctum/csrf-cookie').then(response => {
            // Sau khi cookie CSRF được thiết lập, gửi yêu cầu POST
            axios.post('/api/add-product', formData, { headers }).then(res => {

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
                                    <h3 className="card-title">Add Products</h3>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className='form-group mb-3'>
                                            <input {...register("name_product")} placeholder='Enter Name Product' className='form-control' />
                                            <p>{errors.name_product?.message}</p>
                                        </div>
                                        <div className='form-group mb-3'>
                                            {/* <input {...register("id_company")} placeholder='Enter Company' className='form-control' /> */}
                                            <select className="form-control" {...register("id_company")} aria-label="Default select example">
                                                <option>Choice Category</option>
                                                {listCategory && listCategory.map((item) => {
                                                    return (
                                                        <option value={item.company} key={item.id}>{item.company}</option>
                                                    )
                                                })}
                                            </select>
                                            <p>{errors.id_company?.message}</p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="file" {...register("image")} multiple onChange={onFileChange} className="form-control" />
                                            <p>{errors.image?.message}</p>

                                            {image && image.map((imageData, index) => (
                                                <img key={index} src={imageData} width='100px' alt={`${index}`} />
                                            ))}
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input {...register("price")} placeholder='Enter Price' className='form-control' />
                                            <p>{errors.price?.message}</p>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input {...register("price_discount")} placeholder='Enter Price Discount' className='form-control' />
                                            <p>{errors.price_discount?.message}</p>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input {...register("content")} placeholder='Enter Content' className='form-control' />
                                            <p>{errors.content?.message}</p>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <input {...register("description")} placeholder='Enter Description' className='form-control' />
                                            <p>{errors.description?.message}</p>
                                        </div>

                                        <button type="submit" className='btn btn-primary'>Add Product</button>
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

export default Product