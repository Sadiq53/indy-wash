import { NavLink, useLocation } from "react-router-dom"

const Header = () => {

    const location = useLocation(); 

    const breadCrumbConverter = {
        '/' : 'Dashboard',
        '/customer-list' : '<< Customer List',
        '/customer-detail' : '<< Customer List',
        '/proposal' : '<< Proposal',
        '/add-proposal' : '<< Add Proposal',
        '/proposal-detail' : '<< Proposal',
        '/services' : '<< Services',
        '/add-service' : '<< Add Service',
    }

  return (
    <>
        <header className="background-white">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-header">
                            <NavLink className='text-decoration-none desk-show' to='/'>
                                <h4 className="font-1">{breadCrumbConverter[location?.pathname]}</h4>
                            </NavLink>
                            <button onClick={()=>document.getElementById('cs-sidebar').classList.add("show-sidebar")} className="btn mob-show">
                            <i class="fa-regular fa-lg fa-bars" />
                            </button>
                            <div className="head-section">
                                <div className="bell">
                                    <button className={`btn ${window.innerWidth > 767 ? '' : 'btn-sm'}`}><img src="/assets/img/bell.svg" alt="" /></button>
                                </div>
                                <button className={`btn ${window.innerWidth > 767 ? '' : 'btn-sm'}`}>
                                <div className="profile-btn">
                                    <div className="profile">
                                        <img src="/assets/img/head-profile.svg" alt="" />
                                    </div>
                                    <div className="name">
                                        <h5>Moni Roy</h5>
                                        <small>Admin</small>
                                    </div>
                                    <div className="arrow">
                                        <img src="/assets/img/head-arrow.svg" alt="" />
                                    </div>
                                </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header