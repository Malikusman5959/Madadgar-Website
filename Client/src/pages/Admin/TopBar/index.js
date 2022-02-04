import React from 'react'


function TopBar({heading , searchKey , setsearchKey}) {


    return (
        <div style={{  width : '100%' , height : '80px' , display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center'}}>
           
            <div style={{marginLeft : '35%' , display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center'}}>
            <img style={{height : '40px' , marginRight : '10px'}} src={heading.icon}/>
            <p style={{color : '#2575c0' , fontSize : '30px' , fontWeight : 'bold' , letterSpacing : '3px'}}> {heading.name.toUpperCase()} </p>
            </div>

              {/* Selectors */}
               { heading.name == 'Dashboard' ? null : <div style={{marginRight : '15px', display: "flex", flexDirection: "row"  }}>
               <input style={{ width: '180px', marginRight: '5px', border: '2px solid #2575c0' , marginTop: "0" }} type="text" value={searchKey} onChange={(e) => { setsearchKey(e.target.value) }} />
                    <button style={{height : '32px', marginRight:'15px',fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', width: '70px', backgroundColor: '#2575c0', border: '2px solid #2575c0' }} type="button" onClick={() => { console.log(true) }}> Search </button>
               </div>   }  

        </div>
    )
}

export default TopBar
