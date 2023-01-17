/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Kuldeep singh
*  Student ID: 127966216 
*  Date: 17/01/2023
*  Cyclic Link: https://dead-plum-eel-fez.cyclic.app
*
********************************************************************************/ 


// requiring the installed packages
const express = require("express");
const cors = require("cors");

require('dotenv').config();

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const app = express();
app.use(cors());
app.use(express.json());

const HTTP_PORT = process.env.PORT || 8080; 

// initializing the module with given code
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});


// single get route for home page 
app.get("/", (req, res) => {
    res.json({message: "API Listening"})
});

// creating a new movie
app.post("/api/movies", (req,res) => {
    db.addNewMovie(req.body)
    .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// getting a movie with page, perPage and title 
app.get("/api/movies", (req,res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// getting a movie object using id in the parameter
app.get("/api/movies/:_id", (req,res) => {
    db.getMovieById(req.params._id)
    .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// updating a movie object using id in the parameter
app.put("/api/movies/:_id", (req,res) => {
    db.updateMovieById(req.body, req.params._id)
    .then(() => {
            res.status(201).json({message: `Movie updated`});
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// deleting a movie object using id in the parameter
app.delete("/api/movies/:_id", (req,res) => {
    db.deleteMovieById(req.params._id)
    .then(() => {
            res.status(201).json({message: `Movie deleted`});
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});