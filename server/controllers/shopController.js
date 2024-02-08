const Slider = require("../models/Slider");
const Category = require("../models/Category");

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


  
        res.render("index", {
      locals,
      sliders,
      categories,
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };

