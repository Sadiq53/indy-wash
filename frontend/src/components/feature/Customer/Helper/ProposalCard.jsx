
const ProposalCard = () => {
  return (
    <>
        <div className="proposal-card">
            <div className="head-filters mob">
                <h4 className="font-1 text-light fw-700">Proposal Details</h4>
            </div>
            <div className="body cs my-4">
                <img src="/assets/img/exclm.svg" alt="" />
                <h4 className="font-1 text-light fw-700">No Proposal Found !!</h4>
            </div>
            {/* <div className="body">
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
            </div> */}
        </div>
    </>
  )
}

export default ProposalCard