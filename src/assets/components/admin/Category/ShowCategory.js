import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ShowCategory = () => {
    const [loading, setLoading] = useState(true);

    const [showCategory, setShowCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/list-category');
                if (response.data.status === 200) {
                    setShowCategory(response.data.category[0])
                    setLoading(false)

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    const delete_category = (e, id) => {
        const thisClicked = e.currentTarget
        thisClicked.innerText = 'Deleteting'
        axios.get(`/api/delete-category/${id}`).then(response => {
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
                    View Category
                    <Link to={'/admin/category'} className='btn btn-primary btn-sm float-end' >Add Category</Link>
                </h4>
            </div>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>company</th>
                                <th>brand</th>
                                <th>description</th>
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
                                showCategory.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.namecatory}</td>
                                        <td>{item.company}</td>
                                        <td><img style={{ width: "50px", height: '50px' }} src={`http://localhost:8000/${item.brand}`} alt={item.brand} width="50px" /> </td>
                                        <td>{item.description}</td>
                                        <td><Link to={`/admin/list-category/edit-category/${item.id}`} className='btn btn-success btn-sm'>edit</Link></td>
                                        <td><button type='button' onClick={(e) => delete_category(e, item.id)} className='btn btn-danger btn-sm'>delete</button></td>

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

export default ShowCategory