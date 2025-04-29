const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel.js');
const ProductSliderModel = require('../models/ProductSliderModel.js');
const ProductModel = require('../models/ProductModel.js');
const ProductDetailModel = require('../models/ProductDetailModel.js');
const ReviewModel = require('../models/ReviewModel.js');
const mongoose = require('mongoose');
const ObjectID=mongoose.Types.ObjectId


const BrandListService=async ()=>{
  try {
      let data =await BrandModel.find();
      return {status:"success", data:data};
  }catch(err){
     return {status:500, data:err.toString()};
  }
}

const CategoryListService=async ()=>{

    try {
        let data =await CategoryModel.find();
        return {status:"success", data:data};
    }catch(err){
        return {status:500, data:err.toString()};
    }

}

const SliderListService=async ()=>{

    try {
        let data =await ProductSliderModel.find();
        return {status:"success", data:data};
    }catch(err){
        return {status:500, data:err.toString()};
    }
}

const ListByBrandService=async (req)=>{
try {
    let BrandID=new ObjectID(req.params.BrandID);
    let MatchStage={$match:{brandID:BrandID}};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brands"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"categories"}};
         let unwindBrandStage={$unwind:"$brands"}
    let unwindCategoryStage={$unwind:"$categories"}
    let ProjectionStage={$project:{'brands._id':0,'categories._id':0,'categoryID':0,'brandID':0}}

        let data=await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            ProjectionStage
        ])
    return {status:"success", data:data};
}catch(err){
    return {status:500, data:err.toString()};
}

}


const ListByCategoryService=async (req)=>{

    try {
        let CategoryID=new ObjectID(req.params.CategoryID);
        let MatchStage={$match:{categoryID:CategoryID}};
        let JoinWithBrandStages={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let unwindBrandStage={$unwind:"$brand"}
        let unwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brands._id':0,'categories._id':0,'categoryID':0,'brandID':0}}

        let data=await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStages,
            JoinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            ProjectionStage
        ])
        return {status:"success", data:data};
    }catch(err){
        return {status:500, data:err.toString()};
    }


}

const ListBySmilierService=async (req,res)=>{
           try {
               let CategoryID=new ObjectID(req.params.CategoryID);
               let MatchStage={$match:{categoryID:CategoryID}};
               let limitStage={$limit:10};
               let JoinWithBrandStages={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brands"}};
               let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"categories"}};
               let unwindBrandStage={$unwind:"$brands"}
               let unwindCategoryStage={$unwind:"$categories"}
               let ProjectionStage={$project:{'brands._id':0,'categories._id':0,'categoryID':0,'brandID':0}}


               let data=await ProductModel.aggregate([
                   MatchStage,
                   limitStage,
                   JoinWithBrandStages,
                   JoinWithCategoryStage,
                   unwindBrandStage,
                   unwindCategoryStage,
                   ProjectionStage
               ])
               return {status:"success", data:data};
           }catch(err){
               return {status:500, data:err.toString()};
           }
}

const ListByKeywordService=async (req)=> {
   try {
       let SearchRegex={"$regex":req.params.keyword,"$options":"i"};
       let searchParams=[{title:SearchRegex},{shortDes:SearchRegex}];
       let SearchQuery={$or:searchParams};


       let MatchStage={$match:SearchQuery};

       let JoinWithBrandStageK={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brands"}};
       let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"categories"}};
       let unwindBrandStage={$unwind:"$brands"}
       let unwindCategoryStage={$unwind:"$categories"}
       let ProjectionStage={$project:{'brands._id':0,'categories._id':0,'categoryID':0,'brandID':0}}


       let data=await ProductModel.aggregate([
           MatchStage,
           JoinWithBrandStageK,
           JoinWithCategoryStage,
           unwindBrandStage,
           unwindCategoryStage,
           ProjectionStage
       ])
       return {status:"success", data:data};


   }catch(err){
       return {status:500, data:err.toString()};
   }
}
const ListByRemarkService=async (req)=>{

    try {
        let Remark= req.params.Remark;
        let MatchStage={$match:{remark:Remark}};
        let JoinWithBrandStageR={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brands"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"categories"}};
        let unwindBrandStage={$unwind:"$brands"}
        let unwindCategoryStage={$unwind:"$categories"}
        let ProjectionStage={$project:{'brands._id':0,'categories._id':0,'categoryID':0,'brandID':0}}

        let data=await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStageR,
            JoinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            ProjectionStage
        ])
        return {status:"success", data:data};
    }catch(err){
        return {status:500, data:err.toString()};
    }

}


