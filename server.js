const express = require("express");
const hbs = require("hbs");
const fs = require("fs");


const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log+"\n", (err)=>{
		if(err){
			console.log(err, "Cannot append to file");
		}
	});
	
	next();
});

app.use((req, res, next)=>{
	// res.render('maintenance.hbs');
	next();
});

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res)=>{
	res.render('home.hbs', {
		pageTitle: 'Welcome page',
		welcomeMessage: 'Yonglin Li welcomes you to his node express website.',
		currentYear: new Date().getFullYear(),
		linkage: "/about",
		linkageText: "About"
	});
});

app.get("/about", (req, res)=>{
	const currentYear = new Date().getFullYear();

	res.render("about.hbs", {
		pageTitle: "About Page from parameters",
		currentYear: (currentYear-10) + " - " + (currentYear+1),
		linkage: "/",
		linkageText: "Home"
	});
});

app.listen(port, ()=>{
	console.log(`The server is listening on ${port}`);
});
