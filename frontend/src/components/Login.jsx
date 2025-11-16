import Menu from './Menu';
import React,{useState} from 'react'
import toastr from 'toastr';
import {BASE_URL} from '../config/config'
const Login = () => {
const [menu,setMenu]=useState(false);
    const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
      const [user,setUser]=useState({
        email:"",
        pw:""
      })
      const handlechange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
      }
      const submit=()=>{
        fetch(`${BASE_URL}/user/login`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',

            },
            body:JSON.stringify(user)
        }).then(res=>res.json()).then(res=>{
            if(res.token){
                toastr.success("User login with success","success",{positionClass:"toast-bottom-right"})
                const data={token:res.token,first_name:res.user.first_name,last_name:res.user.last_name,_id:res.user._id,email:res.user.email,phone:res.user.phone}
                localStorage.setItem('user',JSON.stringify(data))
                setUser({
                    email:"",pw:""
                })
            }else{
                toastr.error(res.err,"error",{positionClass:"toast-bottom-right"})
               
            }
        }).catch(err=>console.log(err))
      }
  return (
    <>
    
                <div className={menu?"menu":"hide_menu"}>
              <span onClick={MenuSwitch.bind(this,false)} className="close_menu">
              {/* <ion-icon name="close-outline"></ion-icon> */}
              </span>
              <br />
              <br />
              <Menu/>
              <span className="iconmenu" onClick={MenuSwitch.bind(this,true)}>

<ion-icon name="menu-outline"></ion-icon>
    </span>

        </div>
        <div className="headerSearchInfo">
        <br />
        <br />
        <div className="container border border-white text-light pb-3 rounded-3">
            <div className="p-2">
                <h3 className='fw-bolder'>Login Form</h3>

            </div>
        </div>

    </div>
    <section className="m-3">
        <div className="container">
            <div className="row">
                <div className="card col-md-6 mx-auto">
                    <div className="card-body">
                        <div className="card-title fw-bolder" >Login Form</div>
                        <hr />
                        <form action="">
                            <div className="row col-md mt-2">
                                <div className="form-label">Email</div>
                                <input type="text" name="email" value={user.email} onChange={handlechange} className="form-control" />
                            </div>
                            <div className="row col-md mt-2">
                                <div className="form-label">Password</div>
                                <input type="text" name="pw" value={user.pw} onChange={handlechange} className="form-control" />
                            </div>
                            <div className="row col-md mt-2">
                                <input type="button" onClick={submit} value="Submit" className="btn btn-dark text-white" /></div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login