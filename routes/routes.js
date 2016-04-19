var routes = {};

routes.home = function(req, res){
	res.render("home.ejs");
}

exports.routes = routes