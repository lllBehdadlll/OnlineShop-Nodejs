exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

    const locals ={
  
        title: 'IE Project',
        description: 'NodeJs project'
    }
  
    let perPage = 5;
    let page = req.query.page || 1;

    
        res.render("admin", {
      locals,

    });

  };




exports.about = async (req, res) => {
  const locals = {
    title: "درباره",
    description: "پروژه درس مهندسی اینترنت",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};