const DetailsService=async (req)=>{
  try {
      let productID=new ObjectID(req.params.ProductID);
      let MatchStage={$match:{_id: productID}};

      let JoinWithBrandStageD={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
      let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
      let JoinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"detail"}};

      let unwindBrandStage={$unwind:"$brand"}
      let unwindCategoryStage={$unwind:"$category"}
      let unwindDetailsStage={$unwind:"$detail"}
      let ProjectionStage={$project:{'brands._id':0,'categories._id':0,'categoryID':0,'brandID':0}}

      let data=await ProductModel.aggregate([
          MatchStage,
          JoinWithBrandStageD,
          JoinWithCategoryStage,
          JoinWithDetailsStage,
          unwindBrandStage,
          unwindCategoryStage,
          unwindDetailsStage,
          ProjectionStage
      ])
      return {status:"success",data:data}
  }catch(err){
      return {status:500, data:err.toString()};
  }
}


const CreateReviewService = async (req) => {
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        let data=await ReviewModel.create({
            productID:reqBody['productID'],
            userID:user_id,
            des:reqBody['des'],
            rating:reqBody['rating'],
        })
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e.toString()}

    }
}


const ReviewListService = async (req) => {

    try {

        let ProductID=new ObjectID(req.params.ProductID);
        let MatchStage={$match:{productID:ProductID}}

        let JoinWithProfileStage= {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
        let UnwindProfileStage={$unwind:"$profile"}
        let ProjectionStage= {$project: {'des': 1, 'rating': 1, 'profile.cus_name': 1}}

        let data= await  ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage
        ])

        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }

}



const { ObjectId } = require("mongodb");

const ListByFilterService = async (req) => {
    try {
        let matchConditions = {};

        // Validate and assign ObjectId
        if (req.body.categoryID && ObjectId.isValid(req.body.categoryID)) {
            matchConditions.categoryID = new ObjectId(req.body.categoryID);
        }
        if (req.body.brandID && ObjectId.isValid(req.body.brandID)) {
            matchConditions.brandID = new ObjectId(req.body.brandID);
        }

        let MatchStage = { $match: matchConditions };

        // Convert price range inputs safely
        let priceMin = parseInt(req.body.priceMin);
        let priceMax = parseInt(req.body.priceMax);
        let PriceMatchConditions = {};

        if (!isNaN(priceMin)) {
            PriceMatchConditions.numericPrice = { $gte: priceMin };
        }
        if (!isNaN(priceMax)) {
            PriceMatchConditions.numericPrice = {
                ...(PriceMatchConditions.numericPrice || {}),
                $lte: priceMax
            };
        }

        let PriceMatchStage = Object.keys(PriceMatchConditions).length ? { $match: PriceMatchConditions } : null;

        let pipeline = [
            MatchStage,
            { $addFields: { numericPrice: { $toInt: "$price" } } },
            ...(PriceMatchStage ? [PriceMatchStage] : []),
            { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
            { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
            { $unwind: "$brand" },
            { $unwind: "$category" },
            { $project: { "brand._id": 0, "category._id": 0, categoryID: 0, brandID: 0 } }
        ];

        let data = await ProductModel.aggregate(pipeline);
        return { status: "success", data };

    } catch (e) {
        return { status: "fail", message: e.message };
    }
};


module.exports={
    ListByFilterService,
    CreateReviewService,
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListByKeywordService,
    ListByRemarkService,
    ListBySmilierService,
    DetailsService,
    ReviewListService

}


