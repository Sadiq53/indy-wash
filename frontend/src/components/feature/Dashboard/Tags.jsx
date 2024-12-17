const Tags = ({ customerData, proposalData }) => {
  // Count draft and active proposals
  const proposalStatusCount = proposalData.reduce(
    (acc, proposal) => {
      if (proposal.status?.type === 'draft') {
        acc.draft += 1;
      } else if (proposal.status?.type === 'active') {
        acc.active += 1;
      }
      return acc;
    },
    { draft: 0, active: 0 } // Initial counts for both status types
  );

  return (
    <>
      <div className="dashboard-tags-layout">
        <div className="tag-card bg-theme-1">
          <h4 className="font-2">Number Of Customers</h4>
          <div className="tag-circle bg-theme-4">
            <span className="font-2 font-size-35">{customerData?.length}</span>
          </div>
        </div>
        <div className="tag-card bg-theme-2">
          <h4 className="font-2">Number of Pending Proposals</h4>
          <div className="tag-circle bg-theme-5">
            <span className="font-2 font-size-35">
              {proposalStatusCount.draft}
            </span>
          </div>
        </div>
        <div className="tag-card bg-theme-3">
          <h4 className="font-2">Number Of Active Proposals</h4>
          <div className="tag-circle bg-theme-6">
            <span className="font-2 font-size-35">
              {proposalStatusCount.active}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;
