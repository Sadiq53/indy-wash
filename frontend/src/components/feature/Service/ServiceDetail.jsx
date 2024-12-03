import { NavLink } from "react-router-dom"
import ServiceTagCard from "./Helper/ServiceTagCard"
import { useState } from "react";
import ServiceAccordian from "./Helper/ServiceAccordian";

const ServiceDetail = () => {

   

  return (
    <>
        <section>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="head-filters">
                            <div className="part-1">
                                <h4 className="font-1 fw-700">Company Name</h4>
                            </div>
                            <div className="part-1 gtc-equal">
                            <button className="filter-btn bg-theme-7"><i class="fa-thin fa-lg fa-download" style={{ color: "#ffffff" }} /> &nbsp; Download Agreement</button>
                            <NavLink to='/proposal-detail'  className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Save Proposal</NavLink>
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="box-cs">
                                <div className="grid-cs gtc-3">
                                    <div className="proposal-data">
                                        <div><p>Apartments </p> : <span>245 Units</span></div>
                                        <div><p>Company</p> : <span>Management Company</span></div>
                                    </div>
                                    <div className="proposal-data">
                                        <div><p>Contact Name</p> : <span>Addy Design</span></div>
                                        <div><p>Property Address</p> : <span>Address Goes Here</span></div>
                                    </div>
                                    <div className="proposal-data">
                                        <div><p>Date </p> : <span>12 Nov 2024</span></div>
                                        <div><p>Contact No</p> : <span>777-555-0000</span></div>
                                    </div>
                                </div>
                                

                                <div className="pt-5 accordian-scroll">
                                    <div className="head-filters">
                                        <div className="part-1">
                                            <h4 className="font-1 fw-700">Services Details</h4>
                                        </div>
                                    </div>
                                    <div className="pt-2 ">
                                    <ServiceAccordian />
                                    </div>
                                </div>


                                <div className="pt-4">
                                    <ServiceTagCard />
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

export default ServiceDetail