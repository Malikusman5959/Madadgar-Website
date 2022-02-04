import './../style/userlist.css'

import AdminTopbar from "./AdminTopbar";
import Sidebar from './SideNavBar';

export default function UserList() {


  return (
      <>
      <AdminTopbar />
       
       <div className="cont" style={{fontSize:'14px', display:'flex', flex:'1', marginTop: '10px'}}>
           <Sidebar />
          
           <div className="userList" style={{fontSize:'14px', flex:'4'}}>
     
    </div>
           
           </div>
        

    
   
    </>
  );
}