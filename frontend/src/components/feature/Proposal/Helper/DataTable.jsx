import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { formatDate } from '../../../../utils/formatDate';
import { useEffect, useState } from "react";
import { handleToggleStatus } from "../../../../redux/ServiceDataSlice";
import { toggleStatus } from "../../../../services/ProposalService";

const DataTable = ({ title, onDelete }) => {

    const dispatch = useDispatch()

    // Safely extracting data from Redux store with optional chaining
    const customerDetail = useSelector((state) => state.AdminDataSlice.customers) || [];
    const proposalDetail = useSelector((state) => state.ServiceDataSlice.proposal) || [];

    const [displayData, setDisplayData] = useState([]);

    // Ensure proposalDetail is updated correctly
    useEffect(() => {
        if (proposalDetail?.length >= 0) {
            setDisplayData(proposalDetail);
        }
    }, [proposalDetail, customerDetail]);

    // Extract customer details by matching uniqueid
    const extractCustomerDetail = (proposal) => {
        if (customerDetail?.length >= 1 && proposal?.customer) {
            return customerDetail?.find(value => value.uniqueid === proposal?.customer) || {};
        }
        return {};
    };

    const changeStatus = async(status, proposalid) => {
        const dataObject = {
            status: status?.type === 'active' ? true : false,
            proposalid,
            date: Date.now()
        }
        const response = await toggleStatus(dataObject)
        if(response?.success) {
            dispatch(handleToggleStatus(dataObject))
        }
    }

    return (
        <div className="box-cs">
            {title && <h5 className="font-1 fw-700 font-size-16">{title}</h5>}
            <div className="custom-table py-4">
                <table>
                    <thead>
                        <tr>
                            <th>Name/Company</th>
                            <th>Created Date</th>
                            <th>Proposal ID</th>
                            <th>Email Address</th>
                            <th>Status</th>
                            <th>Edits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData?.length > 0 ? (
                            displayData.map((value, index) => {
                                const customerData = extractCustomerDetail(value);
                                const { personalDetails } = customerData;

                                return (
                                    <tr key={value.uniqueid || index}>
                                        <td>
                                            <NavLink className="txt-deco-none" to={`/proposal-detail/${value.uniqueid}`}>
                                                <div className="table-profile">
                                                    <div>
                                                        <img src="/assets/img/person.svg" alt="Profile" />
                                                        <p className="fw-700 text-start">{personalDetails?.firstName || "N/A"}</p>
                                                    </div>
                                                    <div>
                                                        <img src="/assets/img/location-2.svg" alt="Location" />
                                                        <p className="text-start">Best Management Company Inc</p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </td>
                                        <td>
                                            <p>{value.createDate ? formatDate(value.createDate) : "N/A"}</p>
                                        </td>
                                        <td>
                                            <p>{value.uniqueid || "N/A"}</p>
                                        </td>
                                        <td>
                                            <p>{personalDetails?.email || "N/A"}</p>
                                        </td>
                                        <td>
                                            <div className="input-section gtc-1">
                                                <select name="status" value={value?.status?.type} onChange={(event)=>changeStatus(event.target.value, value?.uniqueid)} className="width-100" id={`status-select-${value.uniqueid}`}>
                                                    <option value="draft">Draft</option>
                                                    <option value="active">Active</option>
                                                    {/* More status options */}
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-profile gap-0">
                                                <div>
                                                    <NavLink to={`/proposal-detail/${value.uniqueid}`} className="btn">
                                                        <i className="fa-solid fa-lg fa-pen" style={{ color: "#00b69b" }} />
                                                    </NavLink>
                                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#delete" onClick={()=>onDelete(value)}>
                                                        <i className="fa-regular fa-lg fa-trash-can" style={{ color: "#f93c65" }} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
