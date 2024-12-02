
const CompanyDetailRepeater = () => {
  return (
    <>
        <div className="content-layout mt-4">
            <div className="head-filters">
                <div className="part-1">
                    <h4 className="font-1 fw-700">Company Details</h4>
                </div>
                <div className="part-1  gtc-1">
                    <button className="btn edit-btn"><i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} /></button>
                </div>
            </div> 

            <div className="data py-4">
                <div><p className="font-3">Company Name</p> : <p className="font-3">Company Name</p></div>
                <div><p className="font-3">Billing Address</p> : <p className="font-3">Billing Address</p></div>
                <div><p className="font-3">Email Address</p> : <p className="font-3">Email Address</p></div>
                <div><p className="font-3">Phone No.</p> : <p className="font-3">Phone No.</p></div>
            </div>
        </div>
    </>
  )
}

export default CompanyDetailRepeater