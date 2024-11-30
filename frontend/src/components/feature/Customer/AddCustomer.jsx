import { useState } from "react";
import { NavLink } from "react-router-dom"
import MultiSelector from "./Helper/MultiSelector";

const AddCustomer = () => {

    const [selected, setSelected] = useState({customerType: '', propertyType: [], propertyFeatures: []});
    const [image, setImage] = useState({image1: '', image2: ''});

    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage({...image, [type]: imageUrl});
        }
    };

    const setSelection = (type, name) => {
        if (type === "customerType") {
            // Single-select for customerType
            setSelected({ ...selected, [type]: name });
        } else {
        // Multi-select for other fields
        if (selected[type].includes(name)) {
            setSelected({
            ...selected,
            [type]: selected[type].filter((item) => item !== name),
            });
        } else {
            setSelected({
            ...selected,
            [type]: [...selected[type], name],
            });
        }
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
                                <h4 className="font-1 fw-700">Add New Customer</h4>
                            </div>
                            <div className="part-1 gtc-equal">
                            <button className="filter-btn bg-theme-2"><i class="fa-regular fa-arrows-rotate-reverse fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Reset All Fields</button>
                            <NavLink to='/customer-detail'  className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Save Customer</NavLink>
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="box-cs">
                                <div className="top-cs">
                                    <div>
                                        <div className="header">
                                            <h5 className="font-1 fw-700 font-size-16">Select Date :</h5>
                                        </div>
                                        <div className="input-section gtc-1 my-2">
                                            <input type="date" placeholder="First Name" name="" id="" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="header">
                                            <h5 className="font-1 fw-700 font-size-16">Customer Type :</h5>
                                        </div>
                                        <div className="input-section gtc-3 my-2">
                                            <div
                                                className={`checkbox-item ${selected.customerType === "commercial" ? "active" : ""}`}
                                                onClick={() => setSelection("customerType", "commercial")}
                                            >
                                                {selected.customerType === "commercial" && (
                                                <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                                                )}
                                                Commercial
                                            </div>

                                            <div
                                                className={`checkbox-item ${selected.customerType === "multifamily" ? "active" : ""}`}
                                                onClick={() => setSelection("customerType", "multifamily")}
                                            >
                                                {selected.customerType === "multifamily" && (
                                                <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                                                )}
                                                Multifamily
                                            </div>

                                            <div
                                                className={`checkbox-item ${selected.customerType === "residential" ? "active" : ""}`}
                                                onClick={() => setSelection("customerType", "residential")}
                                            >
                                                {selected.customerType === "residential" && (
                                                <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                                                )}
                                                Residential
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="header">
                                            <h5 className="font-1 fw-700 font-size-16">Preferred Contact Method :</h5>
                                        </div>
                                        <div className="input-section gtc-3 my-2">
                                            <div className="flex-cs">
                                                <input className="form-check-input mt-0" type="checkbox" name="" id="" />
                                                <label htmlFor="">Call</label>
                                            </div>
                                            <div className="flex-cs">
                                                <input className="form-check-input mt-0" type="checkbox" name="" id="" />
                                                <label htmlFor="">Email</label>
                                            </div>
                                            <div className="flex-cs">
                                                <input className="form-check-input mt-0" type="checkbox" name="" id="" />
                                                <label htmlFor="">Text</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="header pt-3">
                                    <h5 className="font-1 fw-700 font-size-16">Personal Details :</h5>
                                </div>
                                <div className="input-section my-2">
                                    <input type="text" placeholder="First Name" name="" id="" />
                                    <input type="text" placeholder="Last Name" name="" id="" />
                                    <input type="email" placeholder="Email Address" name="" id="" />
                                    <input type="number" placeholder="Phone No." name="" id="" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <MultiSelector />
                        </div>

                        <div className="pt-4">
                            <div className="box-cs">
                                <div>
                                    <div className="header">
                                        <h5 className="font-1 fw-700 font-size-16">Additional Contact info :</h5>
                                    </div>
                                    <div className="input-section  my-2">
                                        <input type="text" placeholder="Full Name" name="" id="" />
                                        <input type="text" placeholder="Title" name="" id="" />
                                        <input type="email" placeholder="Email Address" name="" id="" />
                                        <input type="number" placeholder="Phone No." name="" id="" />
                                        <input type="text" placeholder="Full Name" name="" id="" />
                                        <input type="text" placeholder="Title" name="" id="" />
                                        <input type="email" placeholder="Email Address" name="" id="" />
                                        <input type="number" placeholder="Phone No." name="" id="" />
                                    </div>
                                </div>
                                <div className="top-cs pt-3 gtc-equal">
                                    <div className="grid-cs align-items-end">
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
                                    <div className="grid-cs gtc-1">
                                        <div className="header">
                                            <h5 className="font-1 fw-700 font-size-16">Additional info :</h5>
                                            
                                        </div>
                                        <div className="input-section gtc-1">
                                            <textarea name="" rows={4} placeholder="Note" id=""></textarea>
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

export default AddCustomer