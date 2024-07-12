import AuthRoute from './AuthLayout'
import ClientRoute from './ClientRoute'
import AdminRoute from './AdminRoute'


const routes = [
    {
        layout: 'auth',
        views: [...AuthRoute],
    },
    {
        layout: 'admin',
        views: [...AdminRoute],
    },
    {
        layout: '/',
        views: [...ClientRoute],
    },
]

export default routes