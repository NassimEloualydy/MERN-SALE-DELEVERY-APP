import Menu from './Menu';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation,Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

const ProductDetails = () => {
        SwiperCore.use([Autoplay]);

const [menu,setMenu]=useState(false);
const [relatedProducts,setRelatedProducts]=useState([])
const Navigate=useNavigate()
    const productShowDetails=(data)=>{
        
      Navigate("/productDetails",{state:data})
    }
const [photoSelected,setPhotoSelected]=useState("main")
    const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
          const location=useLocation()
      
    const [product,setProduct]=useState({
    })
    const getRelatedProducts=()=>{
    
        fetch(`${BASE_URL}/product/getdata`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body:JSON.stringify({
        name:"",
        description:"",
        category:location.state.category,
        price:"",
        first_name_saller:"",
        last_name_saller:"",
        rating:"",
        status:""

            })
        }).then(res=>res.json()).then(res=>{
            if(res.data){
                setRelatedProducts(res.data)
            }
        }).catch(err=>console.log(err))

    }
    
    useEffect(()=>{
        setProduct(location.state)
        getRelatedProducts()
        console.log(relatedProducts)
        
    },[location.state])
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
                <h3 className='fw-bolder'>{product.name}</h3>

            </div>
        </div>

    </div>
        <section className='m-3'>
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card m-3 p-2">
                            <div className="row">

                            <div className="card-title col-md-5">
                                             <img 
                                                 src={`${BASE_URL}/product/getPhotoImage/${photoSelected}/${product._id}`}
                                                 alt=""
                                                 className="card-img-top img-main img-fluid imgProduct"
                                                 />
                                
                            </div>
                            <div className="col-md-6">
                                <div className="card-title text-center">
                                    <h5 className=''>{product.name} , {product.description}</h5>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12  fw-bolder" style={{fontSize:"25px"}}>
                                            {product.price}
                                        </div>
                                        <div className="col-md-6 col-sm-12">
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
                          {/* &nbsp;
                            Reviews */}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row" style={{justifyContent:"space-between",alignItems:"center"}}>
                                    <div  onClick={()=>{setPhotoSelected("main")}} className={`col-md-2 col-sm-2 ${photoSelected==='main'?"photo-selected":""}`}>
                                                        <img 
                    src={`${BASE_URL}/product/getPhotoImage/main/${product._id}`}
                    alt=""
                    className={`card-img-top img-main img-fluid`}
                    style={{height:"80px",objectFit:"contain"}}
                  />

                                    </div>

                                    <div  onClick={()=>{setPhotoSelected("photo_1")}} className={`col-md-2 col-sm-2 ${photoSelected==='photo_1'?"photo-selected":""}`}>                                              <img 
                                                            src={`${BASE_URL}/product/getPhotoImage/photo_1/${product._id}`}
                                                            alt=""
                                                            className={`card-img-top img-main img-fluid`}
                                                            style={{height:"80px",objectFit:"contain"}}
                                                          />
                                        
                                    </div>

                                    <div  onClick={()=>{setPhotoSelected("photo_2")}} className={`col-md-2 col-sm-2 ${photoSelected==='photo_2'?"photo-selected":""}`}>
                                                        <img 
                    src={`${BASE_URL}/product/getPhotoImage/photo_2/${product._id}`}
                    alt=""
                    className={`card-img-top img-main img-fluid`}
                    style={{height:"80px",objectFit:"contain"}}
                  />

                                    </div>
                                    <div  onClick={()=>{setPhotoSelected("photo_3")}} className={`col-md-2 col-sm-2 ${photoSelected==='photo_3'?"photo-selected":""}`}>
                                                        <img 
                    src={`${BASE_URL}/product/getPhotoImage/photo_3/${product._id}`}
                    alt=""
                    className={`card-img-top img-main img-fluid`}
                    style={{height:"80px",objectFit:"contain"}}
                  />

                                    </div>
                                    <div  onClick={()=>{setPhotoSelected("photo_4")}} className={`col-md-2 col-sm-2 ${photoSelected==='photo_4'?"photo-selected":""}`}>
                                                        <img 
                    src={`${BASE_URL}/product/getPhotoImage/photo_4/${product._id}`}
                    alt=""
                    className={`card-img-top img-main img-fluid`}
                    style={{height:"80px",objectFit:"contain"}}
                  />

                                    </div>
                                    </div>
                                </div>

                                {/* <div className="text-start">
                                    <span className="fw-bolder">Price : </span>
                                    <span className="fw-normal">{product.price}</span>
                                </div>
                                <hr />
                                <div className="text-start">
                                    <span className="fw-bolder">Category : </span>
                                    <span className="fw-normal">{product.category}</span>
                                </div>
                                <hr />
                                <div className="text-start">
                                    <span className="fw-bolder">Status : </span>
                                    <span className="fw-normal">{product.status}</span>
                                </div>
                                <hr /> */}

                            </div>
                                                 </div>
                                                 <hr />
                                                 <div className="fw-bolder text-start m-3">Related Product</div>
                                                <div className="container">
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
                                                    slidesPerView: 3,
                                                    //  spaceBetween: 50,
                                                    },
                                                    }}
                                                    >
                                                        {relatedProducts.map((p,key)=>(

                                                        <SwiperSlide className='col-md-4 col-lg-4' key={key}>
                <div className="card p-3" style={{position:"relative"}}>
                    
                  {p.status == "In Stock" && (
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
                        {p.status}
                      </span>
                    </>
                  )}
                  {p.status == "Out Of Stock Soon" && (
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
                        {p.status}
                      </span>
                    </>
                  )}
                  {p.status == "Out Of Stock" && (
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
                        {p.status}
                      </span>
                    </>
                  )}

                <img 
                    src={`${BASE_URL}/product/getPhotoImage/main/${p._id}`}
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                    onClick={productShowDetails.bind(this,p)}
                  />

                    <div className="card-title fw-bolder text-center">
                        {p.name}<br/> 
                          {(p.rating==1) && (
                            <ion-icon name="star" className="icon_stare"></ion-icon>
                          )}
                          {(p.rating==2) && (
                            <>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                            </>
                          )}
                          {(p.rating==3) && (
                            <>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                            </>
                          )}
                         {(p.rating==4) && (
                            <>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                              <ion-icon name="star" className="icon_stare"></ion-icon>
                            </>
                          )}
                        {(p.rating==5) && (
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
                            <div className=""><span className='fw-bolder'>Price : </span>{p.price} MAD</div><br/>
                            <div className=""><span className='fw-bolder'>Saller : </span> {p.saller.first_name} {p.saller.last_name}</div>

                        </div>
    
                    </div>
                </div>
                </div>                                                        </SwiperSlide>
                                                        ))}

                                                    <br />
                                                    <br />
                                                    </Swiper>
                                                    {/* {relatedProducts.map((item,index)=>(
                                                        <>
                                                            
                                                        </>
                                                    ))} */}
                                                </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card m-3">
                                             <img 
                                                 src={`${BASE_URL}/user/getPhoto/${product?.saller?._id}`}
                                                 alt=""
                                                 className="card-img-top img-main img-fluid"
                                                 style={{objectFit:"cover"}}
                                                 />
                                                 
                                                 <div className="card-title text-center fw-bolder">
                                                    <div className='mt-3'>

                                                    {product?.saller?.first_name} {product?.saller?.last_name}
                                                    </div>
                                                 </div>
                                                 <hr style={{width:"90%",marginLeft:"5%"}} />
                                                 <div className="card-body">
                                                    <span className="fw-bolder">
                                                        Phone &nbsp;
                                                    </span>
                                                    <span className='fw-normal'>

                                                        {product?.saller?.phone}
                                                    </span>
                                                    <br />
                                                                                                        <span className="fw-bolder">
                                                        Email &nbsp;
                                                    </span>
                                                    <span className='fw-normal'>

                                                        {product?.saller?.email}
                                                    </span>

                                                 </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    </>
  )
}

export default ProductDetails