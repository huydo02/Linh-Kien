import Home from "../assets/components/home/Home"
import Page403 from "../assets/components/home/Page403"
import Page404 from "../assets/components/home/Page404"
import Cart from "../assets/components/home/cart/Cart"
import HistoryCart from "../assets/components/home/history/HistoryCart"
import ListProduct from "../assets/components/home/list_Products/ListProduct"
import DetailProduct from "../assets/components/home/list_Products/detail"
import ListHome from "../assets/components/home/list_home"
import BestLaptopNews from "../assets/components/home/news/BestLaptopNews"



const ClientRoute = [
    {
        name: 'home',
        path: '/',
        component: <ListHome />
    },
    {
        name: 'detail',
        path: '/list-products/detail/:id',
        component: <DetailProduct />
    },
    {
        name: 'detailProduct',
        path: '/list-products/detail-Product',
        component: <DetailProduct />
    },
    {
        name: 'detailProduct',
        path: '/list-products/:company',
        component: <ListProduct />
    },
    {
        name: 'listCartUser',
        path: '/list-cart',
        component: <Cart />
    },
    {
        name: 'history',
        path: '/history',
        component: <HistoryCart />
    },
    {
        name: 'news',
        path: '/best-laptop-news',
        component: <BestLaptopNews />
    },
    {
        name: 'page403',
        path: '/page-403',
        component: <Page403 />
    },
    {
        name: 'page404',
        path: '/page-404',
        component: <Page404 />
    },

]
export default ClientRoute
