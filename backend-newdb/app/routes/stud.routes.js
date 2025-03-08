var express = require("express");
var db = require('../config/db.config');
const utils = require('./utils');
const axios = require('axios');

const router = express.Router();
router.use(express.json())

//LOGIN API TO FETCH GRNO_EMPCODE
router.post("/Store", (request, response) => {
    const { username } = request.body; //From Front End
    utils.grno_Emp=username;
});

//STUDENT REGISTRATION API -  
router.post("/StudentRegistration", (request, response) => {
    const connection = db.connect();

    // const { grno_EmpCode } = request.body; //From Front End
    // console.log(grno_EmpCode);

    const statement = `update learner set registered= True where learner_id=(SELECT l.learner_id FROM learner AS 
                       l INNER JOIN person AS p ON p.Person_id = l.Person_id WHERE p.grno_EmpCode = '${utils.grno_Emp}');`;

    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    });
});

router.get("/StudentRegistration", (request, response) => {
    const connection = db.connect();
    //Information from databse to Front-end 
    const statement = ` SELECT p.FullName,  p.mobile,p.email, d.name as department_name, p.grno_EmpCode FROM  person AS p INNER JOIN 
    department AS d ON d.Department_id = p.Department_id WHERE p.grno_EmpCode = '${utils.grno_Emp}';`;

    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    });
});








//STUDENT GROUP REGISTRATION API -
// 1) insert college_id and department_id - DONE 
// 2) add query to provide role member1=teamlead -DONE
// 3) If industrial update Company_id 

router.post("/GroupRegistration", (request, response) => {
    //PROJECT_GROUP TABLE- Group_name,Domain_Pref_1,Domain_Pref_2,Domain_Pref_3,Project_Type_id (College_id,Department_id )
    const connection = db.connect();
    //DATA FROM FRONT-END 
    const { Domain_Pref_1, Domain_Pref_2, Domain_Pref_3, Project_Type_id, department_name, Member1, Member2, Member3, Member4 } = request.body;

    //COUNT OF THE INDUSTRY PROJECT-TYPE
    const statement = `SELECT COUNT(*) AS count,pt.Project_Type_Name AS projectname FROM project_group 
                       AS gp INNER JOIN project_type AS pt ON pt.Project_Type_id = gp.Project_Type_id
                       WHERE pt.Project_Type_id = '${Project_Type_id}';`

    connection.query(statement, (error, result) => {
        result = JSON.parse(JSON.stringify(result));
        //GROUP_NAME GENERATION
        let newCount = result[0].count + 1
        const tempName = `${result[0].projectname}-${newCount}`
        console.log(tempName);

        // INSERT DATA IN PROJECT_GROUP- DOMAIN PREFERENCES AND GROUP_NAME GENERATED
        const statement1 = `insert into project_group(Group_Name,Domain_Pref_1,Domain_Pref_2,Domain_Pref_3,Project_Type_id,Department_id) 
                            values ('${tempName}','${Domain_Pref_1}','${Domain_Pref_2}','${Domain_Pref_3}','${Project_Type_id}','${department_name}');`;

        connection.query(statement1, (error, result) => {
            if (!error) {


                const member = `UPDATE project_group SET  Member1 =(SELECT learner_id FROM learner AS l INNER JOIN person AS p ON
                    p.Person_id = l.Person_id WHERE grno_Empcode =('${Member1}')),Member2 =(SELECT learner_id
                        FROM learner AS l
                INNER JOIN person AS p
                ON
                    p.Person_id = l.Person_id
                WHERE
                    grno_Empcode =('${Member2}')),
                    Member3 =(
                    SELECT
                        learner_id
                    FROM
                        learner AS l
                    INNER JOIN person AS p
                    ON
                        p.Person_id = l.Person_id
                    WHERE
                        grno_Empcode = ('${Member3}')),
                        Member4 =(
                        SELECT
                            learner_id
                        FROM
                            learner AS l
                        INNER JOIN person AS p
                        ON
                            p.Person_id = l.Person_id
                        WHERE
                            grno_Empcode =('${Member4}'))
                        WHERE
                            Group_Name = '${tempName}'`;
                connection.query(member, (error, result) => {
                    console.log(result);
                    if (!error) {
                        

                        //UPDATE ROLE OF TEAM LEADER FOR 1ST MEMBER
                        const fact_statement2 = `update person set role_id = "2" WHERE grno_EmpCode='${Member1}';`;
                        connection.query(fact_statement2, (error, result) => {
                            console.log(result);
                            if (!error) {

                                //UPDATE ROLE FOR TEAM MEMBER -REST GROUP
                                const fact_statement3 = `update person set role_id = "1" WHERE grno_EmpCode in ('${Member2}','${Member3}','${Member4}');`;
                                connection.query(fact_statement3, (error, result) => {
                                    console.log(result);
                                    if (!error) {

                                        //update the group_id of all the members
                                        const stat = `update learner set Group_id=(select Group_id from project_group where Group_Name='${tempName}') 
                                              where person_id in (select person_id from person where
                                              grno_EmpCode in ('${Member1}','${Member2}','${Member3}','${Member4}'));`;

                                        connection.query(stat, (error, result) => {

                                            console.log(result);
                                            connection.end();
                                            response.send(utils.createResponse(error, result));
                                        })
                                    }
                                    else {
                                        console.log(error);
                                    }
                                })
                            }
                            else {
                                console.log(error);
                            }
                        })
                    }
                    else {
                        console.log(error);
                    }
                })


            }
            console.log(error);
        })
    })


    
});











