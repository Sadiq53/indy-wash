import ActiveOverview from '../../components/feature/ActiveOverview/ActiveOverview'
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
import DownloadAgreement from '../../components/shared/Agreement/DownloadAgreement'

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
        path : 'add-customer/:customerid',
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
        path : 'active-overview',
        element : <ActiveOverview />
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
        path : 'add-service/:serviceid/:role',
        element : <AddService />
    },
    {
        path : 'services',
        element : <ServiceList />
    },
    {
        path : 'test',
        element : <DownloadAgreement />
    },
]

export default rootRoutes