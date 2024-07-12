import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminAccept = () => {
    const [loading, setLoading] = useState(true);
    const [showList, setShowList] = useState([]);
    const [status, setStatus] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/list-bought');
                if (response.data.status === 200) {
                    setShowList(response.data.value)
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    const handleAccept = (e, id) => {
        e.preventDefault();
        axios.get(`/api/accept-cart/${id}`).then(response => {
            if (response.data.status === 200) {
                const updatedList = showList.map(item =>
                    item.id === id ? { ...item, status: 'Accepted' } : item
                );
                setShowList(updatedList);

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
            }
        });
    }
    const handleDisAccept = (e, id) => {
        e.preventDefault();
        axios.get(`/api/disaccept-cart/${id}`).then(response => {
            if (response.data.status === 200) {
                // Update the status of the order directly in showList
                const updatedList = showList.map(item =>
                    item.id === id ? { ...item, status: 'Disaccept' } : item
                );
                setShowList(updatedList);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
            }
        });
    };

    return (
        <div className='card px-4 mt-3'>
            <div className='card-header'>
                <h4>
                    View Order Pending
                </h4>
            </div>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped '>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User Name</th>
                                <th>Price</th>
                                <th>date</th>
                                <th>status</th>
                                <th>Accept</th>
                                <th>DisAcept</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan='5'>Loading...</td>
                                </tr>
                            ) : (
                                showList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.created_at}</td>
                                        <td>
                                            {item.status === 'Processing' ? (
                                                <button className="btn btn-warning btn-block justify-content-between" type="button">
                                                    <span></span><span>{item.status}<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                </button>
                                            ) : item.status === 'Accepted' ? (
                                                <button className="btn btn-success btn-block justify-content-between" type="button">
                                                    <span></span><span>Accepted<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                </button>
                                            ) : item.status === 'Disaccept' ? (
                                                <button className="btn btn-danger btn-block justify-content-between" type="button">
                                                    <span></span><span>Disaccept<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                </button>
                                            ) : (
                                                <button className="btn btn-secondary btn-block justify-content-between" type="button">
                                                    <span></span><span>{item.status}<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            {item.status === 'Accepted' ? (
                                                <button type='button' className='btn btn-light btn-sm'>Accept</button>

                                            ) : (
                                                <button type='button' onClick={(e) => handleAccept(e, item.id)} className='btn btn-primary btn-sm'>Accept</button>

                                            )}
                                        </td>
                                        <td>
                                            {item.status === 'Disaccept' ? (
                                                <button type='button' className='btn btn-light btn-sm'>Disaccept</button>

                                            ) : (
                                                <button type='button' onClick={(e) => handleDisAccept(e, item.id)} className='btn btn-danger btn-sm'>Disaccept</button>
                                            )}
                                        </td>

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

export default AdminAccept