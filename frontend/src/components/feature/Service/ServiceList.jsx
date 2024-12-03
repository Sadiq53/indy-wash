import { NavLink } from "react-router-dom"
import DataTable from "../Dashboard/DataTable"

const ServiceList = () => {
  return (
    <>
        <section>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="head-filters">
                            <div className="part-1">
                                <h4 className="font-1 fw-700">Service Saved</h4>
                            </div>
                            <div className="part-1 gtc-1">
                                <NavLink to='/add-service' className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-lg fa-circle-plus" style={{ color: "#ffffff" }} /> &nbsp; Create New Service</NavLink>
                            </div>
                        </div>

                        <div className="pt-4">
                            <DataTable />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default ServiceList