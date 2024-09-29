// Import our dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2')
const dotenv = require('dotenv')

// Configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // Connection is not successful
    if(err) {
        return console.log("Error connecting to the database", err);
        
    }

    // connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId );
    
})

// 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// Question 1: Retrieve all patients
app.get('/patients',(req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).render('data', {data})
    })
})


// Question2: Retrieve all providers
app.get('/providers',(req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, result) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).render('result', { result })
        // res.status(200).send(result)
    })
})

// Question3:  Filter patients by First Name
app.get('/filtered-patients',(req, res) => {
    const getPatientsByFirstName = "SELECT *FROM patients ORDER BY first_name ASC"
    db.query(getPatientsByFirstName, (err, data2) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).render('data2', { data2 })
        // res.status(200).send(data2)
    })
})


// Question4: Retrieve all providers by their specialty
app.get('/provider-specialty',(req, res) => {
    const getProvidersBySpecialty = "SELECT *FROM providers ORDER BY provider_specialty DESC"
    db.query(getProvidersBySpecialty, (err, data3) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).render('data3', { data3 })
        // res.status(200).send(data3)
    })
})


// Start and listen to the server here
app.listen(3300, () => {
    console.log(`Server is running on port 3300...`);
    
})
