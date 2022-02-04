import React , {useState} from 'react'
import {Bar} from 'react-chartjs-2'

function BarChart() {




    const [data, setdata] = useState({
        labels : [ 'May' , 'June' , 'July' , 'August' , 'September' , 'October'],
        datasets : [
            {
                label : 'Active',
                data : [5 , 8 , 9 , 12 , 7 , 14],
                borderColor: '#2575c0',
                backgroundColor: '#2575c0',
            },
            {
                label : 'Finished',
                data : [2 , 5 , 3 , 6 , 3 , 9],
                borderColor: '#99cc00',
                backgroundColor: '#99cc00',
            }
        ]
    })


    return (
        <Bar data={data}/>
    )
}

export default BarChart
