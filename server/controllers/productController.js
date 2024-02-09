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
  
    let perPage = 10;
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



  //Get new product form

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

  
  //Post  create new product

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
        await req.flash("info", "محصول جدید با موفقیت افزوده شد.");
    
        res.redirect("/admin/product/");
      } catch (error) {
        console.log(error);
      }
  



  };




  exports.view = async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
  
      const locals = {
        title: 'IE Project',
        description: 'NodeJs project'
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
      title: 'IE Project',
        description: 'NodeJs project'
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
 * Update product Data
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
    await req.flash("info", "محصول با موفقیت آپدیت شد!");
    await res.redirect("/admin/product/");

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    await req.flash("info", "محصول با موفقیت حذف شد!");
    res.redirect("/admin/product/");
  } catch (error) {
    console.log(error);
  }
};



/**
 * Get /
 * Search product Data
 */
exports.searchProduct = async (req, res) => {
  const locals = {
    title: "جستجو",
    description: 'NodeJs project'
  };

  try {
    let searchTerm = req.body.searchTerm;  
    const product = await Product.find({ Name: searchTerm });

    res.render("product/search", {
      product,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};

