import { NavLink } from "react-router-dom"

const AddService = () => {
  return (
    <>
        <section>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="head-filters">
                            <div className="part-1">
                                <h4 className="font-1 fw-700">Create Custom Services</h4>
                            </div>
                            <div className="part-1 gtc-equal mob">
                                <button className="filter-btn bg-theme-2"><i class="fa-regular fa-arrows-rotate-reverse fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Reset All Fields</button>
                                <NavLink to='/proposal-detail'  className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Save Service</NavLink>
                            </div>
                        </div>


                        <div className="pt-4">
                            <div className="box-cs min-height-600">
                                <div className="gtc-equal cs-align-end grid-cs">
                                    <div className="grid-cs cs-align-end gtc-equal">
                                        <div>
                                            <div className="header">
                                                <h5 className="font-1 fw-700 font-size-16">Details :</h5>
                                            </div>
                                            <div className="input-section gtc-1 my-2">
                                                <input type="text" placeholder='Name' name="" id="" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="input-section gtc-1 my-2">
                                                <input type="text" placeholder='Type' name="" id="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-section gtc-1 my-2">
                                            <input type="text" placeholder='Service  Overview' name="" id="" />
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className="pt-4">
                                    <div className="service-add-layout">
                                        <div className="frequency-layout bg-white">
                                            <div className='content'>
                                                <div className='gtc-3-1 width-100'>
                                                    <h4 className="font-1 font-size-16 fw-700">Frequency Options</h4>
                                                    <h4 className="font-1 font-size-16 fw-700">Price</h4>
                                                </div>
                                                <div>
                                                    <div className="property">
                                                        <p>One-Off</p>
                                                    </div>
                                                    <input type="text" placeholder='$' name="" id="" />
                                                </div>
                                                <div>
                                                    <div className="property">
                                                        <p>Annual</p>
                                                    </div>
                                                    <input type="text" placeholder='$' name="" id="" />
                                                </div>
                                                    <div>
                                                    <div className="property">
                                                        <p>Bi-Annual</p>
                                                    </div>
                                                    <input type="text" placeholder='$' name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="frequency-layout bg-white">
                                            <div className='content'>
                                                <div className='gtc-3-1 width-100'>
                                                    <h4 className="font-1 font-size-16 fw-700">Frequency Options</h4>
                                                    <h4 className="font-1 font-size-16 fw-700">Price</h4>
                                                </div>
                                                <div>
                                                <div className="property">
                                                    <p>Quarterly</p>
                                                </div>
                                                <input type="text" placeholder='$' name="" id="" />
                                                </div>
                                                <div>
                                                <div className="property">
                                                    <p>Bi-Quarterly</p>
                                                </div>
                                                <input type="text" placeholder='$' name="" id="" />
                                                </div>
                                                <div>
                                                <div className="property">
                                                    <p>Monthly</p>
                                                </div>
                                                <input type="text" placeholder='$' name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="frequency-layout bg-white">
                                            <div className='content'>
                                                <div className='gtc-3-1 width-100'>
                                                    <h4 className="font-1 font-size-16 fw-700">Frequency Options</h4>
                                                    <h4 className="font-1 font-size-16 fw-700">Price</h4>
                                                </div>
                                                <div>
                                                    <div className="property">
                                                        <p>Bi-weekly</p>
                                                    </div>
                                                    <input type="text" placeholder='$' name="" id="" />
                                                </div>
                                                <div>
                                                    <div className="property">
                                                        <p>Bi-Annual</p>
                                                    </div>
                                                    <input type="text" placeholder='$' name="" id="" />
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

export default AddService