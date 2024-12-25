import { useEffect, useState } from "react"
import { getSumOfTotalCostYearly } from '../../../utils/ArithematicCalculation'

const TotalEarning = ({ proposalData, serviceData }) => {

    const [totalEarning, setTotalEarning] = useState(null)

    useEffect(()=>{
        if(proposalData?.length >= 1) {
            const extractServiceIds = proposalData?.filter(value => value.status?.type !== "draft")?.map(value => value.service)?.flat()
            const extractServiceData = serviceData?.filter(value => extractServiceIds?.includes(value.uniqueid))
            const totalOverallAmount = getSumOfTotalCostYearly(extractServiceData)
            setTotalEarning(totalOverallAmount)
        }
    }, [proposalData, serviceData])

  return (
    <>
        <div className="box-cs">
            <h5 className="font-1 fw-700 font-size-16">Total Earnings</h5>
            <div className="layout mob-lay">
                <div>
                    <h3 className="font-1 fw-500 font-size-35">${totalEarning}</h3>
                    <p className="font-size-16 font-1">Total Yearly Income</p>
                </div>
                <div className="line"></div>
                <div>
                    <h3 className="font-1 fw-500 font-size-35">${(totalEarning / 12).toFixed(2)}</h3>
                    <p className="font-size-16 font-1">Total Monthly Income</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default TotalEarning