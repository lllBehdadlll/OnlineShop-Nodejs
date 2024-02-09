const nodemailer = require('nodemailer');

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
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;  
    const newsletter = await Newsletter.find({ Email: searchTerm });

    res.render("newsletter/search", {
      newsletter,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};




exports.sendtoall = async (req, res) => {


  const local ={

      title: 'افزودن کاربر',
      description: 'NodeJs project'
  }

res.render('newsletter/sendtoall', local);


};


//Post  create new customer

exports.postSendtoall = async (req, res) => {
  console.log(req.body);


  const subject = req.body.subject;
  const text = req.body.details;
  const newsletter = await Newsletter.aggregate([{ $sort: { createdAt: -1 } }])
      .exec();


      
    try {

      newsletter.forEach(element => {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'btestfornodejs@gmail.com',
            pass: 'ewyvubaxgosthylt'
          }
        });
      
        var mailOptions = {
          from: 'btestfornodejs@gmail.com',
          to: element.Email,
          subject: subject,
          text: text
        }
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      });


      await req.flash("info", "ایمیل با موفقیت برای همه مشترکان ارسال شد");
  
      res.redirect("/admin/newsletter/");
    } catch (error) {
      console.log(error);
    }




};