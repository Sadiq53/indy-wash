
const AgreedModal = ({onConfirmation}) => {


    

  return (
    <>
        <div className="cs-modal ">
            <div className="layout position-rel">
                <img src="/assets/img/right.svg" alt="" />
                <h4 className="font-1 mt-5 text-center fw-700">Are you sure to agreed this proposal?</h4>
                <div className="grid-cs mt-3 gtc-equal">
                    <button onClick={onConfirmation} className="filter-btn bg-theme-2"><i class="fa-regular fa-arrows-rotate-reverse fa-lg" style={{ color: "#ffffff" }} /> &nbsp; No Cancel It</button>
                    <button onClick={onConfirmation}  className="filter-btn txt-deco-none bg-theme-1"><i class="fa-light fa-circle-check fa-lg" style={{ color: "#ffffff" }} /> &nbsp; Yes Agreed !!</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AgreedModal