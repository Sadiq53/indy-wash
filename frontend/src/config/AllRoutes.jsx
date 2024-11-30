import { useRoutes } from "react-router-dom"
import AdminModule from "../modules/AdminModule"
import rootRoutes from "./Root/Root"


const AllRoutes = () => {
    const userRoutes = useRoutes([
        {
            path : '/',
            element : <AdminModule />,
            children : rootRoutes
        },
        // {
        //     path : '*',
        //     element : <Error404 />
        // },
    ])

    return userRoutes
}

export default AllRoutes