//DONE
//TO DISPLAY THE GROUP DETAILS FROM GROUP REGISTRATION FORM IN GROUP INFO 
router.get('/StudentGroupDetails', (request, response) => {
    //CREATE OBJECT
    var jsonObject = {};
    var key = 'detail';
    jsonObject[key] = [];

    const connection = db.connect();

    //Query- Group_ID of the Student Logged IN
    const statement = `Select l.Group_id as grp_id from learner as l inner join person as p on p.Person_id=l.Person_id 
                         where p.grno_EmpCode='${utils.grno_Emp}';`;
    connection.query(statement, (error, result) => {

        result = JSON.parse(JSON.stringify(result));
        let grp_id = result[0].grp_id
        console.log("Group Id :" + grp_id);

        //GROUP_NAME AND FINAL DOMAIN OF THE STUDENT LOGGED-IN
        const statement1 = `Select pg.Group_Name,pd.Name as final_domain from project_group as pg inner join project_domain 
                            as pd on pd.Domain_id=pg.final_domain where Group_id= '${grp_id}';`;

        connection.query(statement1, (error, result) => {
            console.log(result);
            result = JSON.parse(JSON.stringify(result));
            jsonObject[key].push(result);
            if (!error) {

                //INSTRUCTOR DETAILS FOR THE GROUP OF THE STUDENT LOGGED IN 
                const stat = `Select p.FullName as Instructor_name from person as p inner join instructor as i on p.Person_id=i.Person_id 
                                 Where i.Instructor_id = (select Instructor_id1 from project_group where Group_id='${grp_id}') 
                                 OR (select Instructor_id2 from project_group where Group_id='${grp_id}')`

                connection.query(stat, (error, result) => {
                    console.log(result);
                    result = JSON.parse(JSON.stringify(result));
                    jsonObject[key].push(result);
                    if (!error) {

                        //DETAILS OF ALL THE GROUP MEMBERS OF THE STUDENT 
                        const stat2 = `Select p.FullName,p.grno_EmpCode from person as p INNER JOIN learner as l 
                                          on p.Person_id=l.Person_id where l.Group_id= '${grp_id}' `
                        connection.query(stat2, (error, result) => {
                            console.log(result)
                            jsonObject[key].push(result);

                            connection.end();
                            response.send(utils.createResponse(error, jsonObject[key]));
                        })
                    }
                    else {
                        console.log(error);
                    }
                })

            }
            else {
                console.log(error);
            }
        })


    })
});
module.exports = router








//DONE
//TO DISPLAY THE INDUSTRY PROJECTS ENTERED BY PROJECT CO-ORDINATOR 
router.get('/StudentIndustryProject', (request, response) => {
    const connection = db.connect();
    //ALL THE DETAILS FROM INDUSTRYPROJECT
    const statement = `SELECT pd.Name as Domain1,ip.CompanyName,ip.Description,ip.DueDate, ip.Links FROM
     project_domain AS pd INNER JOIN industryproject AS ip ON ip.Domain1 = pd.Domain_id 
     WHERE CURRENT_DATE() <= DueDate AND visible= True;`;

    connection.query(statement, (error, result) => {
        console.log(result);

        connection.end();
        response.send(utils.createResponse(error, result));
    })
});
module.exports = router










//DONE
//QUERY RAISED API
router.post("/StudentGroupDetails", (req, res) => {
    const connection = db.connect();

    //Support Table -  Support_id Group_id	Learner_id	Support_Description_id	Resolved
    const {grno_EmpCode, Group_Name,  querydesc } = req.body;
    //STORE LEARNER_ID 

    let learn_statement = `select Learner_id from learner where Person_id=(select Person_id from person 
                           where grno_EmpCode='${grno_EmpCode}')`;
    connection.query(learn_statement, function (err, rows, fields) {
        learn_id = (rows[0].Learner_id);
        console.log(learn_id);
        if (!err) {

            //STORE THE GROUP_ID
            let grp_statement = `select Group_id from learner where Learner_id = '${learn_id}'`;
            connection.query(grp_statement, function (err, rows, fields) {
                grp_id = (rows[0].Group_id);
                console.log(grp_id);
                if (!err) {

                    //INSERT DATA IN SUPPORT TABLE 
                    let statement = `insert into support (Group_id,	Learner_id,	Support_Description_id,	Resolved) values 
                    ('${grp_id}','${learn_id}','${querydesc}',False);`;
                    
                    connection.query(statement, function (err, rows, fields) {
                        res.send(utils.createResponse(err, rows));
                        connection.end();
                        if (!err) {

                            console.log("success");
                        }
                        else {
                            console.log("Error1");
                        }
                    })
                } else {
                    console.log("Error2");
                }
            });
        } else {
            console.log("Error");
        }
    });
});

