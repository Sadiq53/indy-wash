import Sidebar from '../components/shared/Sidebar/Sidebar'
import Header from '../components/shared/Header/Header'
import {Outlet, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { getCustomer } from '../services/CustomerService'
import { useDispatch } from 'react-redux'
import { handleGetAdmin, handleGetCustomer } from '../redux/AdminDataSlice'
import { getAdmin } from '../services/AdminService'
import { getServiceAndProposal } from '../services/ProposalService'
import { handleGetProposal, handleGetServices } from '../redux/ServiceDataSlice'

const AdminModule = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

const fetchCustomers = async() => {
  const response = await getCustomer()
  // console.log(response.result)
  dispatch(handleGetCustomer(response.result))
}

const fetchAdmin = async() => {
  const response = await getAdmin()
  dispatch(handleGetAdmin(response.result))
}

const fetchServiceAndProposal = async() => {
  const response = await getServiceAndProposal()
  dispatch(handleGetServices(response.service))
  dispatch(handleGetProposal(response.proposal))
}

useEffect(()=>{
  if(!localStorage.getItem('ddlj')) {
    navigate('/signin')
  }
}, [])

useEffect(()=>{
  fetchAdmin()
  fetchCustomers()
  fetchServiceAndProposal()
}, [])




  return (
    <>
        <main className="the-main-grid">
            <Sidebar />
            <section className='the-content-sec'>
                <Header />
                <Outlet />
            </section>
        </main>
    </>
  )
}

export default AdminModule