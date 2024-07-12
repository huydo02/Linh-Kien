import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DeleteCategory = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([])

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

    return (
        <div>DeleteCategory
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <h1>{category.namecatory}</h1>
            )
            }
        </div>
    )
}

export default DeleteCategory