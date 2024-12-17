import { NavLink } from "react-router-dom"

const ServiceViewCrad = ({ handlePreviousService, handleNextService, header, proposalid, selectedServiceData }) => {
  return (
    <>
        <div className="services-view-card">
            <div className="header">
                <div className="d-flex justify-content-between w-100">
                    {/* Previous Button */}
                    <button 
                        className={`btn ${window.innerWidth > 767 ? '' : 'btn-sm'}`} 
                        onClick={handlePreviousService}>
                        <i className="fa-sharp-duotone fa-light fa-angles-left" /> {header?.prev}
                    </button>

                    <NavLink to={`/service-detail/${proposalid}`} className={`btn ${window.innerWidth > 767 ? '' : 'btn-sm'}`}>
                        <i className="fa-regular fa-circle-plus" /> Add More Service
                    </NavLink>

                    {/* Next Button */}
                    <button 
                        className={`btn ${window.innerWidth > 767 ? '' : 'btn-sm'}`} 
                        onClick={handleNextService}>
                        {header?.next} <i className="fa-sharp-duotone fa-light fa-angles-right" />
                    </button>
                </div>
            </div>

            <div className="section-1">
                <h4 className="font-1 text-left fw-700 font-size-24">
                    {selectedServiceData?.name}
                </h4>
                <h6 className="font-1 font-size-16 fw-700">
                    {selectedServiceData?.type} - {selectedServiceData?.sqft} SQFT
                </h6>
            </div>

            <div className="gallery">
                <div className="grid-cs grid-equal">
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
    </>
  )
}

export default ServiceViewCrad