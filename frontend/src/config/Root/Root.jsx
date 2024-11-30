import AddCustomer from '../../components/feature/Customer/AddCustomer'
import CustomerDetail from '../../components/feature/Customer/CustomerDetail'
import CustomerList from '../../components/feature/Customer/CustomerList'
import Dashboard from'../../components/feature/Dashboard/Dashboard'

const rootRoutes = [
    {
        path : '',
        element : <Dashboard />
    },
    {
        path : 'customer-list',
        element : <CustomerList />
    },
    {
        path : 'add-customer',
        element : <AddCustomer />
    },
    {
        path : 'customer-detail',
        element : <CustomerDetail />
    },
]

export default rootRoutes