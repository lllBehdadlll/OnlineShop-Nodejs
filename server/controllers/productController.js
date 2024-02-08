const Product = require("../models/Product");
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

      const product = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();


      const count = await Product.countDocuments({});
  
        res.render("product", {
      locals,
      product,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };



  //Get new customer form

  exports.addProduct = async (req, res) => {


    const local ={
  
        title: 'افزودن کاربر',
        description: 'NodeJs project'
    }


    try {

      const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();
  
  res.render('product/add', {
    local,
    categories,

});
} catch (error) {
  console.log(error);
}

  };

  
  //Post  create new customer

  exports.postProduct = async (req, res) => {
    console.log(req.body);


    const newProduct = new Product({
      Name: req.body.name,
      Picture: req.body.picture,
      Description: req.body.description,
      Price: req.body.price,
      Category: req.body.category,
      PictureAlt: req.body.picturealt,
      PictureTitle: req.body.picturetitle,
      });

      try {
        await Product.create(newProduct);
        await req.flash("info", "New Product has been added.");
    
        res.redirect("/admin/product/");
      } catch (error) {
        console.log(error);
      }
  



  };




  exports.view = async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
  
      const locals = {
        title: "View product Data",
        description: "Free NodeJs User Management System",
      };
  
      res.render("product/view", {
        locals,
        product,
      });
    } catch (error) {
      console.log(error);
    }
  };



  /**
 * GET /
 * Edit product Data
 */
exports.edit = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
    .exec();

    const locals = {
      title: "Edit product Data",
      description: "Free NodeJs User Management System",
    };

    res.render("product/edit", {
      locals,
      categories,
      product,
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
    await Product.findByIdAndUpdate(req.params.id, {
      Name: req.body.name,
      Picture: req.body.picture,
      Description: req.body.description,
      Price: req.body.price,
      Category: req.body.category,
      PictureAlt: req.body.picturealt,
      PictureTitle: req.body.picturetitle,
      updatedAt: Date.now(),
    });
    await res.redirect("/admin/product/");
    // await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.redirect("/admin/product/");
  } catch (error) {
    console.log(error);
  }
};



/**
 * Get /
 * Search Customer Data
 */
exports.searchProduct = async (req, res) => {
  const locals = {
    title: "Search product Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const product = await Product.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      product,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
