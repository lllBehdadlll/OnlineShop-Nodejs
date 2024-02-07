const Slider = require("../models/Slider");
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


      const count = await Slider.countDocuments({});
  
        res.render("index", {
      locals,
      sliders,
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };

