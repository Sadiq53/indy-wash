import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { formatDate } from '../../../../utils/formatDate';
import { useEffect, useState } from "react";
import { extractCustomerDetail, extractPropertyDetail } from "../../../../utils/Extractor";

const DataTable = ({ title, onDelete, searchQuery, proposalDetail }) => { // Accept searchQuery as a prop

    const customerDetail = useSelector((state) => state.AdminDataSlice.customers) || [];
    // const proposalDetail = useSelector((state) => state.ServiceDataSlice.proposal) || [];

    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        if (proposalDetail?.length >= 0) {
            setDisplayData(proposalDetail);
        }
    }, [proposalDetail, customerDetail]);

    const filteredData = displayData.filter((proposal) => {
        const customerData = extractCustomerDetail(customerDetail, proposal);
        const propertyData = extractPropertyDetail(customerData, proposal?.property)
        const { personalDetails } = customerData;
        const { propertyName } = propertyData

        // Check if searchQuery matches name, company, or property
        return (
            personalDetails?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            personalDetails?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            personalDetails?.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||// Replace with actual company logic
            propertyName?.toLowerCase().includes(searchQuery?.toLowerCase())
        );
    });

    return (
        <div className="box-cs">
            {title && <h5 className="font-1 fw-700 font-size-16">{title}</h5>}
            <div className="custom-table py-4">
                <table>
                    <thead>
                        <tr>
                            <th>Name/Company</th>
                            <th>Property</th>
                            <th>Created Date</th>
                            <th>Proposal ID</th>
                            <th>Email Address</th>
                            <th>Status</th>
                            <th>Edits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.length > 0 ? (
                            filteredData.map((value, index) => {
                                const customerData = extractCustomerDetail(customerDetail, value);
                                const propertyData = extractPropertyDetail(customerData, value?.property)
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
                                                        <p className="text-start">{personalDetails?.company || "N/A"}</p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </td>
                                        <td>
                                            <p>{propertyData ? propertyData?.propertyName : "N/A"}</p>
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
                                        <div className="flex-cs">
                                                <div className={`cs-status status-bg-${value?.status?.type === 'draft' ? 'draft' : 'active'}`}></div>
                                                <p>{value?.status?.type || "N/A"}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-profile gap-0">
                                                <div>
                                                    <NavLink to={`/proposal-detail/${value.uniqueid}`} className="btn">
                                                        <i className="fa-solid fa-lg fa-pen" style={{ color: "#00b69b" }} />
                                                    </NavLink>
                                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#delete" onClick={() => onDelete(value)}>
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
