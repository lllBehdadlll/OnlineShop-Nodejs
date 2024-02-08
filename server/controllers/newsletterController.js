const Newsletter = require("../models/Newsletter");
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

      const newsletter = await Newsletter.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();


      const count = await Newsletter.countDocuments({});
  
        res.render("newsletter", {
      locals,
      newsletter,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };




  exports.view = async (req, res) => {
    try {
      const newsletter = await Newsletter.findOne({ _id: req.params.id });
  
      const locals = {
        title: "View newsletter Data",
        description: "Free NodeJs User Management System",
      };
  
      res.render("newsletter/view", {
        locals,
        newsletter,
      });
    } catch (error) {
      console.log(error);
    }
  };



exports.deleteNewsletter = async (req, res) => {
  try {
    await Newsletter.deleteOne({ _id: req.params.id });
    res.redirect("/admin/newsletter/");
  } catch (error) {
    console.log(error);
  }
};



/**
 * Get /
 * Search Customer Data
 */
exports.searchNewsletter = async (req, res) => {
  const locals = {
    title: "Search newsletter Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const newsletter = await Newsletter.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      newsletter,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
