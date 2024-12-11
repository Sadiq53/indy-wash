import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { generateUniqueId } from "../../../utils/UniqueIdGenerator";
import { addCustomService } from '../../../services/ServicesService'
import { useDispatch } from "react-redux";
import { handleAddCustomService } from "../../../redux/AdminDataSlice";

const AddService = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

  const [createDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [initialValues] = useState({
    uniqueid: generateUniqueId(),
    createDate,
    name: "",
    type: "",
    description: "",
    frequency: [],
  });

    const frequencyDigitConverter = {
    'one-off': 1,
    'quarterly': 4,
    'bi-quarterly': 2,
    'annual': 1,
    'bi-annual': 2,
    'bi-weekly': 26,
    'monthly': 12,
    }

  const serviceForm = useFormik({
    initialValues,
    onSubmit: async (formData) => {
        const response = await addCustomService(formData)
        if(response.success) {
            dispatch(handleAddCustomService(response?.result))
            navigate(`/services`)
        }
    },
  });

  const handleFrequencyChange = (name, value) => {
    const updatedFrequency = serviceForm.values.frequency.filter(
      (item) => item.name !== name
    );

    if (value) {
      updatedFrequency.push({ name, price: value, frequencyDigit: frequencyDigitConverter[name] });
    }

    serviceForm.setFieldValue("frequency", updatedFrequency);
  };

  return (
    <>
      <section>
        <div className="container py-4">
          <div className="row">
            <form onSubmit={serviceForm.handleSubmit}>
                <div className="col-md-12">
                <div className="head-filters">
                    <div className="part-1">
                    <h4 className="font-1 fw-700">Create Custom Services</h4>
                    </div>
                    <div className="part-1 gtc-equal mob">
                    <button
                        type="button"
                        className="filter-btn bg-theme-2"
                        onClick={() => serviceForm.resetForm()}
                    >
                        <i
                        className="fa-regular fa-arrows-rotate-reverse fa-lg"
                        style={{ color: "#ffffff" }}
                        />{" "}
                        &nbsp; Reset All Fields
                    </button>
                    <button
                        type="submit"
                        to="/proposal-detail"
                        onClick={serviceForm.handleSubmit}
                        className="filter-btn txt-deco-none bg-theme-1"
                    >
                        <i
                        className="fa-light fa-circle-check fa-lg"
                        style={{ color: "#ffffff" }}
                        />{" "}
                        &nbsp; Save Service
                    </button>
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
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={serviceForm.values.name}
                                onChange={serviceForm.handleChange}
                            />
                            </div>
                        </div>

                        <div>
                            <div className="input-section gtc-1 my-2">
                            <input
                                type="text"
                                placeholder="Type"
                                name="type"
                                value={serviceForm.values.type}
                                onChange={serviceForm.handleChange}
                            />
                            </div>
                        </div>
                        </div>

                        <div>
                        <div className="input-section gtc-1 my-2">
                            <input
                            type="text"
                            placeholder="Service Overview"
                            name="description"
                            value={serviceForm.values.description}
                            onChange={serviceForm.handleChange}
                            />
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
                                        <input type="number" onChange={(e)=>handleFrequencyChange('one-off', e.target.value)} placeholder='$' name="one-off" id="" />
                                    </div>
                                    <div>
                                        <div className="property">
                                            <p>Annual</p>
                                        </div>
                                        <input type="number" onChange={(e)=>handleFrequencyChange('annual', e.target.value)} placeholder='$' name="annual" id="" />
                                    </div>
                                        <div>
                                        <div className="property">
                                            <p>Bi-Annual</p>
                                        </div>
                                        <input type="number" onChange={(e)=>handleFrequencyChange('bi-annual', e.target.value)} placeholder='$' name="bi-annual" id="" />
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
                                    <input type="number" onChange={(e)=>handleFrequencyChange('quarterly', e.target.value)} placeholder='$' name="quarterly" id="" />
                                    </div>
                                    <div>
                                    <div className="property">
                                        <p>Bi-Quarterly</p>
                                    </div>
                                    <input type="number" onChange={(e)=>handleFrequencyChange('bi-quarterly', e.target.value)} placeholder='$' name="bi-quarterly" id="" />
                                    </div>
                                    <div>
                                    <div className="property">
                                        <p>Monthly</p>
                                    </div>
                                    <input type="number" onChange={(e)=>handleFrequencyChange('monthly', e.target.value)} placeholder='$' name="monthly" id="" />
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
                                        <input type="number" onChange={(e)=>handleFrequencyChange('bi-weekly', e.target.value)} placeholder='$' name="bi-weekly" id="" />
                                    </div>
                                    {/* <div>
                                        <div className="property">
                                            <p>Bi-Annual</p>
                                        </div>
                                        <input type="text" onChange={(e)=>handleFrequencyChange('', e.target.value)} placeholder='$' name="" id="" />
                                    </div> */}
                                </div>
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

export default AddService;
