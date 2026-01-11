import React,{useState,useEffect} from 'react'
import toastr from 'toastr';
import {BASE_URL} from '../config/config'
import Menu from './Menu';
import { useNavigate,useLocation } from 'react-router-dom';

const ProductForm = () => {
    const Navigate=useNavigate();
    const location=useLocation()
   const [product,setProduct]=useState({
        name:"",
        description:"",
        category:"",
        price:"",
        saller:"",
        rating:"",
        status:"",
    })
    const [sallers,setSallers]=useState([])
    const [productFormData,setProductFormData]=useState(new FormData())
    const handleChange=(e)=>{
        const value=['photo','photo_1','photo_2','photo_3','photo_4'].includes(e.target.name)?e.target.files[0]:e.target.value
        productFormData.set(e.target.name,value)
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const [menu,setMenu]=useState(false);
        const MenuSwitch=(data)=>{
            setMenu(!menu)
    
          }
    const submitData=()=>{
        fetch(`${BASE_URL}/product/submitproduct`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body:productFormData
        }).then(res=>res.json()).then(res=>{
            if(res.message){
                toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
                setProductFormData(new FormData())
                setProduct({
                    _id:"",
                    name:"",
        description:"",
        category:"",
        price:"",
        saller:"",
        rating:"",
        status:""
                })
                Navigate("/products")
            }
            if(res.err){
                toastr.error(res.err,"Error",{positionClass:"toast-bottom-right"})
            }else{
                console.log(res)
            }

        }).catch(err=>console.log(err))
    }
    const getSallers=()=>{
        fetch(`${BASE_URL}/product/getsallers`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }).then(res=>res.json()).then(res=>{
            if(res.message){

                setSallers(res.message)
            }
            else{
                console.log(res)
            }
        }).catch(err=>console.log(err))
    }    
    useEffect(()=>{
        getSallers();
    const data_product=location.state;
    if(data_product){
        setProduct({
        _id:data_product._id,
        name:data_product.name,
        description:data_product.description,
        category:data_product.category,
        price:data_product.price,
        saller:data_product.saller._id,
        rating:data_product.rating,
        status:data_product.status
        })
        productFormData.set("_id",data_product._id)
        productFormData.set("name",data_product.name)
        productFormData.set("description",data_product.description)
        productFormData.set("category",data_product.category)
        productFormData.set("price",data_product.price)
        productFormData.set("saller",data_product.saller._id)
        productFormData.set("rating",data_product.rating)
        productFormData.set("status",data_product.status)
    }

    },[])
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
                <h3 className='fw-bolder'>Product Form</h3>

            </div>
        </div>

    </div>
    <div className="m-3">
        <div className="container">
            <div className="row">
                <div className="card">
                    <div className="card-text p-3 fw-bolder">Product Form</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md">
                            <label className="form-label">Photo</label>
                            <input type="file" onChange={handleChange} name="photo"  className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md">
                            <label className="form-label">Photo 1</label>
                            <input type="file" onChange={handleChange} name="photo_1"  className="form-control" />
                        </div>
                        <div className="col-md">
                            <label className="form-label">Photo 2</label>
                            <input type="file" onChange={handleChange} name="photo_2"  className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-md">
                            <label className="form-label">Photo 3</label>
                            <input type="file" onChange={handleChange} name="photo_3"  className="form-control" />
                        </div>
                        <div className="col-md">
                            <label className="form-label">Photo 4</label>
                            <input type="file" onChange={handleChange} name="photo_4"  className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md">
                            <label className="form-label">Name</label>
                            <input type="text" name="name"  onChange={handleChange} value={product.name} className="form-control" />
                        </div>
                        <div className="col-md">
                            <label className="form-label">Category</label>
                            <input type="text" name="category"  onChange={handleChange} value={product.category}  className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md">
                            <label className="form-label">Price</label>
                            <input type="text" name="price"  onChange={handleChange}  value={product.price} className="form-control" />
                        </div>
                        <div className="col-md">
                            <label className="form-label">Saller</label>
                            <select onChange={handleChange}  className="form-control" value={product.saller} name="saller" >
                                <option value="">Choose a saller</option>
                                {sallers.map((s,key)=>(
                                    <option value={s._id} key={key}>{s.first_name} {s.last_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md">
                            <label className="form-label">Rating</label>
                            <input type="text" name="rating"  onChange={handleChange}  value={product.rating} className="form-control" />
                        </div>
                        <div className="col-md">
                            <label className="form-label">Status</label>
                            <select onChange={handleChange}  className="form-control" value={product.status} name="status" >
                                <option value="">Choose A Status</option>
                                <option value="In Stock">In Stock</option>
                                <option value="Out Of Stock Soon">Out Of Stock Soon</option>
                                <option value="Out Of Stock">Out Of Stock</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md">
                            <label className="form-label">Description</label>
                            <textarea type="text" name="description"  onChange={handleChange}  value={product.description} className="form-control" />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md">
                             <input type="button" value="Submit" onClick={submitData} className="btn btn-dark w-100 mt-3" />
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    </div>
</>
  )
}

export default ProductForm