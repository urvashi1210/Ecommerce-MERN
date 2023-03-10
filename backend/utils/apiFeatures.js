class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
        //query=object.find() & queryStr=req.query(whatever is written after the API)
    }


    search(){
        const keyword=this.queryStr.keyword
        ?{
            name:{
                $regex:this.queryStr.keyword,
                //regex means products containing this keyword value(not exact comparison)
                $options:"i",
                //options means case insensitive
            },
        }
        :{};


        this.query=this.query.find({...keyword})
        return this;
}

filter(){

    const queryCopy={...this.queryStr}

    //Removing some fields for category
    const removeFields=['keyword','page','limit'];//we're handling these categories separately

    removeFields.forEach(key=>delete queryCopy[key]);

    //Filter for Price and Rating
     let queryStr=JSON.stringify(queryCopy)
     queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);

    this.query=this.query.find(JSON.parse(queryStr));
    return this;
}

pagination(resultPerPage){
    const currentPage=Number(this.queryStr.page)||1;
    
    const skip=resultPerPage*(currentPage-1);

    this.query=this.query.limit(resultPerPage).skip(skip);

    return this;
}
}

module.exports=ApiFeatures;