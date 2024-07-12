import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryHomeItems = () => {

    const [loading, setLoading] = useState(true);

    const [showCategory, setShowCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/list-category-home');
                if (response.data.status === 200) {
                    setShowCategory(response.data.category[0])
                    setLoading(false)

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [loading])

    return (
        <>
            {loading ? (
                <h1>loading...</h1>
            ) : (
                showCategory.map((item) => (
                    <div className="col-lg-4 mb-5" key={item.id}>
                        <div className="card h-100 shadow border-0">
                            <img className="card-img-top" src={`http://localhost:8000/${item.brand}`} alt={item.company} />
                            <div className="card-body p-4">
                                <div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div>
                                <Link className="text-decoration-none link-dark stretched-link" to={`/list-products/${item.company}`}>
                                    <div className="h5 card-title mb-3">{item.company}</div>
                                </Link>
                                <p className="card-text mb-0">{item.description}</p>
                            </div>

                        </div>
                    </div>
                ))

            )}




        </>
    )
}

export default CategoryHomeItems