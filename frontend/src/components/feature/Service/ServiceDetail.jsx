import { NavLink, useNavigate, useParams } from "react-router-dom"
import ServiceTagCard from "./Helper/ServiceTagCard"
import { useEffect, useState } from "react";
import ServiceAccordian from "./Helper/ServiceAccordian";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../utils/formatDate";
import AddServiceModal from './Helper/AddServiceModal'
import { updateServices } from "../../../services/ServicesService";
import { handleUpdateServices } from "../../../redux/ServiceDataSlice";
import DeleteServiceModal from "./Helper/DeleteServiceModal";

const ServiceDetail = () => {

    const param = useParams();
    const { proposalid } = param;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const rawServiceData = useSelector(state => state.ServiceDataSlice.services)
    const rawProposalData = useSelector(state => state.ServiceDataSlice.proposal)
    const rawCustomerData = useSelector(state => state.AdminDataSlice.customers);

    const [serviceData, setServiceData] = useState({})
    const [proposalData, setProposalData] = useState({})
    const [customerData, setCustomerData] = useState({})
    const [propertyData, setPropertyData] = useState({})
    const [updatedData, setUpdatedData] = useState([])
    const [deleteServiceId, setDeleteServiceId] = useState([])


    useEffect(()=>{
        if(rawServiceData && rawProposalData) {
            const filteredProposal = rawProposalData?.find(value => value.uniqueid === proposalid)
            const allServices = filteredProposal?.service;
            const filteredServices = rawServiceData?.filter(service => allServices?.includes(service?.uniqueid));
            const filteredCustomer = rawCustomerData?.find(value => value.uniqueid === filteredProposal?.customer)
            setPropertyData(filteredCustomer?.property?.find(value => value.uniqueid === filteredProposal?.property))
            setServiceData(filteredServices)
            setCustomerData(filteredCustomer)
            setProposalData(filteredProposal)
        }
    }, [rawServiceData, rawProposalData, rawCustomerData])

    function convertObjectToArray(inputObject) {
        return Object.values(inputObject);
    }


    const getServiceData = (data) => {
        const resultArray = convertObjectToArray(data);
        // console.log(resultArray) 
        setUpdatedData(resultArray)
    }

    const submitUpdatedServices = async() => {
        const response = await updateServices(updatedData)
        if(response.success) {
            dispatch(handleUpdateServices(updatedData))
            navigate(`/proposal-detail/${proposalid}`)
        }
    }

    const getServiceid = (id) => {
        setDeleteServiceId(id)
    }

    // useEffect(()=>{
    //     console.log(serviceData)
    //     console.log(customerData)
    //     console.log(proposalData)
    //     console.log(propertyData)
    // }, [serviceData, customerData, proposalData])

return (
    <>
        <section>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="head-filters">
                            <div className="part-1">
                                <h4 className="font-1 fw-700">{propertyData?.propertyName}</h4>
                            </div>
                            <div className="part-1 gtc-equal">
                            <button className="filter-btn bg-theme-7"><i class="fa-thin fa-lg fa-download" style={{ color: "#ffffff" }} /> &nbsp; Download Agreement</button>
                            <button onClick={submitUpdatedServices} className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Save Proposal</button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="box-cs">
                                <div className="grid-cs gtc-3">
                                    <div className="proposal-data">
                                        <div><p>Apartments </p> : <span>{propertyData?.units} Units</span></div>
                                        <div><p>Company</p> : <span>{propertyData?.propertyName || "N/A"}</span></div>
                                    </div>
                                    <div className="proposal-data">
                                        <div><p>Contact Name</p> : <span>{customerData?.personalDetails?.firstName}</span></div>
                                        <div><p>Property Address</p> : <span>{propertyData?.billingAddress || "N/A"}</span></div>
                                    </div>
                                    <div className="proposal-data">
                                        <div><p>Date </p> : <span>{formatDate(proposalData?.createDate)}</span></div>
                                        <div><p>Contact No</p> : <span>{customerData?.personalDetails?.phone}</span></div>
                                    </div>
                                </div>
                                

                                <div className="pt-5 accordian-scroll">
                                    <div className="head-filters">
                                        <div className="part-1">
                                            <h4 className="font-1 fw-700">Services Details</h4>
                                        </div>
                                    </div>
                                    <div className="pt-2 ">
                                        {
                                            propertyData && serviceData?.length >= 1 && (
                                                <ServiceAccordian onChangeData={getServiceData} getServiceid={getServiceid} property={propertyData} service={serviceData} />
                                            )
                                        }
                                        <div className="flex-cs cs-justify-end">
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="filter-btn bg-theme-1"><i class="fa-light fa-lg fa-circle-plus" style={{ color: "#ffffff" }} /> Add Service</button>
                                        </div>
                                    </div>
                                </div>


                                <div className="pt-4">
                                    <ServiceTagCard property={propertyData} service={updatedData} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <DeleteServiceModal proposalid={proposalid} serviceid={deleteServiceId} />
        <AddServiceModal proposalId={proposalid} customerId={proposalData?.customer} propertyId={proposalData?.property} />
    </>
)
}

export default ServiceDetail