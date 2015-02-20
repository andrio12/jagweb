var Post = require('../models/data'),
	slugs = require("slugs");

//index page
exports.index = function(req, res) {
	//console.log("Cookies: ", req.cookies);
	Post.find(function(err, posts) {
        if(err){
        	console.log(err);
        }
        res.render('pages/index', { posts: posts.sort(posts.created_at).reverse().slice(0,6) });
    });
};

//new post
exports.serve_new = function(req, res) {
    res.render('pages/new');
};

exports.new_post = function(req, res) {
    var post = new Post({
        title: req.body.post_title,
        body: req.body.post_body,
        slug: slugs(req.body.post_title)
    });

    post.save(function(err) {
        if(err.code == 11000){
            console.log("slug er til");
            post.slug = slugCreator(req.body.post_title);
            post.save(function(err) {
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/');
                } 
            });
            
        }
        else if(err){
        	console.log(err);
        }
        else{
        	res.redirect('/');	
        } 
    });
    
    function slugCreator(input){
        var slugCounter = (Math.floor(Math.random() * 100000)).toString();
        return slugs(input) + "-" + slugCounter;
    }
    
};

//show post
exports.show_post = function(req, res) {
    Post.findOne({ slug: req.params.slug }, function (err, post) {
        console.log(post);
        if(err || post === null){
        	console.log(err);
        	res.status(404).send("Þú braust internetið!");
        }
        else{
        	res.render('pages/post', {title: post.title, post: post});	
        } 
    });
};

//about page
exports.articles = function(req, res) {
	Post.find(function(err, posts) {
        if(err){
        	console.log(err);
        }
        res.render('pages/articles', { posts: posts.sort(posts.created_at).reverse() });
    });
};