import { NavLink } from "react-router-dom"

const ServiceViewCrad = ({ handlePreviousService, handleNextService, header, proposalid, selectedServiceData }) => {
  return (
    <>
        <div className="services-view-card">
            <div className="header">
                <div className="d-flex justify-content-between w-100">
                    {/* Previous Button */}
                    <button 
                        className={`btn-cs ${window.innerWidth > 767 ? '' : 'sm'}`} 
                        onClick={handlePreviousService}>
                        <i className="fa-sharp-duotone fa-light fa-angles-left" /> {header?.prev}
                    </button>

                    {
                        window.innerWidth >= 767 && (
                            <NavLink to={`/service-detail/${proposalid}`} className={`btn`}>
                                <i className="fa-regular fa-circle-plus" /> Add More Service
                            </NavLink>
                        )
                    }

                    {/* Next Button */}
                    <button 
                        className={`btn-cs ${window.innerWidth > 767 ? '' : 'sm'}`} 
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
                    {/* Show the 0th position image */}
                    <div>
                        {
                            selectedServiceData?.images?.length >= 1 ? (
                                <img className="cs-hieght" src={selectedServiceData.images[0].s3Url} alt="" />
                            ) : (
                                <img src="/assets/img/demo.svg" alt="" />
                            )
                        }
                    </div>
                    {/* Loop through remaining images (starting from index 1) */}
                    <div className="grid-cs gtc-equal">
                        {
                            selectedServiceData?.images?.length > 1 &&
                            selectedServiceData.images.slice(1).map((value, index) => (
                                <img key={index} src={value.s3Url} alt="" />
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default ServiceViewCrad