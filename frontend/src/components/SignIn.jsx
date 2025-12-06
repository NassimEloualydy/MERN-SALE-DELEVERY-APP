import Menu from './Menu';
import React,{useState} from 'react'
import toastr from 'toastr';
import {BASE_URL} from '../config/config'
const SignIn = () => {
const [menu,setMenu]=useState(false);
    const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
      const [user,setUser]=useState({
        first_name:"",
        last_name:"",
        phone:"",
        email:"",
        pw:""
      })
      const [userFormData,setUserFormData]=useState(new FormData())

      const handlechange=(e)=>{
        const value=e.target.name=="photo"?e.target.files[0]:e.target.value
        userFormData.set(e.target.name,value)
        setUser({...user,[e.target.name]:value})
      }
      const submit=()=>{
        fetch(`${BASE_URL}/user/signInUser`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                // 'Content-Type':'application/json',

            },
            body:userFormData
        }).then(res=>res.json()).then(res=>{
            if(res.message){
                toastr.success(res.message,"success",{positionClass:"toast-bottom-right"})
                setUserFormData(new FormData())
                setUser({
        first_name:"",
        last_name:"",
        phone:"",
        email:"",
        pw:""
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
                <h3 className='fw-bolder'>Sign In</h3>

            </div>
        </div>

    </div>
    <section className="m-3">
        <div className="container">
            <div className="row">
                <div className="card col-md-6 mx-auto">
                    <div className="card-body">
                        <div className="card-title fw-bolder" >Sign in Form</div>
                        <hr />
                        <form action="">
                            <div className="row col-md mt-2">
                                <div className="form-label">Photo</div>
                                <input type="file" name="photo"  onChange={handlechange} className="form-control" />
                            </div>

                            <div className="row col-md mt-2">
                                <div className="form-label">First Name</div>
                                <input type="text" name="first_name" value={user.first_name} onChange={handlechange} className="form-control" />
                            </div>
                            <div className="row col-md mt-2">
                                <div className="form-label">Last Name</div>
                                <input type="text" name="last_name" value={user.last_name} onChange={handlechange} className="form-control" />
                            </div>
                            <div className="row col-md mt-2">
                                <div className="form-label">Phone</div>
                                <input type="text" name="phone" value={user.phone} onChange={handlechange} className="form-control" />
                            </div>

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

export default SignIn