import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generateUniqueId } from '../../../utils/UniqueIdGenerator';
import { addProposal } from '../../../services/ProposalService';
import { handleAddProposal, handleAddServices } from '../../../redux/ServiceDataSlice';
import { handleUpdateCustomerProperty } from '../../../redux/AdminDataSlice';
import { frequencyDigitConverter } from '../../../utils/frequencyDigitConverter'
import Spinner from '../../shared/Loader/Spinner';
import { toast } from 'react-toastify';
import { validationSchema } from '../../../schemas/addProposalSchema'

const AddProposal = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const param = useParams()
  const {customerId, propertyId} = param
  
  const customerData = useSelector(state => state.AdminDataSlice.customers)
  const adminData = useSelector(state => state.AdminDataSlice.admin)
  const rawProposalData = useSelector(state => state.ServiceDataSlice.proposal)
  
  const [displayData, setDisplayData] = useState({customer: {}, property: {}})
  const [isParam, setIsParam] = useState(false)
  const [services, setServices] = useState([])
  const [image, setImage] = useState({image1: '', image2: ''});
  const [propertyData, setPropertyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [createDate, setCreateDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  const [initialValues, setInitialValues] = useState({
    createDate,
    uniqueid: generateUniqueId(),
    customer: '',
    property: '',
    serviceItem: '',
    serviceUniqueid: generateUniqueId(),
    type: '',
    quantity: '',
    sqft: '',
    description: '',
    additionalInfo: image,
    frequency: [],
    status: 'draft'  
  })
  const [frequencies, setFrequencies] = useState([
    {
      name: 'one-off',
      price: 0
    },
    {
      name: 'annual',
      price: 0
    },
    {
      name: 'bi-annual',
      price: 0
    },
    {
      name: 'bi-quarterly',
      price: 0
    },
    {
      name: 'monthly',
      price: 0
    },
    {
      name: 'bi-weekly',
      price: 0
    },
    {
      name: 'quarterly',
      price: 0
    }
  ])



  const proposalForm = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async(formData) => {
      const response = await addProposal(formData)
      setLoading(true)
      if(response?.success) {
        const {proposal, service} = response;
        dispatch(handleAddProposal(proposal))
        dispatch(handleAddServices(service))
        const dataObject = {
          serviceid: service?.uniqueid,
          proposalid: proposal?.uniqueid,
          propertyid: proposal?.property,
          customerid: proposal?.customer
        }
        setLoading(false)
        dispatch(handleUpdateCustomerProperty(dataObject))
        toast.success('Proposal Added Successfully!')
        navigate(`/proposal-detail/${proposal?.uniqueid}`)
      }
    }
  })

  const handleFrequencyChange = (name, value) => {
    const updatedFrequencies = frequencies.map((freq) =>
      freq.name === name ? { ...freq, price: parseFloat(value) || 0, frequencyDigit: frequencyDigitConverter[name] } : freq
    );
  // console.log(updatedFrequencies)
    // Filter frequencies where price is greater than 0
    const validFrequencies = updatedFrequencies.filter((freq) => freq.price > 0);
  
    // Update the form field with valid frequencies only
    proposalForm.setFieldValue("frequency", validFrequencies);
  
    // Update the state with all frequencies
    setFrequencies(updatedFrequencies);
  };
  
  // useEffect(()=>{
  //   if(customerId && propertyId && type) {
  //     if(type === 'edit') {
  //       setIsParam(true)
  //       const customer = customerData.find((value) => value.uniqueid === customerId);
  //       const property = customer?.property?.find((value) => value.uniqueid === propertyId);
  //       const proposalId = property?.proposal[0]
  //       const proposal = rawProposalData?.find((value) => value.uniqueid === proposalId);
  //       console.log(proposal)
  //       setDisplayData({customer, property});
        
  //     } else {
  //       setIsParam(true)
  //       const customer = customerData.find((value) => value.uniqueid === customerId);
  //       const property = customer?.property?.find((value) => value.uniqueid === propertyId);
  //       setDisplayData({customer, property});
  //       proposalForm.setFieldValue('customer', customer?.uniqueid)
  //       proposalForm.setFieldValue('property', property?.uniqueid)
  //       setInitialValues((prev) => ({
  //         ...prev,
  //         customer: customer?.personalDetails?.firstName || "",
  //         property: property?.name || "",
  //       }));
  //     }
  //   }
  // }, [type, customerId, propertyId, customerData, rawProposalData])


  useEffect(()=>{
    if(adminData) {
      setServices(adminData?.customServices)
    }
  }, [adminData])
  
  useEffect(() => {
    if (customerId && propertyId) {
      setIsParam(true)
      const customer = customerData.find((value) => value.uniqueid === customerId);
      const property = customer?.property?.find((value) => value.uniqueid === propertyId);
      setDisplayData({customer, property});
      proposalForm.setFieldValue('customer', customer?.uniqueid)
      proposalForm.setFieldValue('property', property?.uniqueid)
      setInitialValues((prev) => ({
        ...prev,
        customer: customer?.personalDetails?.firstName || "",
        property: property?.name || "",
      }));
    }
  }, [customerId, propertyId, customerData]);
  

  const toggleProperty = (event) => {
    if(customerData) {
      setPropertyData(customerData?.find(value => value.uniqueid === event)?.property)
    }
  }
  
  const toggleService = (event) => {
    if (adminData) {
      const data = services?.find((service) => service.name === event);
      if (data) {
        
  
        // Map through frequencies and update `price` for matching frequencies in `data.frequency`
        const updatedFrequencies = frequencies.map((freq) => {
          const matchedFrequency = data?.frequency?.find((item) => item.name === freq.name);
          return {
            ...freq,
            price: matchedFrequency ? matchedFrequency.price : freq.price,
          };
        });
        // console.log(data?.frequency)
        proposalForm.setFieldValue('type', data?.type)
        proposalForm.setFieldValue('description', data?.description )
        proposalForm.setFieldValue("frequency", data?.frequency);
  
        // Optionally update `frequencies` in state if needed
        setFrequencies(updatedFrequencies);
      }
    }
  };
  

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
                    <form onSubmit={proposalForm.handleSubmit}>
                      <div className="col-md-12">
                        <div className="head-filters">
                            <div className="part-1 gtc-1">
                                <h4 className="font-1 fw-700">Add Proposal</h4>
                            </div>
                            <div className="part-1 gtc-equal mob">
                            <button type='button' className="filter-btn bg-theme-2"><i class="fa-regular fa-arrows-rotate-reverse fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Reset All Fields</button>
                            <button type="submit" className="filter-btn txt-deco-none bg-theme-1">
                              {loading ? (
                                <>
                                  <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Save Proposal
                                </>
                              ) : (
                                <Spinner />
                              )}
                            </button>
                            </div>
                        </div>
                        <div className="box-cs mt-4">
                          <div className="row gap-20">
                            <div className="col-md-8">
                              
                              <div className="gtc-3 grid-cs">
                                <div>
                                  <div className="header">
                                      <h5 className="font-1 fw-700 font-size-16">Select Date</h5>
                                      {
                                        proposalForm.errors.createDate && proposalForm.touched.createDate && (<small className='text-danger'>{proposalForm.errors.createDate}</small>)
                                      }
                                  </div>
                                  <div className="input-section gtc-1 my-2">
                                      <input className={`${proposalForm.errors.createDate && proposalForm.touched.createDate && 'is-invalid'}`} type="date" value={proposalForm.values.createDate} onChange={proposalForm.handleChange}  name="createDate" id="" />
                                  </div>
                                </div>

                                <div>
                                  <div className="header">
                                      <h5 className="font-1 fw-700 font-size-16">Select Customer</h5>
                                      {
                                        proposalForm.errors.customer && proposalForm.touched.customer && (<small className='text-danger'>{proposalForm.errors.customer}</small>)
                                      }
                                  </div>
                                  <div className="input-section gtc-1 my-2">
                                  {
                                    isParam ? (
                                      <input type="text" className='input-disabled' value={displayData?.customer?.personalDetails?.firstName} name="customer" disabled id="" />
                                    ) : (
                                      <select
                                        className={`${proposalForm.errors.customer && proposalForm.touched.customer && 'is-invalid'}`}
                                        value={proposalForm.values.customer}
                                        onChange={(event)=>{proposalForm.handleChange(event), toggleProperty(event.target.value)}}
                                        name="customer"
                                      >
                                        <option value="">Select Customer</option>
                                        {customerData &&
                                          customerData.map((value, index) => (
                                            <option value={value.uniqueid} key={index}>
                                              {value.personalDetails?.firstName}
                                            </option>
                                          ))}
                                      </select>
                                    )
                                  }
                                  </div>
                                </div>

                                <div>
                                  <div className="header">
                                      <h5 className="font-1 fw-700 font-size-16">Select Property</h5>
                                      {
                                        proposalForm.errors.property && proposalForm.touched.property && (<small className='text-danger'>{proposalForm.errors.property}</small>)
                                      }
                                  </div>
                                  <div className="input-section gtc-1 my-2">
                                    {isParam ? (
                                      <input
                                        type="text"
                                        className="input-disabled"
                                        value={displayData?.property?.propertyName}
                                        name="property"
                                        disabled
                                        id=""
                                      />
                                    ) : (
                                      <select
                                        className={`${proposalForm.errors.property && proposalForm.touched.property && 'is-invalid'}`}
                                        value={proposalForm.values.property} // Directly bind to the uniqueid stored in Formik
                                        onChange={(e) => proposalForm.setFieldValue("property", e.target.value)} // Update only the uniqueid in Formik
                                        name="property"
                                      >
                                        <option value="">Select Property</option>
                                        {propertyData &&
                                          propertyData.map((value, index) => (
                                            <option value={value?.uniqueid} key={index}>
                                              {value?.propertyName}
                                            </option>
                                          ))}
                                      </select>
                                    )}
                                  </div>

                                </div>
                              </div>

                              <div className="grid-cs gtc-1 pt-3">
                                <div className="gtc-3 cs-align-end grid-cs">
                                  <div>
                                    <div className="header">
                                      <h5 className="font-1 fw-700 font-size-16">Details :</h5>
                                      {
                                        proposalForm.errors.serviceItem && proposalForm.touched.serviceItem && (<small className='text-danger'>{proposalForm.errors.serviceItem}</small>)
                                      }
                                    </div>
                                    <div className="input-section gtc-1 my-2">
                                      <select onChange={(event)=>{proposalForm.handleChange(event), toggleService(event.target.value)}} className={`${proposalForm.errors.serviceItem && proposalForm.touched.serviceItem && 'is-invalid'}`}  name="serviceItem" id="">
                                        <option value="">Service item</option>
                                        {
                                          services && services?.map((value, index) => {
                                            return (
                                              <option key={index}>{value.name}</option>
                                            )
                                          })
                                        }
                                      </select>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="input-section gtc-1 my-2">
                                        <input type="text" onChange={proposalForm.handleChange} disabled className='input-disabled' value={proposalForm.values.type} placeholder='Type' name="type" id="" />
                                    </div>
                                  </div>

                                  <div>
                                    {
                                      proposalForm.errors.quantity && proposalForm.touched.quantity && (<small className='text-danger'>{proposalForm.errors.quantity}</small>)
                                    }
                                    <div className="input-section gtc-1 my-2">
                                        <input type="text" className={`${proposalForm.errors.quantity && proposalForm.touched.quantity && 'is-invalid'}`} onChange={proposalForm.handleChange} placeholder='Quantity' name="quantity" id="" />
                                    </div>
                                  </div>
                                </div>
                                  {
                                    proposalForm.errors.sqft && proposalForm.touched.sqft && (<small className='text-danger'>{proposalForm.errors.sqft}</small>)
                                  }
                                <div className="grid-cs gtc-1-2">
                                  <div className="input-section gtc-1 my-2">
                                    <input type="text" className={`${proposalForm.errors.sqft && proposalForm.touched.sqft && 'is-invalid'}`} onChange={proposalForm.handleChange} placeholder='SQFT' name="sqft" id="" />
                                  </div>
                                  <div className="input-section gtc-1 my-2">
                                    <input type="text" onChange={proposalForm.handleChange} disabled className='input-disabled' value={proposalForm.values.description} placeholder='Description' name="description" id="" />
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
                              {/* <div className="frequency-layout ">
                                <div className='content'>
                                  <div className='gtc-3-1 width-100'>
                                      <h4 className="font-1 font-size-16 fw-700">Frequency Options</h4>
                                      <h4 className="font-1 font-size-16 fw-700">Price</h4>
                                  </div>
                                  <div>
                                    <div className="property">
                                      <p>One-Off</p>
                                    </div>
                                    <input type="text" placeholder='$' name="one-off" id="" />
                                  </div>
                                  <div>
                                    <div className="property">
                                      <p>Annual</p>
                                    </div>
                                    <input type="text" placeholder='$' name="annual" id="" />
                                  </div>
                                  <div>
                                    <div className="property">
                                      <p>Bi-Annual</p>
                                    </div>
                                    <input type="text" placeholder='$' name="bi-annual" id="" />
                                  </div>
                                  <div>
                                    <div className="property">
                                      <p>Quarterly</p>
                                    </div>
                                    <input type="text" placeholder='$' name="quarterly" id="" />
                                  </div>
                                  <div>
                                    <div className="property">
                                      <p>Bi-Quarterly</p>
                                    </div>
                                    <input type="text" placeholder='$' name="bi-quarterly" id="" />
                                  </div>
                                  <div>
                                    <div className="property">
                                      <p>Monthly</p>
                                    </div>
                                    <input type="text" placeholder='$' name="monthly" id="" />
                                  </div>
                                  <div>
                                    <div className="property">
                                      <p>Bi-weekly</p>
                                    </div>
                                    <input type="text" placeholder='$' name="bi-weekly" id="" />
                                  </div>
                                </div>
                              <button className="filter-btn bg-theme-2" >
                                <i className="fa-light fa-xl fa-circle-plus" style={{ color: "#ffffff" }} /> &nbsp; Add More Property
                              </button>
                              </div> */}
                              <div className="frequency-layout">
                                <div className="content">
                                  <div className="gtc-3-1 width-100">
                                    <h4 className="font-1 font-size-16 fw-700">Frequency Options</h4>
                                    <h4 className="font-1 font-size-16 fw-700">Price</h4>
                                  </div>
                                  {frequencies?.map((freq) => (
                                    <div key={freq}>
                                      <div className="property">
                                        <p>{freq?.name?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str.toUpperCase())}</p>
                                      </div>
                                      <input
                                        type="number"
                                        placeholder="$"
                                        name={freq.name}
                                        value={freq.price || ''}
                                        onChange={(e) => handleFrequencyChange(freq.name, e.target.value)}
                                      />
                                    </div>
                                  ))}
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
  )
}

export default AddProposal