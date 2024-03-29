const User=require("../models/user");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("user/signup.ejs");
};


module.exports.signup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({
            email,
            username
        });
    
        let registerdUser=await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err)
            return next(err);
            
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        })
       
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login=async(req,res)=>{
   
    req.flash( "success","welcome to wanderlust! You are logged in");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err)
        next(err);

       req.flash("success","you are logged out");
       res.redirect("/listings");
    })
}