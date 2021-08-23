import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import FriendsHint from '../Profil/FriendsHint'


function Searchauto() {
    const [users,setUsers] =useState([])
    const [loading,setLoading] =useState(false)
    const [searchuser, setSearchuser] = useState('')


    useEffect(() => {
     const loadUsers = async()=>{
         setLoading (true);
         const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/`)
         setUsers(response.data)
         setLoading (false);
     }
     loadUsers();
    }, [])

    return (
     
        <div>
               
            <input type ="text" onChange = {(e)=>setSearchuser(e.target.value)}/>
           {loading ? (<i class="fas fa-truck-loading    "></i>) :(
               users.filter( (value)=>{
                   if (searchuser === "") {
                       return <div > <FriendsHint /> </div>
                       ;
                   } else if( value.pseudo.toLowerCase().includes(searchuser.toLowerCase())
                   ) {
                       return  value ;
                   }
            }  ).map((item)=> <h5 key= {item._id} >  {item.pseudo}</h5>)
           )  }

        </div>
        
    )
}

export default Searchauto
