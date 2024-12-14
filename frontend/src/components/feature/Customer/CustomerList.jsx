import CustomButton from "../../shared/Buttons/CustomButton"
import DataTable from "../Dashboard/DataTable"
import {NavLink} from 'react-router-dom'
import DeleteCustomerModal from "./Helper/DeleteCustomerModal"
import { useState } from "react"

const CustomerList = () => {

    const [selectedCustomer, setSelectedCustomer] = useState({})

    const onDelete = (customer) => {
        setSelectedCustomer(customer)
    }

  return (
    <>
        <section>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="head-filters">
                            <div className="part-1">
                                <div className="search-input">
                                    <i class="fa-light fa-lg fa-magnifying-glass" style={{color: '#2022248c'}}></i>
                                    <input type="text" placeholder="Search" name="" id="" />
                                </div>
                                <button className="filter-btn bg-theme-2"><i className="fa-light fa-lg fa-filter" style={{ color: "#ffffff" }} /> filters</button>
                            </div>
                            <div className="part-1 gtc-equal">
                                <NavLink to='/add-customer' className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-lg fa-circle-plus" style={{ color: "#ffffff" }} /> &nbsp; Add New Customer</NavLink>
                                <button className="filter-btn bg-theme-2"><i class="fa-light fa-lg fa-download" style={{ color: "#ffffff" }}/> &nbsp; Export</button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <DataTable onDelete={onDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <DeleteCustomerModal customerData={selectedCustomer} />
    </>
  )
}

export default CustomerList