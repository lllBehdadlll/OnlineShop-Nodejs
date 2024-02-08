const Slider = require("../models/Slider");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Productslider = require("../models/Productslider");

const mongoose = require("mongoose");


//Get HomePage

exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

    const locals ={
  
        title: 'IE Project',
        description: 'NodeJs project'
    }
  


    try {
      const products = await Product.findOne({ _id: req.params.id });
      const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();


  
        res.render("productpage", {
      locals,
      categories,
      products,
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };




