

const ServiceTagCard = () => {
  return (
    <>
        <div className="proposal-tag-cards">

            <div className="tag-card bg-theme-1 gap-cs-5">
                    <h4 className="font-1 text-center"><i class="fa-solid fa-sm fa-gear-complex" style={{color: "#fff"}} />  Service Analysis</h4>
                    <div className="inner-layout">
                    <p>259,568 SQFT Total</p>
                    <div className="form-check form-switch">
                        <input className="form-check-input cs-blue" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </div>
                    </div>
                    <div className="inner-layout">
                    <h4>Avg Cost per SQFT</h4>
                    <p>$0.13/SQFT</p>
                    </div>
            </div>

            <div className="tag-card bg-theme-2 gap-cs-5">
                    <h4 className="font-1 text-center"><i class="fa-solid fa-hand-holding-circle-dollar" style={{color: "#fff"}} />  Investment</h4>
                    <div className="inner-layout">
                    <p>$19,705.08 Annually</p>
                    <div className="form-check form-switch">
                        <input className="form-check-input cs-orange" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </div>
                    </div>
                    <div className="inner-layout">
                    <h4>Monthly Payment</h4>
                    <p>$1,642.09 PM</p>
                    </div>
            </div>

            <div className="tag-card bg-theme-3 gap-cs-5">
                    <h4 className="font-1 text-center"><i class="fa-sharp fa-regular fa-magnifying-glass-chart" style={{color: "#fff"}} />  Per Door Analysis</h4>
                    <div className="inner-layout">
                    <p>275 Units</p>
                    <div className="form-check form-switch">
                        <input className="form-check-input cs-yellow" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </div>
                    </div>
                    <div className="inner-layout">
                    <h4>Per Door Investment</h4>
                    <p>$1.55 / Unit PM</p>
                    </div>
            </div>

        </div>
    </>
  )
}

export default ServiceTagCard