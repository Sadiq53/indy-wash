
const Tags = () => {
  return (
    <>
        <div className="dashboard-tags-layout">
            <div className="tag-card bg-theme-1">
                <h4 className="font-2">Number Of 
                Customers</h4>
                <div className="tag-circle bg-theme-4">
                  <span className="font-2 font-size-35">38</span>
                </div>
            </div>
            <div className="tag-card bg-theme-2">
                <h4 className="font-2">Number of 
                Pending Proposals </h4>
                <div className="tag-circle bg-theme-5">
                  <span className="font-2 font-size-35">18</span>
                </div>
            </div>
            <div className="tag-card bg-theme-3">
                <h4 className="font-2">Number Of 
                Active Proposal</h4>
                <div className="tag-circle bg-theme-6">
                  <span className="font-2 font-size-35">08</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Tags