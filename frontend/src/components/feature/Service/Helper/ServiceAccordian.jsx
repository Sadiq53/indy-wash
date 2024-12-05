import { useState } from "react";

const ServiceAccordian = () => {

    const [selectedMonths, setSelectedMonths] = useState([]);

    // Function to toggle month selection
    const toggleMonthSelection = (month) => {
        setSelectedMonths((prevSelectedMonths) =>
            prevSelectedMonths.includes(month)
            ? prevSelectedMonths.filter((item) => item !== month) // Remove month if already selected
            : [...prevSelectedMonths, month] // Add month if not selected
        );
    };
  return (
    <>
        <div className="accordion " id="servicesAccordion">
            {/* Accordion Item 1 */}
            <div className="accordion-item cs-accordian">
                <h2 className="accordion-header" id="headingOne">
                    <button
                    className="accordion-button cs-accordian-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    >
                    <div className="flex-cs cs-justify-between">
                        <h4>L1/Retail Parking Garage</h4>
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
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
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
            </div>

            {/* Accordion Item 2 */}
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
            </div>

        </div>
    </>
  )
}

export default ServiceAccordian