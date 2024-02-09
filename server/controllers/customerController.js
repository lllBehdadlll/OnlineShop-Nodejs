const Customer = require("../models/Customer");
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

      const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();


      const count = await Customer.countDocuments({});
  
        res.render("customer", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });


    } catch (error) {
      console.log(error);
    }

  };



  //Get new customer form

  exports.addCustomer = async (req, res) => {


    const local ={
  
        title: 'افزودن کاربر',
        description: 'NodeJs project'
    }
  
  res.render('customer/add', local);


  };

  
  //Post  create new customer

  exports.postCustomer = async (req, res) => {
    console.log(req.body);


    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
      });

      try {
        await Customer.create(newCustomer);
        await req.flash("info", "کاربر جدید افزوده شد");
    
        res.redirect("/admin/customer/");
      } catch (error) {
        console.log(error);
      }
  



  };




  exports.view = async (req, res) => {
    try {
      const customer = await Customer.findOne({ _id: req.params.id });
  
      const locals = {
        title: 'IE Project',
        description: 'NodeJs project'
      };
  
      res.render("customer/view", {
        locals,
        customer,
      });
    } catch (error) {
      console.log(error);
    }
  };



  /**
 * GET /
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: 'IE Project',
        description: 'NodeJs project'
    };

    res.render("customer/edit", {
      locals,
      customer,
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
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await req.flash("info", "کاربر  بروزرسانی شد");
    await res.redirect("/admin/customer/");
    // await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};



exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    await req.flash("info", "کاربر حذف شد");
    res.redirect("/admin/customer/");
  } catch (error) {
    console.log(error);
  }
};



/**
 * Get /
 * Search Customer Data
 */

exports.searchCustomers = async (req, res) => {
    const locals = {
      title: 'IE Project',
        description: 'NodeJs project'
    };
  
    try {
      let searchTerm = req.body.searchTerm;  
      const customers = await Customer.find({ firstName: searchTerm });
  
      res.render("customer/search", {
        customers,
        locals,
      });
    } catch (error) {
      console.log(error);
    }
  };

