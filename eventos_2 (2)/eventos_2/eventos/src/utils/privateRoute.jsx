import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes() {
    const token = localStorage.getItem('token');
    
    if(token) {
        return <Outlet />
    }

    return <Navigate to='/' />
}

export default PrivateRoutes