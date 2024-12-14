import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProposalModal = ({ property, onConfirmation, customerid }) => {

    const navigate = useNavigate()

  const [selectedProperty, setSelectedProperty] = useState(null);

  // Handle radio button change
  const handlePropertyChange = (propertyId) => {
    setSelectedProperty(propertyId);
  };

  const navigateToProposalCreation = () => {
    navigate(`/add-proposal/${customerid}/${selectedProperty}`)
  }


  return (
    <>
      <div className="cs-modal">
        <div className="layout">
          {/* Header */}
          <div className="header">
            <h4>Select Property</h4>
          </div>

          {/* Body */}
          <div className="body">
            {property?.length >= 1 ? (
              property?.map((value, index) => {
                return (
                  <div 
                    key={index} 
                    className='selection-proposal'
                  >
                    {/* Property Name */}
                    <p>{value?.propertyName}</p>

                    {/* Radio Button */}
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="propertySelection"
                            checked={selectedProperty === value.uniqueid}
                            onChange={() => handlePropertyChange(value.uniqueid)}
                        />
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Properties yet</p>
            )}
          </div>

          {/* Footer */}
          <div className='flex-cs' style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={()=>onConfirmation(false)} className="proposal-modal-btn bg-theme-7">Close</button>
            <button
              disabled={!selectedProperty}
              onClick={navigateToProposalCreation}
              className='proposal-modal-btn'
              style={{
                backgroundColor: selectedProperty ? '#007BFF' : '#ccc',
                cursor: selectedProperty ? 'pointer' : 'not-allowed'
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProposalModal;
