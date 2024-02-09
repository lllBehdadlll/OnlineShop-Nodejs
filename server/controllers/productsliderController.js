const Productslider = require("../models/Productslider");
const Category = require("../models/Category");
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

      const productslider = await Productslider.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();


      const count = await Productslider.countDocuments({});
  
        res.render("productslider", {
      locals,
      productslider,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };



  //Get new customer form

  exports.addProductslider = async (req, res) => {


    const local ={
  
        title: 'افزودن کاربر',
        description: 'NodeJs project'
    }
  
    try {

      const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();
  
  res.render('productslider/add', {
    local,
    categories,

});
} catch (error) {
  console.log(error);
}


  };

  
  //Post  create new customer

  exports.postProductslider = async (req, res) => {
    console.log(req.body);


    const newProductslider = new Productslider({
      Name: req.body.name,
      Description: req.body.description,
      Category: req.body.category
      });

      try {
        await Productslider.create(newProductslider);
        await req.flash("info", "اسلایدر جدید افزوده شد");
    
        res.redirect("/admin/productslider/");
      } catch (error) {
        console.log(error);
      }
  



  };




  exports.view = async (req, res) => {
    try {
      const productslider = await Productslider.findOne({ _id: req.params.id });
  
      const locals = {
        title: "View productslider Data",
        description: 'NodeJs project'
      };
  
      res.render("productslider/view", {
        locals,
        productslider,
      });
    } catch (error) {
      console.log(error);
    }
  };



  /**
 * GET /
 * Edit productslider Data
 */
exports.edit = async (req, res) => {
  try {
    const productslider = await Productslider.findOne({ _id: req.params.id });
    const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
    .exec();

    const locals = {
      title: "Edit productslider Data",
      description: 'NodeJs project'
    };

    res.render("productslider/edit", {
      locals,
      categories,
      productslider,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * post /
 * Update Productslider Data
 */
exports.editPost = async (req, res) => {
  try {
    await Productslider.findByIdAndUpdate(req.params.id, {
      Name: req.body.name,
      Description: req.body.description,
      Category: req.body.category,
      updatedAt: Date.now(),
    });
    await req.flash("info", "اسلایدر بروزرسانی شد");
    await res.redirect("/admin/productslider/");

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};



exports.deleteProductslider = async (req, res) => {
  try {
    await Productslider.deleteOne({ _id: req.params.id });
    await req.flash("info", "اسلایدر  حذف شد");
    res.redirect("/admin/productslider/");
  } catch (error) {
    console.log(error);
  }
};



/**
 * Get /
 * Search Customer Data
 */
exports.searchProductslider = async (req, res) => {
  const locals = {
    title: "جستجو",
    description: 'NodeJs project'
  };

  try {
    let searchTerm = req.body.searchTerm;  
    const productslider = await Productslider.find({ Name: searchTerm });

    res.render("product/search", {
      productslider,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
