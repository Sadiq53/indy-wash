import { NavLink } from 'react-router-dom'
import DataTable from './Helper/DataTable'
import { useState } from 'react'
import DeleteProposalModal from './Helper/DeleteProposalModal'

const Proposal = () => {

    const [selectedProposal, setSelectedProposal] = useState({})

    const onDelete = (proposal) => {
        setSelectedProposal(proposal)
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
                                <NavLink to='/add-proposal' className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-lg fa-circle-plus" style={{ color: "#ffffff" }} /> &nbsp; Add New Proposal</NavLink>
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
        <DeleteProposalModal proposalData={selectedProposal} />
    </>
  )
}

export default Proposal