import AddCustomer from '../../components/feature/Customer/AddCustomer'
import CustomerDetail from '../../components/feature/Customer/CustomerDetail'
import CustomerList from '../../components/feature/Customer/CustomerList'
import Dashboard from'../../components/feature/Dashboard/Dashboard'
import AddProposal from '../../components/feature/Proposal/AddProposal'
import Proposal from '../../components/feature/Proposal/Proposal'
import ProposalDetail from '../../components/feature/Proposal/ProposalDetail'
import AddService from '../../components/feature/Service/AddService'
import ServiceDetail from '../../components/feature/Service/ServiceDetail'
import ServiceList from '../../components/feature/Service/ServiceList'

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
        path : 'customer-detail/:id',
        element : <CustomerDetail />
    },
    {
        path : 'proposal',
        element : <Proposal />
    },
    {
        path : 'add-proposal',
        element : <AddProposal />
    },
    {
        path : 'add-proposal/:customerId/:propertyId',
        element : <AddProposal />
    },
    {
        path : 'proposal-detail/:proposalid',
        element : <ProposalDetail />
    },
    {
        path : 'service-detail/:proposalid',
        element : <ServiceDetail />
    },
    {
        path : 'add-service',
        element : <AddService />
    },
    {
        path : 'services',
        element : <ServiceList />
    },
]

export default rootRoutes