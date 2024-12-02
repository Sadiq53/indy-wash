import { useState } from 'react';
import { NavLink } from 'react-router-dom'


const AddProposal = () => {

  const [image, setImage] = useState({image1: '', image2: ''});

    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage({...image, [type]: imageUrl});
        }
    };

  return (
    <>
        <section>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                      <div className="head-filters">
                          <div className="part-1">
                              <h4 className="font-1 fw-700">Add Proposal</h4>
                          </div>
                          <div className="part-1 gtc-equal">
                          <button className="filter-btn bg-theme-2"><i class="fa-regular fa-arrows-rotate-reverse fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Reset All Fields</button>
                          <NavLink to='/proposal-detail'  className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Save Proposal</NavLink>
                          </div>
                      </div>
                      <div className="box-cs mt-4">
                        <div className="row">
                          <div className="col-md-8">
                            
                            <div className="gtc-3 grid-cs">
                              <div>
                                <div className="header">
                                    <h5 className="font-1 fw-700 font-size-16">Select Date</h5>
                                </div>
                                <div className="input-section gtc-1 my-2">
                                    <input type="date"  name="" id="" />
                                </div>
                              </div>

                              <div>
                                <div className="header">
                                    <h5 className="font-1 fw-700 font-size-16">Select Customer</h5>
                                </div>
                                <div className="input-section gtc-1 my-2">
                                    <select  name="" id="">
                                      <option value="">Select Customer</option>
                                    </select>
                                </div>
                              </div>

                              <div>
                                <div className="header">
                                    <h5 className="font-1 fw-700 font-size-16">Select Property</h5>
                                </div>
                                <div className="input-section gtc-1 my-2">
                                    <select  name="" id="">
                                      <option value="">Select Property</option>
                                    </select>
                                </div>
                              </div>
                            </div>

                            <div className="grid-cs gtc-1 pt-3">
                              <div className="gtc-3 cs-align-end grid-cs">
                                <div>
                                  <div className="header">
                                    <h5 className="font-1 fw-700 font-size-16">Details :</h5>
                                  </div>
                                  <div className="input-section gtc-1 my-2">
                                    <select  name="" id="">
                                      <option value="">Service item</option>
                                    </select>
                                  </div>
                                </div>

                                <div>
                                  <div className="input-section gtc-1 my-2">
                                      <input type="text" placeholder='Type' name="" id="" />
                                  </div>
                                </div>

                                <div>
                                  <div className="input-section gtc-1 my-2">
                                      <input type="text" placeholder='Quantity' name="" id="" />
                                  </div>
                                </div>
                              </div>
                              <div className="grid-cs gtc-1-2">
                                <div className="input-section gtc-1 my-2">
                                  <input type="text" placeholder='SQFT' name="" id="" />
                                </div>
                                <div className="input-section gtc-1 my-2">
                                  <input type="text" placeholder='Description' name="" id="" />
                                </div>
                              </div>
                            </div>

                            <div className="pt-3">
                              <div className="grid-cs gtc-3 cs-align-end">
                                <div>
                                    <div className="header">
                                        <h5 className="font-1 fw-700 font-size-16">Additional info :</h5>
                                    </div>
                                    <div className="input-section mt-2 gtc-1">
                                        <div className="upload-box" onClick={()=>document.getElementById('file-upload1').click()}>
                                            {image.image1 ? (

                                                <img src={image.image1} alt="Uploaded" />
                                    
                                                ) : (
                                                <>
                                                    <img 
                                                    src="/assets/img/camera.svg"
                                                    alt="Camera Icon"
                                                    className="camera-icon"
                                                    />
                                                    <p>Upload Photos</p>
                                                </>
                                                )
                                            }
                                        </div>
                                        <input
                                            id="file-upload1"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e)=>{handleImageUpload(e, 'image1')}}
                                            className="file-input"
                                        />
                                    </div>
                                </div>
                                <div>
                                  <div className="input-section gtc-1">
                                    <div className="upload-box" onClick={()=>document.getElementById('file-upload2').click()}>
                                            {image.image2 ? (

                                                <img src={image.image2} alt="Uploaded" />
                                    
                                                ) : (
                                                <>
                                                    <img
                                                    src="/assets/img/camera.svg"
                                                    alt="Camera Icon"
                                                    className="camera-icon"
                                                    />
                                                    <p>Upload Blue Print</p>
                                                </>
                                                )
                                            }
                                        </div>
                                        <input
                                            id="file-upload2"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e)=>{handleImageUpload(e, 'image2')}}
                                            className="file-input"
                                        />
                                    </div>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div className="col-md-4">
                            <div className="frequency-layout">
                              <div className='content'>
                                <div className='gtc-3-1'>
                                  <div>
                                    <h4 className="font-1 font-size-16 fw-700">Frequency Options</h4>

                                  </div>
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
                                <div>
                                  <div className="property">
                                    <p>Bi-weekly</p>
                                  </div>
                                  <input type="text" placeholder='$' name="" id="" />
                                </div>
                              </div>
                            <button className="filter-btn bg-theme-2" >
                              <i className="fa-light fa-xl fa-circle-plus" style={{ color: "#ffffff" }} /> &nbsp; Add More Property
                            </button>
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

export default AddProposal