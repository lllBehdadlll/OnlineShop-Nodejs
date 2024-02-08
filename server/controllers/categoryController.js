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

      const category = await Category.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();


      const count = await Category.countDocuments({});
  
        res.render("category", {
      locals,
      category,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };



  //Get new customer form

  exports.addCategory = async (req, res) => {


    const local ={
  
        title: 'افزودن کاربر',
        description: 'NodeJs project'
    }
  
  res.render('category/add', local);


  };

  
  //Post  create new customer

  exports.postCategory = async (req, res) => {
    console.log(req.body);


    const newCategory = new Category({
        Name: req.body.name,
      Picture: req.body.picture,
      PictureAlt: req.body.picturealt,
      PictureTitle: req.body.picturetitle,
      });

      try {
        await Category.create(newCategory);
        await req.flash("info", "New category has been added.");
    
        res.redirect("/admin/category/");
      } catch (error) {
        console.log(error);
      }
  



  };




  exports.view = async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.id });
  
      const locals = {
        title: "View category Data",
        description: "Free NodeJs User Management System",
      };
  
      res.render("category/view", {
        locals,
        category,
      });
    } catch (error) {
      console.log(error);
    }
  };



  /**
 * GET /
 * Edit category Data
 */
exports.edit = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit category Data",
      description: "Free NodeJs User Management System",
    };

    res.render("category/edit", {
      locals,
      category,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, {
      Name: req.body.name,
      Picture: req.body.picture,
      PictureAlt: req.body.picturealt,
      PictureTitle: req.body.picturetitle,
      updatedAt: Date.now(),
    });
    await res.redirect("/admin/category/");
    // await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};



exports.deleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.redirect("/admin/category/");
  } catch (error) {
    console.log(error);
  }
};



/**
 * Get /
 * Search Customer Data
 */
exports.searchCategory = async (req, res) => {
  const locals = {
    title: "Search category Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const category = await Category.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      category,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
