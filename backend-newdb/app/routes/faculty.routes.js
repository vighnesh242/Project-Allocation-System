var express = require("express");
var db = require('../config/db.config');
const utils = require('./utils');
const axios = require('axios');
// var grno_Emp="F001";

const router = express.Router();
router.use(express.json())

//FACULTY REGISTRATION API
router.post("/FacultyRegistration", (req, res) => {
    // const { grno_EmpCode } = req.body;
   
     //update the registred column in instructor logged-in
    const statement = ` update instructor set registered=True where Person_id=(select Person_id from person 
                         where grno_EmpCode='${utils.grno_Emp}');`;

    const connection = db.connect();
    connection.query(statement, (error, result) => {
        console.log(result);

        connection.end();
        res.send(utils.createResponse(error, result));


    });
});
router.get("/FacultyRegistration", (req, res) => {
    const connection = db.connect();
    
    //All the faculty details from person table of faculty logged in 
    const statement = ` SELECT p.FullName,  p.mobile,p.email, d.name as department_name, p.grno_EmpCode FROM  person AS p 
                        INNER JOIN department AS d ON d.Department_id = p.Department_id WHERE p.grno_EmpCode = '${utils.grno_Emp}'`;

    connection.query(statement, (error, result) => {
        connection.end();
        res.send(utils.createResponse(error, result));
    });
});


//Domain REGISTRATION API
router.post("/DomainRegistration", (req, res) => {
    const { grno_EmpCode, Domain_Pref_1, Domain_Pref_2, Domain_Pref_3 } = req.body;

    //updating the domain preferences in instructor table
    const statement = ` update instructor set Domain_Pref_1='${Domain_Pref_1}',Domain_Pref_2='${Domain_Pref_2}', 
                        Domain_Pref_3='${Domain_Pref_3}' where Person_id=(select Person_id from person where 
                        grno_EmpCode='${utils.grno_Emp}');`;

    const connection = db.connect();
    connection.query(statement, (error, result) => {

        connection.end();
        res.send(utils.createResponse(error, result));
    });

});



//TO GET THE GROUP DETAILS OF ALLOCATED GROUP ENTERED ON FACULTY PAGE
router.get('/FacultyGroupDetails', (request, response) => {

    const connection = db.connect();

    //Group ids of all the groups haing instructor_id as logged-in faculty
    const statement = `select pg.Group_Name,pd.Name,p.grno_EmpCode,p.FullName from project_group as pg INNER join learner as l 
                       on l.group_id=pg.Group_id INNER JOIN person as p on p.Person_id=l.Person_id inner join project_domain as pd 
                       on pd.Domain_id=pg.final_domain where pg.Group_id in (select Group_id from project_group where 
                        Instructor_id1=(select Instructor_id from instructor where Person_id=(select Person_id from person 
                        WHERE grno_EmpCode ='${utils.grno_Emp}'))) ORDER BY pg.Group_Name;`;

        connection.query(statement, (error, result) => {
        connection.end();
        console.log(result);
        response.send(utils.createResponse(error, result));


        if (!error) {
            console.log("Success");
        }
    })
});


//TO GET THE INDUSTRY PROJECTS ENTERED BY PROJECT CO-ORDINATOR on FACULTY PAGE 
router.get('/FacultyIndustryProject', (request, response) => {
    const connection = db.connect();

    //display industry_projects
    const statement = `SELECT pd.Name as Domain1,ip.CompanyName,ip.Description,ip.DueDate, ip.Links FROM
                       project_domain AS pd INNER JOIN industryproject AS ip ON ip.Domain1 = pd.Domain_id AND visible= True`;

    connection.query(statement, (error, result) => {

        connection.end();
        response.send(utils.createResponse(error, result));
    })
});

module.exports = router