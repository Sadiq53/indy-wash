
const CompanyDetailRepeater = ({ data }) => {
  return (
    <>
        {
            data?.map((value, index) => {
                return (
                    <div key={index} className="content-layout mt-4">
                        <div className="head-filters mob">
                            <div className="part-1">
                                <h4 className="font-1 fw-700">Company Detail {index + 1}</h4>
                            </div>
                            <div className="part-1  gtc-1">
                                <button className="btn edit-btn"><i className="fa-solid  fa-sm fa-pen" style={{ color: "#fff" }} /></button>
                            </div>
                        </div> 

                        <div className="data py-4">
                            <div><p className="font-3">Company Name</p> : <p className="font-3">{value.companyName}</p></div>
                            <div><p className="font-3">Billing Address</p> : <p className="font-3">{value.billingAddress}</p></div>
                            <div><p className="font-3">Service Address</p> : <p className="font-3">{value.serviceAddress}</p></div>
                            <div><p className="font-3">Property Type</p> : {value.propertyType?.map(item=><p className="font-3">{item}</p>)}</div>
                            <div><p className="font-3">Property Features</p> : {value.propertyFeatures?.map(item=><p className="font-3">{item}</p>)}</div>
                        </div>
                    </div>
                )
            })
        }
    </>
  )
}

export default CompanyDetailRepeater