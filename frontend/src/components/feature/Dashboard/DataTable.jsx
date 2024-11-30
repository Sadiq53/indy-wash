
const DataTable = ({title}) => {
  return (
    <>
        <div className="box-cs px-5">
            {
                title && (<h5 className="font-1 fw-700 font-size-16">{title}</h5>)
            }
            <div className="custom-table py-4">
                <table>
                    <thead>
                        <tr>
                            <th>Name/Company</th>
                            <th>Created Date</th>
                            <th>Property</th>
                            <th>Phone No.</th>
                            <th>Email Address</th>
                            <th>Edits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="table-profile">
                                    <div>
                                        <img src="/assets/img/person.svg" alt="" />
                                        <p className="fw-700">Adnan Venc.</p>
                                    </div>
                                    <div>
                                        <img src="/assets/img/location-2.svg" alt="" />
                                        <p>Best Management Company Inc</p>
                                    </div>
                                </div>
                            </td>
                            <td><p>12 Dec 2023</p></td>
                            <td><p>Best Management Property</p></td>
                            <td><p>765-555-2444</p></td>
                            <td><p>testcustomer@gmail.com</p></td>
                            <td>
                                <div className="table-profile">
                                    <div className="gap-0">
                                        <button className="btn"><i className="fa-solid fa-lg fa-pen" style={{ color: "#00b69b" }} /></button>
                                        <button className="btn"><i className="fa-regular fa-lg fa-trash-can" style={{ color: "#f93c65" }} /></button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default DataTable