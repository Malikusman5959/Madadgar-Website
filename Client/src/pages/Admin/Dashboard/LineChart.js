import React , {useState} from 'react'
import {Line} from 'react-chartjs-2'

function LineChart() {


    const [data, setdata] = useState({
        labels : [ 'May' , 'June' , 'July' , 'August' , 'September' , 'October'],
        datasets : [
            {
                label : 'Helpers',
                data : [10 , 8 , 21 , 12 , 15 , 21],
                borderColor: '#2575c0',
                backgroundColor: '#2575c0',
            },
            {
                label : 'Customers',
                data : [30 , 41 , 56 , 28 , 40 , 43],
                borderColor: '#99cc00',
                backgroundColor: '#99cc00',
            }
        ]
    })

    return (
        <Line data={data} />
    )
}

export default LineChart
