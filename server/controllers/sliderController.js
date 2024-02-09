const Slider = require("../models/Slider");
const mongoose = require("mongoose");


//Get HomePage

exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

    const locals ={
  
        title: 'IE Project',
        description: 'NodeJs project'
    }
  
    let perPage = 5;
    let page = req.query.page || 1;

    try {

      const sliders = await Slider.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();


      const count = await Slider.countDocuments({});
  
        res.render("slider", {
      locals,
      sliders,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };



  //Get new Slider form

  exports.addSlider = async (req, res) => {


    const local ={
  
        title: 'افزودن اسلایدر',
        description: 'NodeJs project'
    }
  
  res.render('slider/add', local);


  };

  
  //Post  create new Slider

  exports.postSlider = async (req, res) => {
    console.log(req.body);


    const newSlider = new Slider({
        Picture: req.body.picture,
        PictureAlt: req.body.picturealt,
        PictureTitle: req.body.picturetitle,
        Heading: req.body.heading,
        Title: req.body.title,
        Text: req.body.text,
        BtnText: req.body.btntext,
        Link: req.body.link

      });

      try {
        await Slider.create(newSlider);
        await req.flash("info", "اسلاید جدید با موفقیت افزوده شد!");
    
        res.redirect("/admin/slider/");
      } catch (error) {
        console.log(error);
      }
  



  };




  exports.view = async (req, res) => {
    try {
      const sliders = await Slider.findOne({ _id: req.params.id });
  
      const locals = {
        title: "View Slider Data",
        description: 'NodeJs project'
      };
  
      res.render("slider/view", {
        locals,
        sliders,
      });
    } catch (error) {
      console.log(error);
    }
  };



  /**
 * GET /
 * Edit Slider Data
 */
exports.edit = async (req, res) => {
  try {
    const sliders = await Slider.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Slider Data",
      description: 'NodeJs project'
    };

    res.render("slider/edit", {
      locals,
      sliders,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Slider Data
 */
exports.editPost = async (req, res) => {
  try {
    await Slider.findByIdAndUpdate(req.params.id, {
      Picture: req.body.picture,
        PictureAlt: req.body.picturealt,
        PictureTitle: req.body.picturetitle,
        Heading: req.body.heading,
        Title: req.body.title,
        Text: req.body.text,
        BtnText: req.body.btntext,
        Link: req.body.link,
        updatedAt: Date.now(),
    });
    await req.flash("info", "اسلایدر با موفقیت آپدیت شد!");
    await res.redirect("/admin/slider/");

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};



exports.deleteSlider = async (req, res) => {
  try {
    await Slider.deleteOne({ _id: req.params.id });
    await req.flash("info", "اسلاید با موفقیت حذف شد!");
    res.redirect("/admin/slider/");
  } catch (error) {
    console.log(error);
  }
};



/**
 * Get /
 * Search Slider Data
 */
exports.searchSlider = async (req, res) => {
  const locals = {
    title: "جستجو",
    description: 'NodeJs project'
  };

  try {
    let searchTerm = req.body.searchTerm;  
    const slider = await Slider.find({ Name: searchTerm });

    res.render("slider/search", {
      slider,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
