import { NavLink, useParams } from "react-router-dom";
import ProposalTagCard from "./Helper/ProposalTagCard";
import AgreedModal from "./Helper/AgreedModal";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from '../../../utils/formatDate'
import ServiceViewCrad from "./Helper/ServiceViewCrad";
import { toggleStatus } from '../../../services/ProposalService'
import { handleToggleStatus } from "../../../redux/ServiceDataSlice";
import { toast } from "react-toastify";

const ProposalDetail = () => {
  const { proposalid } = useParams();
  const dispatch = useDispatch()

  const rawServiceData = useSelector(state => state.ServiceDataSlice.services);
  const rawProposalData = useSelector(state => state.ServiceDataSlice.proposal);
  const rawCustomerData = useSelector(state => state.AdminDataSlice.customers);

  const [popup, setPopup] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [selectedServiceData, setSelectedServiceData] = useState({})
  const [propertyData, setPropertyData] = useState({});
  const [proposalData, setProposalData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [totalSqft, setTotalSqft] = useState(null)
  const [perCleaning, setPerCleaning] = useState(null)
  const [selectedFrequency, setSelectedFrequency] = useState({})

  const confirmation = async(state) => {
    if (state) {
      const dataObject = {
        status: state,
        proposalid
      }
      const response = await toggleStatus(dataObject)
      if(response?.success) {
        dispatch(handleToggleStatus(dataObject))
        toast.success(`Your is Proposal Active and Added to Active Overview`);
      }
    }
    setPopup(false);
  };

  useEffect(() => {
    if (proposalid && rawCustomerData && rawProposalData && rawServiceData) {
      const filteredProposal = rawProposalData?.find(value => value.uniqueid === proposalid);
      if (!filteredProposal) return; // Ensure filteredProposal exists
      
      const { customer, property, service } = filteredProposal;
      
      const filteredCustomer = rawCustomerData?.find(value => value.uniqueid === customer);
      const allServices = filteredProposal?.service;
      const filteredServices = rawServiceData?.filter(service => allServices?.includes(service?.uniqueid));
      const filteredProperty = filteredCustomer?.property?.find(value => value.uniqueid === property);
      
      setProposalData(filteredProposal)
      setCustomerData(filteredCustomer || {});
      setPropertyData(filteredProperty || {});
      setServiceData(filteredServices || []);
      setSelectedServiceData(filteredServices[0])
    }
  }, [proposalid, rawCustomerData, rawProposalData, rawServiceData]);

  useEffect(() => {
    if (Array.isArray(serviceData) && serviceData.length > 0) {
      const totalSqft = serviceData.reduce((acc, curr) => acc + (curr.sqft || 0), 0);
      setTotalSqft(totalSqft);
    }
  }, [serviceData]);

  useEffect(() => {
    if(selectedServiceData) {
      const getFrequency = selectedServiceData?.frequency?.find(value => value.name === selectedServiceData?.activePlan)
      setSelectedFrequency(getFrequency)
      setPerCleaning(getFrequency?.price * selectedServiceData?.sqft)
    }
  }, [selectedServiceData]);


  const currentIndexRef = useRef(serviceData.findIndex(service => service.id === selectedServiceData.id));

  const handleNextService = () => {
    // Increment index, loop back to the beginning if at the last item
    currentIndexRef.current = (currentIndexRef.current + 1) % serviceData.length;

    // Update the selected service based on the new index
    const nextService = serviceData[currentIndexRef.current];
    setSelectedServiceData(nextService);
  };

  const handlePreviousService = () => {
    // Decrement index, loop back to the last item if at the first item
    currentIndexRef.current = (currentIndexRef.current - 1 + serviceData.length) % serviceData.length;

    // Update the selected service based on the new index
    const prevService = serviceData[currentIndexRef.current];
    setSelectedServiceData(prevService);
  };


  return (
    <>
      <section className="position-rel">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-12">
              <div className="head-filters">
                <div className="part-1">
                  <h4 className="font-1 fw-700">{propertyData?.propertyName || "N/A"}</h4>
                </div>
                <div className="part-1 gtc-4">
                  {proposalData?.status === 'active' ? (
                    <button className="filter-btn txt-deco-none bg-theme-1">
                      <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                      &nbsp; Mark As Agreed
                    </button>
                  ) : (
                    <button onClick={() => setPopup(true)} className="filter-btn bg-theme-7-outline">
                      <div className="flex-cs">
                        <input type="checkbox" className="cs-checkbox form-check-input mt-0" />
                        &nbsp; Mark As Agreed
                      </div>
                    </button>
                  )}
                  <button className="filter-btn bg-theme-7">
                    <i className="fa-thin fa-lg fa-download" style={{ color: "#ffffff" }} />
                    &nbsp; Download Agreement
                  </button>
                  <NavLink to={`/service-detail/${proposalid}`} className="filter-btn txt-deco-none bg-theme-2">
                    <i className="fa-regular fa-arrows-rotate-reverse fa-lg" style={{ color: "#ffffff" }} />
                    &nbsp; Contract Overview
                  </NavLink>
                  <NavLink to='/proposal-detail' className="filter-btn txt-deco-none bg-theme-1">
                    <i className="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} />
                    &nbsp; Save Proposal
                  </NavLink>
                </div>
              </div>

              <div className="pt-4">
                <div className="box-cs">
                  <div className="row gap-20">
                    <div className="col-md-8">
                      <ProposalTagCard service={selectedServiceData} units={propertyData?.units}/>
                      <div className="pt-4">
                        <ServiceViewCrad handlePreviousService={handlePreviousService} handleNextService={handleNextService} proposalid={proposalid} selectedServiceData={selectedServiceData} />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="proposal-data">
                        <div><p>Date </p>: <p>{formatDate(proposalData?.createDate)}</p></div>
                        <div><p>No. of Units </p>: <p>{propertyData?.units}</p></div>
                        <div><p>Company</p>: <p>{propertyData?.propertyName || "N/A"}</p></div>
                        <div><p>Contact Name</p>: <p>{customerData?.personalDetails?.firstName}</p></div>
                        <div><p>Contact No</p>: <p>{customerData?.personalDetails?.phone}</p></div>
                        <div><p>Property Address</p>: <p>{propertyData?.billingAddress || "N/A"}</p></div>
                      </div>
                      <div className="pt-4">
                        <div className="service-overview-card">
                          <div><h4>Service Overview</h4></div>
                          <div>
                            <p>
                              {selectedServiceData?.description}
                            </p>
                          </div>
                          <div className="grid-cs gtc-equal mob">
                            <div className="tab-cs">{totalSqft} SQFT</div>
                            <div className="tab-cs">${perCleaning * selectedFrequency?.frequencyDigit}/Yr</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {popup && <AgreedModal onConfirmation={confirmation} />}
    </>
  );
};

export default ProposalDetail;
