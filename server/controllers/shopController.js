const Slider = require("../models/Slider");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Productslider = require("../models/Productslider");
const Newsletter = require("../models/Newsletter");

const mongoose = require("mongoose");


//Get HomePage

exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

    const locals ={
  
        title: 'IE Project',
        description: 'NodeJs project'
    }
  


    try {

      const sliders = await Slider.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();

      const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();
      const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();
      const productsliders = await Productslider.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();

  
        res.render("index", {
      locals,
      sliders,
      categories,
      products,
      productsliders,
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };

  exports.postNewsletter = async (req, res) => {
    console.log(req.body);


    const newNewsletter = new Newsletter({
        Email: req.body.email,
      });

      try {
        await Newsletter.create(newNewsletter);
        
    
        res.redirect("/");
      } catch (error) {
        console.log(error);
      }
  



  };