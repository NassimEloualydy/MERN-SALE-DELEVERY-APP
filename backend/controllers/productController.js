const Product=require("../models/Product")
const formidable=require("formidable")
const User=require("../models/User")
const fs=require("fs")

exports.getSallers=async (req,res)=>{
    const sallers=await User.find({role:"Saller"}).select("-photo")
    if(sallers)
        return res.json({message:sallers})
    return res.status(400).json({err:sallers})
}
exports.submitProduct=async (req,res)=>{
    const form=new formidable.IncomingForm()
    form.keepExtentions=true
    form.parse(req,async (err,fields,files)=>{
        const {name,category,price,rating,status,description,saller,_id}=fields
        if(_id){
            if(!name || !category || !price || !status || !rating || !description || !saller)
                return res.status(400).json({err:"Please all the fields are required !!"})
            if(!isFinite(price))
                return res.status(400).json({err:"Please the price must be a digit !!"})
            if(!isFinite(rating))
                return res.status(400).json({err:"Please the rating must be a digit !!"})
            var data=await Product.find().select("-photo -photo_1 -photo_2 -photo_3 -photo_4").and([{name},{_id:{$ne:_id}}])
            if(data.length!=0)
            return res.status(400).json({err:"Please the name is already exist !!"})
            var data_updated={name,category,
price,
status,
rating,
description
,saller}
        if(files.photo){
            data_updated.photo={
                data:fs.readFileSync(files.photo.path),
                contentType:files.photo.type
            }
        }
        if(files.photo_1){
            data_updated.photo_1={
                data:fs.readFileSync(files.photo_1.path),
                contentType:files.photo_1.type
            }
        }
        if(files.photo_2){
            data_updated.photo_2={
                data:fs.readFileSync(files.photo_2.path),
                contentType:files.photo_2.type
            }
        }
        if(files.photo_3){
            data_updated.photo_3={
                data:fs.readFileSync(files.photo_3.path),
                contentType:files.photo_3.type
            }
        }
        if(files.photo_4){
            data_updated.photo_4={
                data:fs.readFileSync(files.photo_4.path),
                contentType:files.photo_4.type
            }
        }
        const p=await Product.findOneAndUpdate(
            {_id},
            {$set:data_updated},
            {$new:true}
        )
        if(p)
            return res.json({message:"Product Updated !!"})
        return res.status(400).json({err:p})
 
    }else{
            
            if(!name || !category || !price || !status || !rating || !description || !saller)
                return res.status(400).json({err:"Please all the fields are required !!"})
            if(!isFinite(price))
                return res.status(400).json({err:"Please the price must be a digit !!"})
            if(!isFinite(rating))
                return res.status(400).json({err:"Please the rating must be a digit !!"})
            
            var data=await Product.find({name}).select("-photo -photo_1 -photo_2 -photo_3 -photo_4")
            if(data.length!=0)
            return res.status(400).json({err:"Please the name is already exist !!"})
            if(!files.photo || !files.photo_1 || !files.photo_2 || !files.photo_3 || !files.photo_4)
                return res.status(400).json({err:"Please all the images are required !!"})
            
            const p=await Product.create({
                name,category,price,rating,status,description,saller,
                photo:{
                    data:fs.readFileSync(files.photo.path),
                    contentType:files.photo.type
                },
                photo_1:{
                    data:fs.readFileSync(files.photo_1.path),
                    contentType:files.photo_1.type
                },
                photo_2:{
                    data:fs.readFileSync(files.photo_2.path),
                    contentType:files.photo_2.type
                },
                photo_3:{
                    data:fs.readFileSync(files.photo_3.path),
                    contentType:files.photo_3.type
                },
                photo_4:{
                    data:fs.readFileSync(files.photo_4.path),
                    contentType:files.photo_4.type
                },
    
            })
            if(p)
                return res.json({message:"Product Added with success !!"})
            return res.status(400).json({err:p})
        }
        })
    
}
exports.getdata=async (req,res)=>{
    const {name,description,category,price,first_name_saller,last_name_saller,rating,status}=req.body
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'}
    searchQuery.category={$regex:'.*'+category+'.*',$options:'i'}
    searchQuery.price={$regex:'.*'+price+'.*',$options:'i'}
    searchQuery.rating={$regex:'.*'+rating+'.*',$options:'i'}
    searchQuery.status={$regex:'.*'+status+'.*',$options:'i'}

    const data=await Product.find(searchQuery).select("-photo -photo_1 -photo_2 -photo_3 -photo_4")
    .populate([{
        path:'saller',
        model:"User",
        select:['_id','first_name','last_name','phone','email'],
        match:{
            first_name:{$regex:'.*'+first_name_saller+'.*'},
            last_name:{$regex:'.*'+last_name_saller+'.*'}
        }
    }]).sort({createdAt:-1})
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})
}
exports.getPhotoImage=async (req,res)=>{
    const _id=req.params._id
    if(_id!="undefined"){

        const photo_number=req.params.photo_number
        const p=await Product.find({_id}).select()
        if(p[0]){
            if(photo_number=="main"){
                res.set('contentType',p[0].photo.contentType)
                return res.send(p[0].photo.data)
            }
            if(photo_number=="photo_1"){
                res.set('contentType',p[0].photo_1.contentType)
                return res.send(p[0].photo_1.data)
            }
            if(photo_number=="photo_2"){
                res.set('contentType',p[0].photo_2.contentType)
                return res.send(p[0].photo_2.data)
            }
            if(photo_number=="photo_3"){
                res.set('contentType',p[0].photo_3.contentType)
                return res.send(p[0].photo_3.data)
            }
            if(photo_number=="photo_4"){
                res.set('contentType',p[0].photo_4.contentType)
                return res.send(p[0].photo_4.data)
            }
            
        }
    }
}
exports.deleteProduct=async (req,res)=>{
    const _id=req.params._id
    const p=await Product.findOneAndDelete({_id})
    if(p)
        return res.json({message:"Product Deleted with success !!"})
    return res.status(400).json({err:p})
}