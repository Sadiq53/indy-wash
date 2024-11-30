import Sidebar from '../components/shared/Sidebar/Sidebar'
import Header from '../components/shared/Header/Header'
import {Outlet} from 'react-router-dom'

const AdminModule = () => {
  return (
    <>
        <main className="the-main-grid">
            <Sidebar />
            <section>
                <Header />
                <Outlet />
            </section>
        </main>
    </>
  )
}

export default AdminModule