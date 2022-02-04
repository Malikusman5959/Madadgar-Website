import React from 'react'
import AdminTopbar from './AdminTopbar'
import Sidebar from './SideNavBar'
import AdminHomePage from './AdminHomePage'




export default function AdminPanel() {
    return (
       
        <div >
        <AdminTopbar />
       
        <div className="cont" style={{fontSize:'14px', display:'flex', flex:'1', marginTop: '10px'}}>
            <Sidebar />
            <div className='others' style={{fontSize:'14px', flex:'4'}} > 
            <AdminHomePage />
            </div>
            <div style={{fontSize:'14px', flex:'1'}} > 
            </div>
         
        </div>

        </div>
        
          
             
    
    )
}
