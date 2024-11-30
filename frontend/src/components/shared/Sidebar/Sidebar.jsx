import { useEffect, useState } from 'react'
import {NavLink, useLocation} from 'react-router-dom'

const Sidebar = () => {

    const location = useLocation()
    const [active, setActive] = useState('/')

    useEffect(()=>{
        setActive(location.pathname)
    }, [location])

  return (
    <>
        <aside className="background-white">
                <div className="sidebar">
                <NavLink to='/'>
                    <div className="logo">
                        <img src="assets/img/logo.svg" />
                    </div>
                </NavLink>
                <div className="menu">
                    <ul>
                    <li className={active === '/' && 'active'}>
                        <NavLink to="/">
                        <img src="assets/img/m-1.svg" />
                        Dashboard
                        </NavLink>
                    </li>
                    <li className={active === '/customer-list' && 'active'}>
                        <NavLink to="/customer-list">
                        <img src="assets/img/list.png" />
                        Customer List
                        </NavLink>
                    </li>
                    <li className={active === '/proposal' && 'active'}>
                        <NavLink to="/proposal">
                        <img src="assets/img/file.svg" />
                        Proposal
                        </NavLink>
                    </li>
                    <li className={active === '/services' && 'active'}>
                        <NavLink to="/services">
                        <img src="assets/img/service.svg" />
                        Services
                        </NavLink>
                    </li>
                    <li className={active === '/schedule' && 'active'}>
                        <NavLink to="/schedule">
                        <img src="assets/img/schedule.svg" />
                        Schedule
                        </NavLink>
                    </li>
                    <li className={active === '/active-overview' && 'active'}>
                        <NavLink to="/active-overview">
                        <img src="assets/img/active.svg" />
                        Active Overview
                        </NavLink>
                    </li>
                    </ul>
                    <ul className="other-menu">
                    <li className={active === '/settings' && 'active'}>
                        <NavLink to="/settings">
                        <img src="assets/img/setting.svg" />
                        Settings
                        </NavLink>
                    </li>
                    <li className={active === '/profile' && 'active'}>
                        <NavLink to="/profile">
                        <img src="assets/img/profile.svg" />
                        My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="logout">
                        <img src="assets/img/logout.svg" />
                        Logout
                        </NavLink>
                    </li>
                    </ul>
                </div>
                </div>
            </aside>

    </>
  )
}

export default Sidebar