import CustomButton from "../../shared/Buttons/CustomButton";
import DataTable from "../Dashboard/DataTable";
import { NavLink } from "react-router-dom";
import DeleteCustomerModal from "./Helper/DeleteCustomerModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx"; // Import the xlsx library
import { formatDate } from "../../../utils/formatDate";
import { toast } from "react-toastify";
import Filter from "../../shared/Filter/Filter";

const CustomerList = () => {
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [activeFilters, setActiveFilters] = useState([]); // State for active filters
  const customerDetail = useSelector((state) => state.AdminDataSlice.customers);

  const onDelete = (customer) => {
    setSelectedCustomer(customer);
  };

  // Export customer details to an Excel file
  const handleExport = () => {
    if (!customerDetail || customerDetail.length === 0) {
      toast.alert("No customer data available to export!");
      return;
    }

    // Map customerDetail to extract only the required properties
    const formattedData = customerDetail.map((customer) => ({
      FirstName: customer?.personalDetails?.firstName || "N/A",
      CreateDate: formatDate(customer?.createDate) || "N/A",
      PropertyName: customer?.property
        ?.map((prop) => prop?.propertyName)
        .join(", ") || "N/A",
      Phone: customer?.personalDetails?.phone || "N/A",
      Email: customer?.personalDetails?.email || "N/A",
    }));

    // Convert the formatted data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    // Trigger a file download
    XLSX.writeFile(workbook, "CustomerDetails.xlsx");
  };

  // Apply filters
  const applyFilters = (filters) => {
    setActiveFilters(filters);
  };

  // Filter and sort customer data based on active filters
  const filteredCustomers = customerDetail
  ?.filter((customer) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();

    // Check both firstName and companyName for the search query
    const matchesFirstName = customer?.personalDetails?.firstName
      ?.toLowerCase()
      ?.includes(searchLower);

    const matchesCompanyName = customer?.personalDetails?.company
      ?.toLowerCase()
      ?.includes(searchLower);

    if (searchQuery && !(matchesFirstName || matchesCompanyName)) {
      return false;
    }
    return true;
  })
  ?.sort((a, b) => {
    if (activeFilters.includes("az")) {
      return (
        a.personalDetails?.firstName?.localeCompare(
          b.personalDetails?.firstName
        ) || 0
      );
    }
    if (activeFilters.includes("za")) {
      return (
        b.personalDetails?.firstName?.localeCompare(
          a.personalDetails?.firstName
        ) || 0
      );
    }
    if (activeFilters.includes("dateAsc")) {
      return new Date(a.createDate) - new Date(b.createDate);
    }
    if (activeFilters.includes("dateDesc")) {
      return new Date(b.createDate) - new Date(a.createDate);
    }
    return 0;
  });

  return (
    <>
      <section>
        <div className="container py-4">
          <div className="row">
            <div className="col-md-12">
              <div className="head-filters">
                <div className="part-1">
                  <div className="search-input">
                    <i
                      className="fa-light fa-lg fa-magnifying-glass"
                      style={{ color: "#2022248c" }}
                    ></i>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery} // Bind the input value to searchQuery state
                      onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
                    />
                  </div>
                  <button className="filter-btn bg-theme-2" data-bs-toggle="modal" data-bs-target="#filter">
                    <i
                      className="fa-light fa-lg fa-filter"
                      style={{ color: "#ffffff" }}
                    />{" "}
                    filters
                  </button>
                </div>
                <div className="part-1 gtc-equal mob">
                  <NavLink
                    to="/add-customer"
                    className="filter-btn txt-deco-none bg-theme-1"
                  >
                    <i
                      className="fa-light fa-lg fa-circle-plus"
                      style={{ color: "#ffffff" }}
                    />{" "}
                    &nbsp; Add New Customer
                  </NavLink>
                  <button
                    className="filter-btn bg-theme-2"
                    onClick={handleExport}
                  >
                    <i
                      className="fa-light fa-lg fa-download"
                      style={{ color: "#ffffff" }}
                    />
                    &nbsp; Export
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <DataTable
                  customerDetail={filteredCustomers} // Pass filtered customers to DataTable
                  onDelete={onDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteCustomerModal customerData={selectedCustomer} />
      <Filter type={"customer"} applyFilters={applyFilters} />
    </>
  );
};

export default CustomerList;
