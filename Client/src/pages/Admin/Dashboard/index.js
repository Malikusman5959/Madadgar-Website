import React , {useState , useEffect} from 'react'
import TopBar from '../TopBar'
import BarChart from './BarChart'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'
import Numerics from './Numerics'




function index({ tab }) {

    

    return (
        <div style={{ width: '100%', height: '100%' }}>

            <TopBar heading={tab} />

            {/* Body */}
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50%', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Numerics/>
                <div style={{ height: '230px', width: '200px', backgroundColor: '#ffffff' , paddingTop : '25px' }}>
                    {/* <p style={{color : '#2575c0' , fontSize : '20px' , fontWeight : 'bold' , letterSpacing : '1px' , margin : 0 , textAlign : 'center'}}> Users </p> */}
                    <DoughnutChart />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '60%', justifyContent: 'space-around' }}>
                <div style={{ height: '280px', width: '500px', backgroundColor: '#ffffff' }}>
                    <LineChart />
                    <br/>
                    <p style={{ color : '#2575c0' , fontSize : '15px' , fontWeight : 'bold' , letterSpacing : '1px' , margin : 0 , textAlign : 'center'}}> PAST MONTH RECRUITEMENTS</p>

                </div>
                <div style={{ height: '280px', width: '500px', backgroundColor: '#ffffff' }}>
                    <BarChart />
                    <br/>
                    <p style={{ color : '#2575c0' , fontSize : '15px' , fontWeight : 'bold' , letterSpacing : '1px' , margin : 0 , textAlign : 'center'}}> PAST MONTH JOBS</p>
                </div>
            </div>

        </div>
    )
}

export default index
