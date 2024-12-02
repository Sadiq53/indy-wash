import { useState } from "react";

const MultiSelector = ({ onDataChange }) => {
  const [properties, setProperties] = useState([
    { 
      companyName: "", 
      property: "", 
      numBuildings: "", 
      numUnits: "", 
      billingAddress: "", 
      serviceAddress: "", 
      propertyType: [], 
      propertyFeatures: [], 
      note: "" 
    },
  ]);

  const setSelection = (index, type, value) => {
    const updatedProperties = [...properties];
    const property = updatedProperties[index];

    if (type === "propertyType" || type === "propertyFeatures") {
      if (property[type].includes(value)) {
        property[type] = property[type].filter((item) => item !== value);
      } else {
        property[type].push(value);
      }
    } else {
      property[type] = value;
    }

    setProperties(updatedProperties);
    onDataChange(updatedProperties); // Send updated data via props
  };

  const addProperty = () => {
    setProperties([
      ...properties,
      {
        companyName: "",
        property: "",
        numBuildings: "",
        numUnits: "",
        billingAddress: "",
        serviceAddress: "",
        propertyType: [],
        propertyFeatures: [],
        note: "",
      },
    ]);
  };

  return (
    <>
    <div className="box-cs">
        {properties.map((property, index) => (
            <div key={index} className="mt-5">
              {
                (index + 1) !== 1 && (
                  <div className={`py-4 ${(index + 1) !== 1 && 'cs-border'}`}>
                    <h5 className="font-1 fw-700 pill-cs font-size-16">Company Details {index + 1} </h5>
                  </div>
                )
              }
                <div>
                    <div className="header">
                      <h5 className="font-1 fw-700 font-size-16">Company Details :</h5>
                    </div>
                    <div className="input-section my-2">
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={property.companyName}
                        onChange={(e) => setSelection(index, "companyName", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Property"
                        value={property.property}
                        onChange={(e) => setSelection(index, "property", e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="# of Buildings"
                        value={property.numBuildings}
                        onChange={(e) => setSelection(index, "numBuildings", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="No. Of Units"
                        value={property.numUnits}
                        onChange={(e) => setSelection(index, "numUnits", e.target.value)}
                    />
                    </div>
                    <div className="input-section gtc-equal my-2">
                    <input
                        type="text"
                        placeholder="Billing Address"
                        value={property.billingAddress}
                        onChange={(e) => setSelection(index, "billingAddress", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Service Address"
                        value={property.serviceAddress}
                        onChange={(e) => setSelection(index, "serviceAddress", e.target.value)}
                    />
                    </div>
                </div>

                <div className="pt-3">
                    <div className="header">
                    <h5 className="font-1 fw-700 font-size-16">Property Type</h5>
                    </div>
                    <div className="grid-3-cs my-2 align-items-stretch">
                    <div className="input-section gtc-3">
                    {["2-Story Garden - Style", "4-Story Mid-rise", "High Rise", "3-Story Garden - Style", "5-Story Mid-rise", "Garden-rise"].map(
                        (type) => (
                        <div
                            key={type}
                            className={`checkbox-item ${property.propertyType.includes(type) ? "active" : ""}`}
                            onClick={() => setSelection(index, "propertyType", type)}
                        >
                            {property.propertyType.includes(type) && (
                            <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                            )}
                            {type}
                        </div>
                        )
                    )}
                    </div>
                        <div className="input-section gtc-1 my-2">
                        <textarea
                            rows={3}
                            placeholder="Note"
                            value={property.note}
                            onChange={(e) => setSelection(index, "note", e.target.value)}
                        ></textarea>
                        </div>
                    </div>
                </div>

                <div className="pt-3">
                    <div className="header">
                    <h5 className="font-1 fw-700 font-size-16">Property Features</h5>
                    </div>
                    <div className="input-section">
                    {["Vinyl Siding", "Hardie Board", "Ample Water Supply", "Ample Parking", "Brick Siding", "Breezeways", "Limited Water Supply", "Limited Parking"].map(
                        (feature) => (
                        <div
                            key={feature}
                            className={`checkbox-item ${property.propertyFeatures.includes(feature) ? "active" : ""}`}
                            onClick={() => setSelection(index, "propertyFeatures", feature)}
                        >
                            {property.propertyFeatures.includes(feature) && (
                            <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                            )}
                            {feature}
                        </div>
                        )
                    )}
                    </div>
                </div>
            </div>
        ))}
    </div>

      <div className="my-3">
        <button className="filter-btn bg-theme-2" onClick={addProperty}>
          <i className="fa-light fa-xl fa-circle-plus" style={{ color: "#ffffff" }} /> &nbsp; Add More Property
        </button>
      </div>
    </>
  );
};

export default MultiSelector;
