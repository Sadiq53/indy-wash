import ProposalCard from "./Helper/ProposalCard"
import CustomerDetailRepeater from './Helper/CompanyDetailRepeater'
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useEffect } from "react"

const CustomerDetail = () => {

    const customerDetail = useSelector(state => state.AdminDataSlice.addingCustomerDetail)
    const { createDate, customerType, contactMethod, personalDetails, companyDetails, additionalContactInfo, additionalInfo, additionalNotes } = customerDetail

    useEffect(()=>{
        console.log(customerDetail)
    }, [customerDetail])

  return (
    <>
        <section>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="head-filters">
                            <div className="part-1 gtc-1">
                                <h4 className="font-1 fw-700">Company Name</h4>
                            </div>
                            <div className="part-1  gtc-1">
                                <NavLink to='/add-proposal' className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-lg fa-circle-plus" style={{ color: "#ffffff" }} /> &nbsp; Create Proposal</NavLink>
                            </div>
                        </div> 

                        <div className="pt-4">
                            <div className="box-cs">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="content-layout">
                                            <div className="head-filters mob">
                                                <div className="part-1 gtc-1">
                                                    <h4 className="font-1 fw-700">Personal Details</h4>
                                                </div>
                                                <div className="part-1  gtc-1">
                                                    <button className="btn edit-btn"><i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} /></button>
                                                </div>
                                            </div> 

                                            <div className="data py-4">
                                                <div><p className="font-3">Full Name</p> : <p className="font-3">{personalDetails?.firstName}</p></div>
                                                <div><p className="font-3">Phone No.</p> : <p className="font-3">{personalDetails?.phone}</p></div>
                                                <div><p className="font-3">Email Address</p> : <p className="font-3">{personalDetails?.email}</p></div>
                                            </div>
                                        </div>

                                        <div className="content-layout mt-4">
                                            <div className="head-filters mob">
                                                <div className="part-1 gtc-1">
                                                    <h4 className="font-1 fw-700">Additional Contact info :</h4>
                                                </div>
                                                <div className="part-1  gtc-1">
                                                    <button className="btn edit-btn"><i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} /></button>
                                                </div>
                                            </div> 

                                            <div className="data cs-border-bottom py-4">
                                                <div><p className="font-3">{additionalContactInfo?.detail1?.fullname}</p></div>
                                                <div><p className="font-3">{additionalContactInfo?.detail1?.phone}</p></div>
                                                <div><p className="font-3">{additionalContactInfo?.detail1?.email}</p></div>
                                            </div>

                                            <div className="data py-4">
                                                <div><p className="font-3">{additionalContactInfo?.detail2?.fullname}</p></div>
                                                <div><p className="font-3">{additionalContactInfo?.detail2?.phone}</p></div>
                                                <div><p className="font-3">{additionalContactInfo?.detail2?.email}</p></div>
                                            </div>

                                            <div className="head-filters mob pt-4">
                                                <div className="part-1 gtc-1">
                                                    <h4 className="font-1 fw-700">Preferred Contact Method :</h4> 
                                                    {
                                                        contactMethod?.map(value => (
                                                            <p className="font-3" key={value += 1}>{value}</p>
                                                        ))
                                                    }
                                                </div>
                                            </div> 
                                        </div>

                                        <div className="content-layout mt-4">
                                            <div className="head-filters mob">
                                                <div className="part-1 gtc-1">
                                                    <h4 className="font-1 fw-700">Images/blueprint Uploaded</h4>
                                                </div>
                                            </div> 

                                            <div className="data py-4">
                                                <div>
                                                    <img src={additionalInfo?.image1} alt="" />
                                                    <img src={additionalInfo?.image2} alt="" />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="content-layout mt-4">
                                            <div className="head-filters mob">
                                                <div className="part-1 gtc-1">
                                                    <h4 className="font-1 fw-700">Additional Notes</h4>
                                                </div>
                                            </div> 

                                            <div className="data py-4">
                                                <div><p className="font-3">Comment here</p></div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-md-5 ">
                                        {/* <div className="content-layout">
                                            <div className="head-filters mob">
                                                <div className="part-1 gtc-1">
                                                    <h4 className="font-1 fw-700">Address, Property Type  & Feature</h4>
                                                </div>
                                                <div className="part-1  gtc-1">
                                                    <button className="btn edit-btn"><i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} /></button>
                                                </div>
                                            </div> 

                                            <div className="data cs-border-bottom py-4">
                                                <div><p className="font-3">Property Manager</p></div>
                                                <div><p className="font-3">Property Name</p></div>
                                                <div><p className="font-3">Service Address</p></div>
                                                <div><p className="font-3">Breezeways  |  Breezeways  |  Breezeways</p></div>
                                            </div>

                                            <div className="data py-4">
                                                <div><p className="font-3">Property Manager</p></div>
                                                <div><p className="font-3">Property Name</p></div>
                                                <div><p className="font-3">Service Address</p></div>
                                                <div><p className="font-3">Breezeways  |  Breezeways  |  Breezeways</p></div>
                                            </div>

                                        </div> */}

                                        <CustomerDetailRepeater data={companyDetails} />

                                    </div>

                                    <div className="col-md-6 pt-5">
                                        <ProposalCard />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default CustomerDetail