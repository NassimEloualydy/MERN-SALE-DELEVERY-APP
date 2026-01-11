import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import {BASE_URL} from '../config/config'
import Menu from './Menu';
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "@coreui/coreui-pro/dist/css/coreui.min.css";

import { Navigation,Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { CCol, CRow } from '@coreui/react'
import { CDateRangePicker } from '@coreui/react-pro'
const Products = () => {
    SwiperCore.use([Autoplay]);
    const [products,setProducts]=useState([])
    const Navigate=useNavigate()
    const [menu,setMenu]=useState(false);
    const [categories,setCategories]=useState([])
    const productDetails=(data)=>{
      Navigate("/productDetails",{state:data})
    }
    const [product,setProduct]=useState({
        name:"",
        description:"",
        category:"",
        price:"",
        first_name_saller:"",
        last_name_saller:"",
        rating:"",
        status:""
    })
    const deleteData=(data)=>{

      fetch(`${BASE_URL}/product/deleteProduct/${data}`,{
        method:"POST",
        headers:{
          "Accept":"appliction/json",
          "Content-Type":"application/json",
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
      }).then(res=>res.json()).then(res=>{
        if(res.message){
          toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
          getData()
        }else{
          console.log(res)
        }

      }).catch(err=>console.log(err))
    }
const loadData=(data)=>{
    Navigate("/productform",{state:data})
}
    const getData=()=>{
        fetch(`${BASE_URL}/product/getdata`,{
            method:"POST",
            headers:{
                "Accept":"application/josn",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body:JSON.stringify(product)
        }).then(res=>res.json()).then(res=>{
            if(res.data){
                var categ=[]
                var d_c=[]
                for(var i=0;i<res.data.length;i++){
                    if(!d_c.includes(res.data[i].category))
                        categ.push({name:res.data[i].category})
                        d_c.push(res.data[i].category)
                }
                console.log(categ)
                setCategories(categ)
                setProducts(res.data)
            }else{
                console.log(res)
            }
        }).catch(err=>console.log(err))
    }
    const handleChange=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
        const MenuSwitch=(data)=>{
            setMenu(!menu)
    
          }
    useEffect(()=>{
        getData()
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
                <h3 className='fw-bolder'>Products</h3>
 <div className="container">
            <form action="">
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="name" onChange={handleChange} value={product.name}    placeholder='Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="category" onChange={handleChange} value={product.category}    placeholder='Category' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="description" onChange={handleChange} value={product.description}    placeholder='Description' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="price" onChange={handleChange} value={product.price}   placeholder='Price' className="form-control" /></div>
                  
                </div>
                <row className="text-center">
                  {/* <CRow>
      <CCol className="mb-3" sm={7}>
        <CDateRangePicker locale="en-US" timepicker 
         onStartDateChange={(date) => console.log(date)}
          onEndDateChange={(date) => console.log(date)}
        />
      </CCol>

    </CRow> */}
                </row>
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="rating" onChange={handleChange} value={product.rating}   placeholder='Rating' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="status" onChange={handleChange} value={product.status}   placeholder='Status' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="first_name_saller" onChange={handleChange} value={product.first_name_saller}   placeholder='Saller First Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="last_name_saller" onChange={handleChange} value={product.last_name_saller}   placeholder='Saller Last Name' className="form-control" /></div>
                </div>

                <div className="row text-center">
                    <div className="col-md mt-2">
                        <input type="button" value="Search" onClick={getData}  className="btn btn-dark w-100" />
                    </div>
                </div>
            </form>
        </div>
            </div>
        </div>

    </div>
    <section className="m-3">
        <div className="container">
                <input type="button" value="New" className="btn btn-dark" onClick={()=>{Navigate('/productform')}} />
                    </div>
    </section>
    <section className='container'>
    {categories.map((item,index)=>(
        <>
        <p className="fw-bolder" key={index}>{item.name}</p>
            <section className='mb-2'>
        <Swiper
                className='swiperCutomSize'
 
// install Swiper modules
modules={[Navigation, Pagination, Scrollbar, A11y]}
spaceBetween={50}
slidesPerView={4}
// navigation
pagination={{ clickable: true }}
// scrollbar={{ draggable: true }}
onSwiper={(swiper) => console.log(swiper)}
// loop
autoplay={{
delay:3000,
disableOnInteraction: false
}}
breakpoints={{
"@0.00": {
slidesPerView: 1,
//        spaceBetween: 10,
},
"@0.75": {
slidesPerView: 1,
//      spaceBetween: 10,
},
"@1.00": {
slidesPerView: 1,
//    spaceBetween: 40,
},
"@1.50": {
slidesPerView: 4,
//  spaceBetween: 50,
},
}}
>

        {products.map((product,key)=>(
            <>
            {
            (item.name==product.category) && (
            <SwiperSlide className='col-md-3 col-lg-3' key={key}>
                <div className="card p-3" style={{position:"relative"}}>
                  <span style={{position: "absolute", top: "2px",right: "5px",paddingBottom:"0px"}} onClick={deleteData.bind(this,product._id)} className="Icon Icon_delete">
                            <ion-icon   name="trash-outline"></ion-icon>
                    </span>
                    <span style={{position: "absolute", top: "2px",right: "35px",paddingBottom:"0px"}} data-bs-toggle="modal" data-bs-target="#modelForm" onClick={loadData.bind(this,product)} className="Icon Icon_update">
                            <ion-icon   name="pencil-outline"></ion-icon>
                    </span>
                    
                  {product.status == "In Stock" && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          paddingBottom: "0px",
                          backgroundColor: "#2a9d8f",
                        }}
                        className="badge pb-1"
                      >
                        {product.status}
                      </span>
                    </>
                  )}
                  {product.status == "Out Of Stock Soon" && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          paddingBottom: "0px",
                          backgroundColor: "#f4a261",
                        }}
                        className="badge pb-1"
                      >
                        {product.status}
                      </span>
                    </>
                  )}
                  {product.status == "Out Of Stock" && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          paddingBottom: "0px",
                          backgroundColor: "#e76f51",
                        }}
                        className="badge pb-1"
                      >
                        {product.status}
                      </span>
                    </>
                  )}

                <img 
                    src={`${BASE_URL}/product/getPhotoImage/main/${product._id}`}
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                    onClick={productDetails.bind(this,product)}
                  />

                    <div className="card-title fw-bolder text-center">
                        {product.name}<br/> 
                          {(product.rating==1) && (
                            <ion-icon name="star" className="icon_stare"></ion-icon>
                          )}
                          {(product.rating==2) && (
                            <>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                            </>
                          )}
                          {(product.rating==3) && (
                            <>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                            </>
                          )}
                         {(product.rating==4) && (
                            <>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                            </>
                          )}
                        {(product.rating==5) && (
                            <>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                            </>
                          )}

 
                        <hr />
                    </div>
                <div className="card-text text-center">
                    <div className="text-start">
                        <div className="row py-2 p-3">
                            <div className=""><span className='fw-bolder'>Price : </span>{product.price} MAD</div><br/>
                            <div className=""><span className='fw-bolder'>Saller : </span> {product.saller.first_name} {product.saller.last_name}</div>

                        </div>
    
                    </div>
                </div>
                </div>
            </SwiperSlide>
            )
            }

            </>


))}
            <br />
            <br />
        </Swiper>
    </section>
        </>
    ))}

        </section>
</>
  )
}

export default Products