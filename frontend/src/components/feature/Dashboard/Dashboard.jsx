import Analytics from "./Analytics"
import DataTable from "./DataTable"
import Tags from "./Tags"
import TotalEarning from "./TotalEarning"

const Dashboard = () => {
  return (
    <>
      <section>
        <div className="container py-4">
          <div className="row">
            <div className="col-md-12">
              <Tags />

              <div className="analysis pt-4">
                <TotalEarning />
                <Analytics />
              </div>

              <div className="pt-4">
                <DataTable title={'Current Projects'} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard