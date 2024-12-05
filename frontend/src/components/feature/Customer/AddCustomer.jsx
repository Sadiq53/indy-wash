import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiSelector from "./Helper/MultiSelector";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { handleAddCustomerDetail } from "../../../redux/AdminDataSlice";

const AddCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState({ image1: "", image2: "" });
  const [createDate, setCreateDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

    const addCustomerForm = useFormik({
        initialValues: {
        createDate,
        customerType: "",
        contactMethod: [],
        personalDetails: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        companyDetails: [],
        additionalContactInfo: {
            detail1: {
            fullname: "",
            title: "",
            email: "",
            phone: "",
            },
            detail2: {
            fullname: "",
            title: "",
            email: "",
            phone: "",
            },
        },
        additionalInfo: image,
        additionalNotes: "",
        },
        // validationSchema: Yup.object({
        //   personalDetails: Yup.object({
        //     firstName: Yup.string().required("First Name is required"),
        //     lastName: Yup.string().required("Last Name is required"),
        //     email: Yup.string()
        //       .email("Invalid email address")
        //       .required("Email is required"),
        //     phone: Yup.number()
        //       .typeError("Phone must be a number")
        //       .required("Phone is required"),
        //   }),
        //   additionalContactInfo: Yup.object({
        //     detail1: Yup.object({
        //       fullname: Yup.string().required("Full Name is required"),
        //       email: Yup.string()
        //         .email("Invalid email address")
        //         .required("Email is required"),
        //       phone: Yup.number()
        //         .typeError("Phone must be a number")
        //         .required("Phone is required"),
        //     }),
        //   }),
        // }),
        onSubmit: async (formData) => {
            // console.log(formData);
            dispatch(handleAddCustomerDetail(formData))
            navigate("/customer-detail");
        },
    });

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({ ...image, [type]: imageUrl });
      addCustomerForm.setFieldValue(`additionalInfo.${type}`, imageUrl);
    }
  };

  const handleMultiSelectorChange = (companyInfo) => {
    addCustomerForm.setFieldValue("companyDetails", companyInfo);
    console.log(companyInfo)
  };

  return (
    <>
      <section>
        <div className="container py-4">
          <div className="row">
            <form onSubmit={addCustomerForm.handleSubmit}>
              <div className="col-md-12">
                <div className="head-filters">
                  <div className="part-1">
                    <h4 className="font-1 fw-700">Add New Customer</h4>
                  </div>
                  <div className="part-1 gtc-equal mob">
                    <button
                      type="button"
                      className="filter-btn bg-theme-2"
                      onClick={() => addCustomerForm.resetForm()}
                    >
                      <i
                        className="fa-regular fa-arrows-rotate-reverse fa-lg"
                        style={{ color: "#ffffff" }}
                      />{" "}
                      &nbsp; Reset All Fields
                    </button>
                    <button
                      type="submit"
                      className="filter-btn txt-deco-none bg-theme-1"
                    >
                      <i
                        className="fa-light fa-circle-check fa-lg"
                        style={{ color: "#ffffff" }}
                      />{" "}
                      &nbsp; Save Customer
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="box-cs">
                    <div className="top-cs">
                      <div>
                        <div className="header">
                          <h5 className="font-1 fw-700 font-size-16">
                            Select Date :
                          </h5>
                        </div>
                        <div className="input-section gtc-1 my-2">
                          <input
                            type="date"
                            value={addCustomerForm.values.createDate}
                            onChange={(e) =>
                              addCustomerForm.setFieldValue(
                                "createDate",
                                e.target.value
                              )
                            }
                            placeholder="Select Date"
                            id="date-input"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="header">
                          <h5 className="font-1 fw-700 font-size-16">
                            Customer Type :
                          </h5>
                        </div>
                        <div className="input-section gtc-3 my-2">
                          {["commercial", "multifamily", "residential"].map(
                            (type) => (
                              <div
                                key={type}
                                className={`checkbox-item ${
                                  addCustomerForm.values.customerType === type
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  addCustomerForm.setFieldValue(
                                    "customerType",
                                    type
                                  )
                                }
                              >
                                {addCustomerForm.values.customerType ===
                                  type && (
                                  <i
                                    className="fa-light fa-circle-check fa-lg"
                                    style={{ color: "#ffffff" }}
                                  />
                                )}
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="header">
                          <h5 className="font-1 fw-700 font-size-16">
                            Preferred Contact Method :
                          </h5>
                        </div>
                        <div className="input-section gtc-3 mob my-2">
                          {["Call", "Email", "Text"].map((method) => (
                            <div className="flex-cs" key={method}>
                              <input
                                className="form-check-input mt-0"
                                type="checkbox"
                                value={method}
                                checked={addCustomerForm.values.contactMethod.includes(
                                  method
                                )}
                                onChange={(e) => {
                                  const newMethods =
                                    e.target.checked
                                      ? [
                                          ...addCustomerForm.values
                                            .contactMethod,
                                          method,
                                        ]
                                      : addCustomerForm.values.contactMethod.filter(
                                          (m) => m !== method
                                        );
                                  addCustomerForm.setFieldValue(
                                    "contactMethod",
                                    newMethods
                                  );
                                }}
                              />
                              <label>{method}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="header pt-3">
                      <h5 className="font-1 fw-700 font-size-16">
                        Personal Details :
                      </h5>
                    </div>
                    <div className="input-section my-2">
                      {["firstName", "lastName", "email", "phone"].map(
                        (field) => (
                          <input
                            key={field}
                            type={field === "phone" ? "number" : "text"}
                            placeholder={field
                              .split(/(?=[A-Z])/)
                              .join(" ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                            value={addCustomerForm.values.personalDetails[field]}
                            onChange={(e) =>
                              addCustomerForm.setFieldValue(
                                `personalDetails.${field}`,
                                e.target.value
                              )
                            }
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                    <MultiSelector
                        onDataChange={handleMultiSelectorChange}
                    />
                </div>

                <div className="pt-4">
                    <div className="box-cs">
                        <div>
                        <div className="header">
                            <h5 className="font-1 fw-700 font-size-16">
                            Additional Contact info :
                            </h5>
                        </div>
                        <div className="input-section my-2">
                            {["detail1", "detail2"].map((detailKey) =>
                            ["fullname", "title", "email", "phone"].map(
                                (field) => (
                                <input
                                    key={`${detailKey}-${field}`}
                                    type={
                                    field === "phone" ? "number" : field === "email" ? "email" : "text"
                                    }
                                    placeholder={field
                                    .split(/(?=[A-Z])/)
                                    .join(" ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                                    value={
                                    addCustomerForm.values.additionalContactInfo[
                                        detailKey
                                    ][field]
                                    }
                                    onChange={(e) =>
                                    addCustomerForm.setFieldValue(
                                        `additionalContactInfo.${detailKey}.${field}`,
                                        e.target.value
                                    )
                                    }
                                />
                                )
                            )
                            )}
                        </div>
                        </div>
                        <div className="top-cs pt-3 gtc-equal">
                            <div className="grid-cs cs-align-end">
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
                                    <h5 className="font-1 fw-700 font-size-16">Additional Notes :</h5>
                                    
                                </div>
                                <div className="input-section gtc-1">
                                    <textarea name="additionalNotes" onChange={(e) => {addCustomerForm.setFieldValue("additionalNotes", e.target.value)}} rows={4} placeholder="Note" id=""></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCustomer;
