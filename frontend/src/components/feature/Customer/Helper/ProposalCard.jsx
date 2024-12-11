import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProposalCard = ({ proposalid, customerid }) => {

    // Safely extracting data from Redux store with optional chaining
    const customerDetail = useSelector((state) => state.AdminDataSlice.customers) || [];
    const proposalDetail = useSelector((state) => state.ServiceDataSlice.proposal) || [];
 
    const [displayData, setDisplayData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
 
    // Ensure proposalDetail is updated correctly
    useEffect(() => {
        if (proposalDetail.length >= 1 && proposalid && customerid) {
            const filteredCustomer = customerDetail?.find(value => value.uniqueid === customerid)
            const filteredProposal = proposalDetail?.find(value => proposalid?.includes(value.uniqueid))
            setDisplayData(filteredProposal);
            setCustomerData(filteredCustomer)
        }
    }, [proposalDetail, proposalid, customerid]);


  return (
    <>
        <div className="proposal-card">
            {/* <div className="head-filters mob">
                <h4 className="font-1 text-light fw-700">Proposal Details</h4>
            </div>
            <div className="body cs my-4">
                <img src="/assets/img/exclm.svg" alt="" />
                <h4 className="font-1 text-light fw-700">No Proposal Found !!</h4>
            </div> */}
            <div className="body">
                <div className="head-filters mob pt-3">
                    <div className="part-1 gtc-1">
                        <h4>Company Name #1  :  --</h4>
                    </div>
                    <div className="part-1  gtc-1">
                        <button className="btn text-light">
                            <div className="flex-cs">
                                <div className="cs-status status-bg-draft"></div> Draft  <i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} />
                            </div>
                        </button>
                    </div>
                </div> 
                <div className="head-filters mob">
                    <div className="part-1 gtc-1">
                        <h4>Company Name #2  :  --</h4>
                    </div>
                    <div className="part-1  gtc-1">
                        <button className="btn text-light">
                            <div className="flex-cs">
                                <div className="cs-status status-bg-draft"></div> Draft  <i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} />
                            </div>
                        </button>
                    </div>
                </div> 
                <div className="head-filters mob">
                    <div className="part-1 gtc-1">
                        <h4>Company Name #3  :  --</h4>
                    </div>
                    <div className="part-1  gtc-1">
                        <button className="btn text-light">
                            <div className="flex-cs">
                                <div className="cs-status status-bg-active"></div> Active  <i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} />
                            </div>
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    </>
  )
}

export default ProposalCard