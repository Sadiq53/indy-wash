import { useState } from "react"
import DeleteCustomerModal from "../Customer/Helper/DeleteCustomerModal"
import Analytics from "./Analytics"
import DataTable from "./DataTable"
import Tags from "./Tags"
import TotalEarning from "./TotalEarning"

const Dashboard = () => {

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
              <Tags />

              <div className="analysis pt-4">
                <TotalEarning />
                <Analytics />
              </div>

              {/* <div className="pt-4">
                
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="pt-4">
              <DataTable onDelete={onDelete} title={'Current Projects'} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteCustomerModal customerData={selectedCustomer} />
    </>
  )
}

export default Dashboard