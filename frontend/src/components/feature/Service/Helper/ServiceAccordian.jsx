import { useEffect, useState } from "react";
import { frequencyDigit, frequencyDigitConverter } from '../../../../utils/frequencyDigitConverter'
import DeleteServiceModal from './DeleteServiceModal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the default CSS for Toastify


const ServiceAccordian = ({ property, service, onChangeData, getServiceid }) => {

  const [servicesData, setServicesData] = useState(
    service?.reduce((acc, curr) => {
      acc[curr.uniqueid] = { ...curr }; // Initialize the state with each service data
      return acc;
    }, {})
  );

// Function to toggle month selection
const toggleMonthSelection = (month, serviceUniqueId) => {
    setServicesData((prevServicesData) => {
      const updatedService = { ...prevServicesData[serviceUniqueId] };
  
      // Get the frequency object based on the activePlan
      const activePlanFrequency = updatedService.frequency?.find(
        (item) => item.name === updatedService.activePlan
      );
      const frequencyDigitValue = activePlanFrequency?.frequencyDigit; // Get the frequencyDigit
  
      if (!frequencyDigitValue) return prevServicesData; // Ensure there's a valid frequency value
  
      // Reset the months if activePlan has changed
      if (updatedService.activePlan !== prevServicesData[serviceUniqueId].activePlan) {
        updatedService.months = []; // Clear months when activePlan changes
      }
  
      // Check if the user has already selected or deselected the month
      let updatedSelectedMonths;
      if (updatedService.months?.includes(month)) {
        // Remove the month if already selected
        updatedSelectedMonths = updatedService.months.filter((item) => item !== month);
      } else {
        // Add month if not selected
        updatedSelectedMonths = [...(updatedService.months || []), month];
      }
  
      // Ensure the selected months match the required frequency (mandatory selection)
      if (updatedSelectedMonths.length > frequencyDigitValue) {
        // Show a Toast notification if the number of selected months exceeds the limit
        toast.error(`You can only select up to ${frequencyDigitValue} months.`);
        return prevServicesData;
      }
  
      // Update the service data with the newly selected months
      updatedService.months = updatedSelectedMonths;
  
      // Update the state with the updated selected months
      return {
        ...prevServicesData,
        [serviceUniqueId]: updatedService,
      };
    });
};

const handleInputChange = (e, serviceUniqueId, field) => {
    const { value } = e.target;
    setServicesData((prevServicesData) => {
      const updatedService = { ...prevServicesData[serviceUniqueId] };
      updatedService[field] = value;
      return {
        ...prevServicesData,
        [serviceUniqueId]: updatedService,
      };
    });
};

const handleFrequencyChange = (e, frequency, serviceUniqueId, field) => {
    const { value } = e.target;

    // Check if the value is a string (frequency name) or number (price)
    const isString = isNaN(value);

    setServicesData((prevServicesData) => {
        const updatedService = { ...prevServicesData[serviceUniqueId] };

        if (isString) {
            // Handle the case when the value is a string (frequency name)
            const frequencyExists = updatedService.frequency?.find(
                (item) => item.name === value
            );

            if (frequencyExists) {
                // If it exists, set it as the activePlan
                updatedService.activePlan = value;
            } else {
                // If it doesn't exist, create a new entry in the frequency array
                updatedService.frequency = [
                    ...(updatedService.frequency || []),
                    {
                        name: value,
                        price: 0,
                        frequencyDigit: frequencyDigitConverter[value] || 1, // Default to 1 if no converter value
                    },
                ];
                updatedService.activePlan = value;
            }
        } else {
            // Handle the case when the value is a number (price)
            updatedService.frequency = updatedService.frequency?.map((item) => {
                if (item.name === frequency) {
                    return {
                        ...item,
                        [field]: Number(value), // Convert the value to a number before storing
                    };
                }
                return item;
            });
        }

        // Return the updated services data
        return {
            ...prevServicesData,
            [serviceUniqueId]: updatedService,
        };
    });
};

const resetMonths = (serviceUniqueId) => {
    setServicesData((prevServicesData) => {
      if (!prevServicesData[serviceUniqueId]) {
        console.error(`Service with ID ${serviceUniqueId} not found.`);
        return prevServicesData; // Return unchanged state if the service doesn't exist
      }
  
      // Create a copy of the specific service data and reset its months
      const updatedService = { 
        ...prevServicesData[serviceUniqueId], 
        months: [] // Reset the months to an empty array
      };
  
      // Return the updated state with the reset service
      return {
        ...prevServicesData,
        [serviceUniqueId]: updatedService,
      };
    });
};

useEffect(()=>{
    onChangeData(servicesData)
}, [servicesData])

//   useEffect(()=>{console.log(servicesData)}, [servicesData])

  return (
    <div className="accordion" id="servicesAccordion">
      {service?.map((value) => {
        const getFrequency = servicesData[value?.uniqueid]?.frequency?.find((item) => item.name === servicesData[value?.uniqueid]?.activePlan);
        const perCleaning = servicesData[value?.uniqueid]?.sqft * getFrequency?.price;
        const perMonth = ((perCleaning * getFrequency?.frequencyDigit) / 12 / property?.units).toFixed(2);

        return (
          <div className="accordion-item cs-accordian" key={value.uniqueid}>
            <h2 className="accordion-header cs-accordian-head" id={`heading-${value.uniqueid}`}>
              <button
                className="accordion-button cs-accordian-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${value.uniqueid}`}
                aria-expanded="true"
                aria-controls={`collapse-${value.uniqueid}`}
              >
                <div className="flex-cs cs-justify-between">
                  <h4>{value?.name}</h4>
                  <div className="table-profile">
                    <div className="gap-0">
                      {/* <button className={`btn ${window.innerWidth > 767 ? "" : "btn-sm"}`}>
                        <i
                          className={`fa-solid ${window.innerWidth > 767 ? "fa-lg" : "fal-sm"} fa-pen`}
                          style={{ color: "#00b69b" }}
                        />
                      </button> */}
                    <button className={`btn ${window.innerWidth > 767 ? "" : "btn-sm"}`} onClick={()=>getServiceid(value.uniqueid)} data-bs-toggle="modal" data-bs-target="#delete" >
                      <i
                        className={`fa-regular ${window.innerWidth > 767 ? "fa-lg" : "fal-sm"} fa-trash-can`}
                        style={{ color: "#f93c65" }}
                      />
                    </button>
                    </div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id={`collapse-${value.uniqueid}`}
              className="accordion-collapse collapse show"
              aria-labelledby={`heading-${value.uniqueid}`}
              data-bs-parent="#servicesAccordion"
            >
              <div className="accordion-body">
                <div className="accordian-content">
                  <div className="top-section">
                    <div className="header">
                      <h4>Service Item</h4>
                      <h4>Quantity</h4>
                      <h4>SQFT</h4>
                      <h4>Frequency</h4>
                      <h4>Price/SQFT</h4>
                    </div>
                    <div className="body">
                      <div className="part-1 input-section">
                        <input
                          className="width-100 input-"
                          type="text"
                          placeholder="Enter Service Name"
                          value={servicesData[value.uniqueid]?.name || ""}
                          onChange={(e) => handleInputChange(e, value.uniqueid, "name")}
                          
                        />
                        <input
                          className="width-100 input-"
                          type="text"
                          placeholder="Quantity"
                          value={servicesData[value.uniqueid]?.quantity || ""}
                          onChange={(e) => handleInputChange(e, value.uniqueid, "quantity")}
                          
                        />
                        <input
                          className="width-100 input-"
                          type="text"
                          placeholder="SQFT"
                          value={servicesData[value.uniqueid]?.sqft || ""}
                          onChange={(e) => handleInputChange(e, value.uniqueid, "sqft")}
                          
                        />
                        <select className="width-100" value={servicesData[value.uniqueid]?.activePlan || ""} onChange={(e) => {handleFrequencyChange(e, servicesData[value.uniqueid]?.activePlan, value.uniqueid, "activePlan"), resetMonths(value.uniqueid)}} name="" id="">
                            {
                                frequencyDigit?.map((item, itemIndex) => {
                                    return (<option key={itemIndex} value={item}>{item}</option>)
                                })
                            }
                        </select>
                        {/* <input
                          className="width-100 input-"
                          type="text"
                          placeholder="Frequency"
                          value={servicesData[value.uniqueid]?.activePlan || ""}
                          onChange={(e) => handleFrequencyChange(e, value.uniqueid, "activePlan")}
                          
                        /> */}
                        <input
                          className="width-100 input-"
                          type="number"
                          placeholder="$0.06"
                          value={getFrequency?.price || ""}
                          onChange={(e) => handleFrequencyChange(e, servicesData[value.uniqueid]?.activePlan, value.uniqueid, "price")}
                          
                        />
                      </div>
                      <div className="part-2 input-section">
                        <textarea
                          rows={5}
                          className="input-"
                          
                          placeholder="Note"
                          value={servicesData[value.uniqueid]?.description || ""}
                          onChange={(e) => handleInputChange(e, value.uniqueid, "description")}
                        ></textarea>
                        <div className="keys">
                          <h4>Price Per Clean =</h4>
                          <h4>Annual Investment =</h4>
                          <h4>Price Per Door/Month =</h4>
                        </div>
                        <div className="values input-section gtc-3">
                          <input
                            className="width-100 input-disabled"
                            disabled
                            type="text"
                            placeholder="$0.06"
                            
                            value={perCleaning || ""}
                          />
                          <input
                            className="width-100 input-disabled"
                            disabled
                            type="text"
                            placeholder="$0.06"
                            
                            value={perCleaning * getFrequency?.frequencyDigit || ""}
                          />
                          <input
                            className="width-100 input-disabled"
                            disabled
                            type="text"
                            placeholder="$0.06"
                            
                            value={perMonth || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-section width-100">
                    <div className="head">
                      <h4>Select Service Month(s): *</h4>
                    </div>
                    <div className="grid-cd width-100 input-section gtc-6">
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month) => (
                        <div
                          key={month}
                          className={`checkbox-item ${
                            servicesData[value?.uniqueid]?.months?.includes(month) ? "active" : ""
                          }`}
                          onClick={() => toggleMonthSelection(month, value.uniqueid)}
                        >
                          {servicesData[value.uniqueid]?.months?.includes(month) && (
                            <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                          )}
                          {month}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceAccordian;





{/* Accordion Item 2
<div className="accordion-item cs-accordian">
    <h2 className="accordion-header" id="headingTwo">
        <button
        className="accordion-button cs-accordian-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
        >
        <div className="flex-cs cs-justify-between">
            <h4>Trash Room</h4>
            <div className="table-profile">
                <div className="gap-0">
                    <button className={`btn ${window.innerWidth > 767 ? '' : 'btn-sm'}`}><i className={`fa-solid ${window.innerWidth > 767 ? 'fa-lg' : 'fal-sm'} fa-pen`} style={{ color: "#00b69b" }} /></button>
                    <button className={`btn ${window.innerWidth > 767 ? '' : 'btn-sm'}`}><i className={`fa-regular ${window.innerWidth > 767 ? 'fa-lg' : 'fal-sm'} fa-trash-can`} style={{ color: "#f93c65" }} /></button>
                </div>
            </div>
        </div>
        </button>
    </h2>
    <div
        id="collapseTwo"
        className="accordion-collapse collapse show"
        aria-labelledby="headingTwo"
        data-bs-parent="#servicesAccordion"
    >
        <div className="accordion-body">
            <div className="accordian-content">
                <div className="top-section">
                    <div className="header">
                        <h4>Service Item</h4>
                        <h4>Quantity</h4>
                        <h4>SQFT</h4>
                        <h4>Frequency</h4>
                        <h4>Price/SQFT</h4>
                    </div>
                    <div className="body">
                        <div className="part-1 input-section">
                            <input className="width-100" type="text" placeholder="L1/Retail Parking Garage" name="" id="" />
                            <input className="width-100" type="text" placeholder="01" name="" id="" />
                            <input className="width-100" type="text" placeholder="27,542" name="" id="" />
                            <input className="width-100" type="text" placeholder="Quarterly" name="" id="" />
                            <input className="width-100" type="text" placeholder="$0.06" name="" id="" />
                        </div>
                        <div className="part-2 input-section">
                            <textarea
                                rows={5}
                                placeholder="Note"
                                value="This service includes hot water pressure washing, industrial-grade 
                                        degreaser, and surface cleaning to remove dirt, gum, stains, and other debris."
                            ></textarea>
                            <div className="keys">
                                <h4>Price Per Clean =</h4>
                                <h4>Annual Investment =</h4>
                                <h4>Price Per Door/Month =</h4>
                            </div>
                            <div className="values input-section gtc-3">
                            <input className="width-100" type="text" placeholder="$0.06" name="" id="" />
                            <input className="width-100" type="text" placeholder="$0.06" name="" id="" />
                            <input className="width-100" type="text" placeholder="$0.06" name="" id="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-section width-100">
                    <div className="head">
                        <h4>Select Service Month(s): *</h4>
                    </div>
                    <div className="grid-cd width-100 input-section gtc-6">
                        {[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ].map((month) => (
                            <div
                            key={month}
                            className={`checkbox-item ${
                                selectedMonths.includes(month) ? "active" : ""
                            }`}
                            onClick={() => toggleMonthSelection(month)}
                            >
                            {selectedMonths.includes(month) && (
                                <i
                                className="fa-light fa-circle-check fa-lg"
                                style={{ color: "#ffffff" }}
                                />
                            )}
                            {month}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}