var express = require('express');
var app = module.exports = express();
var sql = require("mysql");
var http = require('http');
var url = require('url');
var routes = require('routes');
var moment = require('moment');

var path = require('path');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');


app.use(flash());
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ cookie: { maxAge: 60000 },
                  secret: 'woot',
                  resave: false,
                  saveUninitialized: false}));
//database
var con = sql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "bidding"
});
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/public'));
//app.use(app.router);

app.get('/', function(req, res){
	res.render('index', {sayHelloTo: 'world'});
});

app.get('/signup', function(req, res){
	res.render('signup');
});
app.get('/about', function(req, res){
	res.render('about');
});app.get('/contact', function(req, res){
	res.render('contact');
});



app.get('/login', function(req, res){
	res.render('login');
});


app.get('/provider', function(req, res){
	res.render('provider');
});

app.get('/admin', function(req, res){
	var sql = "Select * from user where role >1";
	con.query(sql,req.body,function(err,rows){
		//res.send({"code":200,"success":rows});
		res.render('admin',{data:rows});
	});
});
app.get('/jobseeker', function(req, res){
	var sql = "Select * from project";
	con.query(sql,req.body,function(err,rows){
		//res.send({"code":200,"success":rows});
		res.render('jobseeker',{data:rows});
	});
});

app.get('/checkOrder', function(req, res){
	var sql = "SELECT project.*, bidorder.bId, bidorder.bidProj, bidorder.bidPrice, bidorder.actionBy,bidorder.bidBy, user.firstName,user.lastName, bidorder.bId FROM bidorder JOIN user ON bidorder.bidBy=user.id JOIN project ON bidorder.bidProj = project.Id";
	con.query(sql,req.body,function(err,rows){
		//console.log(rows);
		res.render('bidorder',{data:rows});
	});
});

app.get('/bid/:bId', function (req, res) {
	var sql = "Select * from project where Id="+req.params.bId;
	con.query(sql,function(err,rows){
		if(err) throw err;
		res.render('bidProj',{page_title:'Edit Table',data:rows});
	});
})
app.get('/edit/:userId', function (req, res) {
	var sql = "Select * from user where role >1 and id="+req.params.userId;
	con.query(sql,function(err,rows){
		if(err) throw err;
		res.render('editUser',{page_title:'Edit Table',data:rows});
	});
})



app.get('/delete/:userId', function (req, res) {
	var sql = "delete from user where role >1 and id="+req.params.userId;
	con.query(sql,function(err,rows){
		if(err) throw err;
		res.redirect('/admin');
	});
})


app.post('/update', function (req, res) {
	var sql = "Update user set firstName = \'\"+req.body.firstName +\"\', lastName =\'\"+req.body.lastName +\"\', contact =\'\"+req.body.contact +\"\' where id=\"+req.body.id\"";
	con.query(sql,function(err,rows){
		if(err) throw err;
		res.redirect('/admin');

	});
})


app.post('/bidDone', function (req, res) {
	var sql="insert into bidorder(bidBy,bidProj,bidPrice) values('2','"+req.body.pid+"','"+req.body.userPrice+"')";
	con.query(sql,function(err,rows){
		if(err) throw err;
		res.redirect('/jobseeker');

	});
})

app.post('/finaldecision', function (req, res) {
	var sql="Update bidorder set actionBy= '"+req.body.decison+"' where bidBy ='"+req.body.bidby+"' and bidProj ='"+req.body.pid+"'";
	con.query(sql,function(err,rows){
		if(err) throw err;
		res.redirect('/jobseeker');

	});
})



app.post('/add',function(req,res)
{

	var sql="insert into project(projTitle,projDesc,price) values('"+req.body.projectname+"','"+req.body.projectdescription+"','"+req.body.price+"')";
	con.query(sql,function(err,rows)
	{
		if(err)
		{
			  console.log(err);
		}
		else{
			 console.log("Print");

			 res.redirect('/provider');
		}

});





})


app.post('/register', function (req, res) {
	//bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword)
	//{
		//save to db
		//req.body.password = bcryptedPassword;
		var sql = "Insert into user SET ?";
		con.query(sql,req.body,function(err,rows){
			if(err){
				console.log(err);
				//req.flash('signupSuccess', err);
			}else{
				//req.flash('signupSuccess', 'This is a flash message using the express-flash module.');
				res.redirect('/signup');
			}
		});
	//});
})



app.post('/admin', function (req, res,next) {
	var sql = "Select * from user where username = '"+req.body.userName +"'";
	con.query(sql,req.body,function(err,rows){
		if(err){
			console.log(err);
		}else{
			if(rows.length>0){
				//bcrypt.compare(req.body.password, rows[0].password, function(err, resDa) {
					if(req.body.password === rows[0].password) {
						if(rows[0].role == 1){
							res.redirect('/admin');
						}else if(rows[0].role == 2){
							res.redirect('/provider');
						}else{
							res.redirect('/jobseeker');
						}
						//res.send('userPage',{"code":200,"success":"login sucessfull"});
					} else {
						// Passwords don't match
						res.send({"code":204,"success":"login Unsucessfull"});
						res.end();
					}
				//});
			}
		}
		//res.end();
	});
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
