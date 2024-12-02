import { NavLink } from "react-router-dom"
import ProposalTagCard from "./Helper/ProposalTagCard"

const ProposalDetail = () => {
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
                <div className="part-1 gtc-4">
                  <button className="filter-btn bg-theme-7-outline"><dic className="flex-cs"><input type="checkbox" className="cs-checkbox form-check-input mt-0" name="" id="" />&nbsp; Mark As Agreed</dic></button>
                  <button className="filter-btn bg-theme-7"><i class="fa-thin fa-lg fa-download" style={{ color: "#ffffff" }} /> &nbsp; Download Agreement</button>
                  <button className="filter-btn bg-theme-2"><i class="fa-regular fa-arrows-rotate-reverse fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Conrtact Overview</button>
                  <NavLink to='/proposal-detail'  className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Save Proposal</NavLink>
                </div>
              </div>

              <div className="pt-4">
                <div className="box-cs">
                  <div className="row">
                    <div className="col-md-8">
                      <ProposalTagCard />

                      <div className="pt-4">
                        <div className="services-view-card">
                          <div className="header">
                            <button className="btn"><i class="fa-sharp-duotone fa-light fa-angles-left" /> Leasing Office Sidewalks</button>
                            <button className="btn"><i class="fa-regular fa-circle-plus" /> Add More Service</button>
                            <button className="btn">Trash Room <i class="fa-light fa-angles-right" /></button>
                          </div>
                          <div className="section-1">
                            <h4 className="font-1 text-left fw-700 font-size-24">Current Service - L1/Retail parking Garage</h4>
                            <h6 className="font-1 font-size-16 fw-700">Commerical Concrete Cleaning - 275,542 SQFT</h6>
                          </div>
                          <div className="gallery">
                            <div className= "grid-cs grid-equal">
                              <div>
                                <img src="/assets/img/demo.svg" alt="" />
                              </div>
                              <div className="grid-cs gtc-equal">
                                <img src="/assets/img/demo.svg" alt="" />
                                <img src="/assets/img/demo.svg" alt="" />
                                <img src="/assets/img/demo.svg" alt="" />
                                <img src="/assets/img/demo.svg" alt="" />

                              </div>
                            </div>    
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="proposal-data">
                        <div><p>Date </p> :</div>
                        <div><p>Apartments </p> :</div>
                        <div><p>Company</p> :</div>
                        <div><p>Contact Name</p> :</div>
                        <div><p>Contact No</p> :</div>
                        <div><p>Property Address</p> :</div>
                      </div>
                      <div className="pt-4">
                        <div className="service-overview-card">
                          <div>
                            <h4>Service Overview</h4>
                          </div>
                          <div>
                            <p>Lorem Ipsum is simply dummy text of 
                              the printing and typesetting industry. 
                              Lorem Ipsum has been the industry's 
                              standard dummy text ever since the 
                              1500s</p>
                          </div>
                          <div className="grid-cs gtc-equal">
                            <div className="tab-cs">110,168 SQFT</div>
                            <div className="tab-cs">$6,610.08/Yr</div>
                          </div>
                        </div>  
                      </div>
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

export default ProposalDetail