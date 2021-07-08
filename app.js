const express = require('express'); //installs express
const app = express();

const data = require("./data.json"); //gets the data from the data.json file

app.use('/static', express.static('public')); //a way to get to the css from the pug file
app.use('/images', express.static('Images')); //a way to get to the images from the pug file

app.set("view engine", "pug"); //set view engine to pug

app.listen(3000); //makes express listen on port 3000

app.get('/', (req, res) => { //when the user goes to the home route
    res.render("index", {data: data})
});

app.get('/about', (req, res) => { //when the user goes to the about route
    res.render("about", {})
});

app.get('/project/:id', (req, res) => { //when the user goes to a project route
    if(req.params.id >= 0 && req.params.id <= 4) { //checks if the id is valid
        let project_data = data.projects[req.params.id]
        res.render("project", {name: project_data.project_name, discription: project_data.discription, tech: project_data.technologies, link: project_data.live_link, git: project_data.github_link, image: project_data.image_urls})
    } else {
        res.send("404: Page not found. Please make sure that your route is valid.")
    }
});


app.use(function (req, res, next) { //catches 404 errors
    res.status(404).send("404: Page not found. Please make sure that your route is valid.")
})