import { useEffect, useRef, useState } from "react";
import { frequencyDigit, frequencyDigitConverter } from "../../../../utils/frequencyDigitConverter";
import { generateUniqueId } from '../../../../utils/UniqueIdGenerator'
import { addExtraService } from '../../../../services/ServicesService'
import { useDispatch } from "react-redux";
import { handleAddExtraService } from '../../../../redux/ServiceDataSlice'
import { handleAddService } from "../../../../redux/AdminDataSlice";
import Spinner from "../../../shared/Loader/Spinner";

const AddServiceModal = ({ proposalId, customerId, propertyId }) => {

    const dispatch = useDispatch()
    const clsModal = useRef()

    const [createDate] = useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    });
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([]);

    const [formValues, setFormValues] = useState({
        uniqueid: generateUniqueId(),
        createDate,
        name: "",
        type: "",
        quantity: '',
        description: "",
        frequency: [],
        activePlan: "",
        additionalInfo: [],
        proposalid: proposalId || "",
        customerid: customerId || "",
        propertyid: propertyId || "",
    });
    
    useEffect(()=>{
        if(proposalId && customerId && propertyId ) {
            setFormValues({...formValues, propertyid: propertyId, proposalid: proposalId, customerid: customerId})
        }
    }, [proposalId, customerId, propertyId])


    // Handle input changes for text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle frequency-related updates (e.g., activePlan and frequency array)
    const handleFrequencyChange = (e) => {
        const selectedPlan = e.target.value;
        setFormValues((prevValues) => {
            // Find the existing frequency object or create a new one
            let updatedFrequency = [...prevValues.frequency];
            const existingFrequency = updatedFrequency.find(
                (item) => item.name === selectedPlan
            );

            if (!existingFrequency) {
                updatedFrequency.push({
                    name: selectedPlan,
                    price: 0,
                    frequencyDigit: frequencyDigitConverter[selectedPlan] || 1, // Set default frequencyDigit
                });
            }

            return {
                ...prevValues,
                activePlan: selectedPlan,
                frequency: updatedFrequency,
            };
        });
    };

    // Handle updates to price within the frequency array
    const handlePriceChange = (e, frequencyName) => {
        const { value } = e.target;
        setFormValues((prevValues) => {
            const updatedFrequency = prevValues.frequency.map((item) => {
                if (item.name === frequencyName) {
                    return {
                        ...item,
                        price: Number(value), // Ensure the price is stored as a number
                    };
                }
                return item;
            });

            return {
                ...prevValues,
                frequency: updatedFrequency,
            };
        });
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files); // Get all selected files
        const newImageFiles = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file), // Generate a preview URL for the image
        }));
        setImage((prevImages) => [...prevImages, ...newImageFiles]); // Add to existing images
    };

    useEffect(()=>{
        setFormValues({...formValues, additionalInfo: image})
    }, [image])

    const handleRemoveImage = (index) => {
        setImage((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    

    const submitServiceData = async() => {
        setLoading(true)
        const response = await addExtraService(formValues)
        if(response.success) {
            const dataObject = {
                response : response.result,
                proposalid: proposalId || "",
                customerid: customerId || "",
                propertyid: propertyId || "",
                serviceid: formValues?.uniqueid || "",
            }
            setLoading(false)
            dispatch(handleAddExtraService(dataObject))
            dispatch(handleAddService(dataObject))
            clsModal.current?.click()
        }
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog width-800 modal-dialog-centered">
                    <div className="modal-content box-cs">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add New Service
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                                                className="width-100"
                                                type="text"
                                                placeholder="Service Name"
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                className="width-100"
                                                type="text"
                                                placeholder="Quantity"
                                                name="quantity"
                                                value={formValues.quantity}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                className="width-100"
                                                type="text"
                                                placeholder="SQFT"
                                                name="sqft"
                                                value={formValues.sqft}
                                                onChange={handleInputChange}
                                            />
                                            <select
                                                className="width-100"
                                                value={formValues.activePlan}
                                                onChange={handleFrequencyChange}
                                            >
                                                <option value="">Select Frequency</option>
                                                {frequencyDigit?.map((item, index) => (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                className="width-100"
                                                type="text"
                                                placeholder="$"
                                                name="price"
                                                value={
                                                    formValues.frequency.find(
                                                        (item) => item.name === formValues.activePlan
                                                    )?.price || ""
                                                }
                                                onChange={(e) =>
                                                    handlePriceChange(e, formValues.activePlan)
                                                }
                                            />
                                        </div>
                                        <div className="part-2 gtc-equal input-section">
                                            <div className="flex-cs cs-flex-column">
                                                <input
                                                    className="width-100"
                                                    type="text"
                                                    placeholder="Type"
                                                    name="type"
                                                    value={formValues.type}
                                                    onChange={handleInputChange}
                                                />
                                                <textarea
                                                    rows={2}
                                                    placeholder="Service Overview"
                                                    name="description"
                                                    value={formValues.description}
                                                    className="width-100"
                                                    onChange={handleInputChange}
                                                ></textarea>
                                            </div>
                                            {/* <div className="grid-cs gtc-equal cs-align-end">
                                                <div>
                                                    <div
                                                        className="input-section mt-2 gtc-1"
                                                        onClick={() =>
                                                            document.getElementById("file-upload1").click()
                                                        }
                                                    >
                                                        <div className="upload-box">
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
                                                            )}
                                                        </div>
                                                        <input
                                                            id="file-upload1"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                handleImageUpload(e, "image1")
                                                            }
                                                            className="file-input"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        className="input-section gtc-1"
                                                        onClick={() =>
                                                            document.getElementById("file-upload2").click()
                                                        }
                                                    >
                                                        <div className="upload-box">
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
                                                            )}
                                                        </div>
                                                        <input
                                                            id="file-upload2"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                handleImageUpload(e, "image2")
                                                            }
                                                            className="file-input"
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="input-section grid-cs gtc-equal cs-align-end">
                                    {image?.length > 0 ? 
                                        image?.map((image, index) => (
                                    <div
                                      className="upload-box"
                                      onClick={() => document.getElementById('file-upload').click()}
                                    >
                                        <div className="image-preview-container">
                                            <div key={index} className="image-preview">
                                              <img src={image.preview} alt="Uploaded" />
                                              <button
                                                type="button"
                                                className="btn btn-danger btn-sm cs-absolute"
                                                onClick={() => handleRemoveImage(index)}
                                              >
                                                Remove
                                              </button>
                                            </div>
                                            </div>
                                        </div>
                                          )) : (
                                            <>
                                            <div
                                              className="upload-box"
                                              onClick={() => document.getElementById('file-upload').click()}
                                            >
                                              <img
                                                src="/assets/img/camera.svg"
                                                alt="Camera Icon"
                                                className="camera-icon"
                                              />
                                              <p>Upload Photos</p>
                                            </div>
                                        </>
                                      )}
                                    </div>
                                    <input
                                      id="file-upload"
                                      type="file"
                                      accept="image/*"
                                      multiple // Allow selecting multiple files
                                      onChange={handleImageUpload}
                                      className="file-input"
                                    />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={clsModal} className="filter-btn bg-theme-7" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                className="filter-btn bg-theme-1"
                                onClick={submitServiceData}
                            >
                                Save changes { loading && (<Spinner />) }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddServiceModal;
