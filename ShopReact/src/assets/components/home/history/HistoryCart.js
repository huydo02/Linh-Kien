import React, { useEffect, useState } from 'react'
import Head from '../headlogo/head'
import axios from 'axios'

const HistoryCart = () => {
    const [loading, setLoading] = useState(true)
    const [listHistory, setListHistory] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/show-historycart`);
                if (response.data.status === 200) {
                    setListHistory(response.data.value)
                    setLoading(false)

                }
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <section className="py-5">
                {loading ? (
                    <h1>loading...</h1>
                ) : (
                    listHistory ? (
                        <div className="container px-4 px-lg-5 mt-5">

                            <table className="table table-bordered border-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Quantity Products</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Purchase date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {listHistory.map((item) => (
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.quantity}</td>
                                            <td>{item.totalPrice}</td>
                                            <td>{item.created_at}</td>
                                            <td>
                                                {item.status === 'Processing' ? (
                                                    <button className="btn btn-warning btn-block justify-content-between" type="button">
                                                        <span></span><span>Processing...<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                    </button>
                                                ) : item.status === 'Accepted' ? (

                                                    <button className="btn btn-success btn-block justify-content-between" type="button">
                                                        <span></span><span>Success<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                    </button>
                                                ) : (item.status === 'Disaccept' ? (
                                                    <button className="btn btn-danger btn-block justify-content-between" type="button">
                                                        <span></span><span>Failed<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-secondary btn-block justify-content-between" type="button">
                                                        <span></span><span>Failed<i className="fa fa-long-arrow-right ml-1"></i></span>
                                                    </button>
                                                )
                                                )}
                                            </td>

                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h1>loading...</h1>

                    )
                )}

            </section>
        </>
    )
}

export default HistoryCart