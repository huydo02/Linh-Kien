import Category from '../assets/components/admin/Category/Category';
import Dashboard from '../assets/components/admin/Dashboard';
import Products from '../assets/components/admin/Products/Product';
import ShowCategory from '../assets/components/admin/Category/ShowCategory';
import ShowProducts from '../assets/components/admin/Products/ShowProducts';

import MasterLayout from '../assets/layouts/admin/MasterLayout';
import EditCategory from '../assets/components/admin/Category/EditCategory';
import DeleteCategory from '../assets/components/admin/Category/DeleteCategory';
import ViewEditProduct from '../assets/components/admin/Products/ViewEditProduct';
import AdminAccept from '../assets/components/admin/AdminAccept';


const AdminRoute = [
    {
        name: 'dashboard',
        path: 'dashboard',
        component: <Dashboard />
    },
    {
        name: 'admin',
        path: '/',
        component: <AdminAccept />
    },
    {
        name: 'category',
        path: 'category',
        component: <Category />
    },
    {
        name: 'addProduct',
        path: 'add-product',
        component: <Products />
    },
    {
        name: 'showCategory',
        path: 'list-category',
        component: <ShowCategory />
    },
    {
        name: 'editCategory',
        path: `list-category/edit-category/:id`,
        component: <EditCategory />
    },
    // {
    //     name: 'deleteProduct',
    //     path: `list-category/delete-category/:id`,
    //     component: <DeleteCategory />
    // },
    {
        name: 'showProduct',
        path: 'list-products',
        component: <ShowProducts />
    },
    {
        name: 'vỉewEditProduct',
        path: 'list-products/view-edit-products/:id',
        component: <ViewEditProduct />
    },


]
export default AdminRoute
