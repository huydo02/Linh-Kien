import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ShowProducts = () => {
    const [loading, setLoading] = useState(true);
    const [showProducts, setShowProducts] = useState('');
    const images = ''
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/list-product');
                if (response.data.status === 200) {
                    setShowProducts(response.data.value)
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    const delete_product = (e, id) => {
        const thisClicked = e.currentTarget
        thisClicked.innerText = 'Deleteting'
        axios.get(`/api/delete-product/${id}`).then(response => {
            if (response.data.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                })
                thisClicked.closest("tr").remove()
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
                thisClicked.innerText = 'Delete'

            }
        });


    }
    return (
        <div className='card px-4 mt-3'>
            <div className='card-header'>
                <h4>
                    View Products
                    <Link to={'/admin/add-product'} className='btn btn-primary btn-sm float-end' >Add Products</Link>
                </h4>
            </div>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped '>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Discount Price</th>
                                <th>Content</th>
                                <th>Description</th>
                                <th>update</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan='5'>Loading...</td>
                                </tr>
                            ) : (
                                showProducts.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name_product}</td>
                                        <td>{item.id_company}</td>

                                        <td>
                                            {item.image.split(',').map((image, index) => (
                                                <img style={{ width: "50px", height: '50px' }} src={`http://localhost:8000/uploads/imgProducts/${image}`} alt={image + index} key={index} />
                                            ))}
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.price_discount}</td>
                                        <td>{item.content}</td>
                                        {/* <td><img src={`http://localhost:8000/${item.brand}`} alt={item.brand} width="50px" /> </td> */}
                                        <td>{item.description}</td>
                                        <td><Link to={`/admin/list-products/view-edit-products/${item.id}`} className='btn btn-success btn-sm'>edit</Link></td>
                                        <td><button type='button' onClick={(e) => delete_product(e, item.id)} className='btn btn-danger btn-sm'>delete</button></td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShowProducts