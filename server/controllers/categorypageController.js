const Category = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");


//Get HomePage

exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

    const locals ={
  
        title: 'IE Project',
        description: 'NodeJs project'
    }
  


    try {
      const category = await Category.findOne({ _id: req.params.id });
      const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();
      const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();

  
        res.render("categorypage", {
      locals,
      products,
      category,
      categories,
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };




