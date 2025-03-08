var express = require("express");
var db = require('../config/db.config');
const utils = require('./utils');
const axios = require('axios');

const router = express.Router();
router.use(express.json())

//DONE
// Company registration into database by project coordinator
router.post("/CoordinatorIndustryProject", (req, res) => {
    const { CompanyName,Description, Domain1, DueDate, FacultyRef, Links } = req.body; //from front-end
    const connection = db.connect();

    //Company_Id	CompanyName	Domain1	Domain2	Domain3	DueDate	Description	FacultyRef	Links	College_id visible
    var fact_statement = `select Instructor_id from instructor where Person_id=(select Person_id 
        from person WHERE grno_EmpCode ='${FacultyRef}')`; 

    connection.query(fact_statement, (error, result) => {
        result = JSON.parse(JSON.stringify(result));

        let fact_id = result[0].Instructor_id;//store instructor_id
        console.log(fact_id);
        if (!error) {
            
            //insert all the industryprojects related details in the table
            const statement = ` insert into industryproject(CompanyName,Description,Domain1,DueDate,
                FacultyRef,Links,College_id,visible) values ('${CompanyName}','${Description}','${Domain1}',
                '${DueDate}','${fact_id}','${Links}',"1",True)`;

            const connection = db.connect();
            connection.query(statement, (error, result) => {
                console.log(DueDate);
                connection.end();
                res.send(utils.createResponse(error, result));

            })
        }
    });
});





//DONE
//TO GET THE INDUSTRY PROJECTS ENTERED BY PROJECT CO-ORDINATOR 
router.get('/CoordinatorIndustryProject', (request, response) => {
    const connection = db.connect();

    //const statement = `select companyname,description,duedate,domain from company where visible="True"`;
    const statement = `SELECT pd.Name as Domain1,ip.CompanyName,ip.Description,ip.DueDate, ip.Links,p.grno_EmpCode as FacultyRef FROM
    project_domain AS pd INNER JOIN industryproject AS ip ON ip.Domain1 = pd.Domain_id 
    INNER JOIN instructor as i ON i.Instructor_id=ip.FacultyRef
    INNER JOIN person as p on p.Person_id=i.Person_id
    WHERE visible= True`;

    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});






//UPDATE THE GIVEN THE INDUSTRY Checked

router.put('/CoordinatorIndustryProject', (request, response) => {
    // INDUSTRYPROJECTS TABLE -  Company_Id	CompanyName	Domain1	Domain2	Domain3	DueDate	Description	FacultyRef Links College_id visible

    const connection = db.connect();
    const { CompanyName, Domain1, DueDate, Description, FacultyRef, Links } = request.body; //from front-end

    //store instructor_id
    var fact_statement = `select Instructor_id from instructor where Person_id=(select Person_id from person
                          WHERE grno_EmpCode ='${FacultyRef}')`;
    connection.query(fact_statement, (error, result) => {
        result = JSON.parse(JSON.stringify(result));
        let fact_id = result[0].Instructor_id;
        console.log("Faculty ID :" + fact_id);
        if (!error) {

            //update the industry details by coordinator
            const statement = ` update industryproject set Description=? ,Domain1=?,DueDate=?,FacultyRef=?,Links=? 
                                 where CompanyName=?`;
            let data = [Description, Domain1, DueDate, fact_id, Links, CompanyName];

            connection.query(statement, data, (error, result) => {
                connection.end();
                console.log(data);
                response.send(utils.createResponse(error, result));

            })
        }
    })
});







//DONE
//API To delete company details from frontend only
router.put('/CoordinatorIndustryProject/:CompanyName', (request, response) => {
    const connection = db.connect();
    const { CompanyName } = request.body;

    //Remove the industry 
    const statement = ` update industryproject set visible=false where CompanyName='${CompanyName}';`;


    connection.query(statement, (error, result) => {
        console.log(result);

        connection.end();
        response.send(utils.createResponse(error, result));
    })
});






// // remaining-checking
// //To Display all the details of students for co-ordinator
// router.get('/CoordinatorGroupDetails', (request, response) => {
//     var jsonObject = {};
//     key = 'detail';
//     jsonObject[key] = [];
//     const connection = db.connect();

//     const statement = `SELECT
//     pg.final_domain,
//     pg.Group_Name,
//     p.grno_EmpCode
// FROM
//     project_group AS pg
// INNER JOIN instructor AS i
// ON
//     i.Instructor_id = pg.Instructor_id1
// INNER JOIN person AS p
// ON
//     p.Person_id = i.Person_id
// GROUP BY
//     pg.Group_id
// `;
//     connection.query(statement, (error, result) => {
//         result = JSON.parse(JSON.stringify(result));
//         jsonObject[key].push(result)
//         console.log(jsonObject[key]);
//         if (!error) {
//             const statement2 = `select grno_EmpCode , FullName from person inner join instructor as i on i.Person_id_id=p.person_id inner join project_group as pg on pg.Group_id=i.Group_id);`;
//             connection.query(statement2, (error, result) => {
//                 result = JSON.parse(JSON.stringify(result));
//                 jsonObject[key].push(result)
//                 if (!error) {
//                     const statement3 = `select grno_EmpCode from person where Person_id =(select l.Person_id from learner as l inner join project_group as pg on pg.Group_id=l.Group_id);`;
//                     connection.query(statement3, (error, result) => {
//                         result = JSON.parse(JSON.stringify(result));
//                         jsonObject[key].push(result)
//                         connection.end();

//                         response.send(utils.createResponse(error, jsonObject[key]));
//                     })
//                 }
//             })
//         }

//     })
// });





// // //To Display all the details of students for co-ordinator
// router.get('/CoordinatorGroupDetails', (request, response) => {
//     var jsonObject = {}
//     key = '';
//     jsonObject[key] = []
//     const connection = db.connect();
//     const statement = `select count(Group_id) as count from project_group  `;

//     connection.query(statement, (error, result) => {
//         result = JSON.parse(JSON.stringify(result));
//         count = result[0].count;
//         console.log(count);

//         //Gives domain,groupname,instructor of the particular groups
//         let i = 13;
//         for (let i = 15; i < 17; i++) { //INITIALIZE TO ONE
//             //key = i;
//             jsonObject[key][i] = [];
//             const statement1 = `SELECT pg.final_domain, pg.Group_Name,p.grno_EmpCode as Instructor FROM project_group AS pg 
//             INNER JOIN instructor AS i ON i.Instructor_id = pg.Instructor_id1 INNER JOIN person AS p ON  p.Person_id = i.Person_id 
//             where Group_id='${i}'`;

//             connection.query(statement1, (error, result) => {

//                 result = JSON.parse(JSON.stringify(result));
//                 console.log("CHECKING" + "=" + result);
//                 jsonObject[key][i].push(result);

//             })
//         }

//         //gives details of all the students groupwise
//         for (let j = 15; j < 17; j++) {
//             //key = j;
//             jsonObject[key][j] = [];


//             const statement2 = `Select p.grno_EmpCode from person as p inner join learner as l On l.Person_id=p.Person_id where
//              Group_id='${j}';`

//             connection.query(statement2, (error, result) => {
//                 result = JSON.parse(JSON.stringify(result));
//                 //console.log(i + "="+result);
//                 jsonObject[key][j].push(result);
//                 if (j == 16) {
//                     console.log(jsonObject);
//                     response.send(utils.createResponse(error, jsonObject[key]));
//                 }

//             })


//         }
//     })
// });






router.get('/CoordinatorGroupDetails', (request, response) => {
    const connection = db.connect();

    //const statement = `select companyname,description,duedate,domain from company where visible="True"`;
    const statement = `SELECT
    pg.Group_Name,
    pd.Name as final_domain,
    p1.grno_EmpCode as instructor,
    (select p.grno_EmpCode from person as p where p.Person_id=(SELECT person_id FROM learner as l WHERE l.Learner_id= pg.member1 )) as Member1,
    (select p.grno_EmpCode from person as p where p.Person_id=(SELECT person_id FROM learner as l WHERE l.Learner_id= pg.member2 )) as Member2,
    (select p.grno_EmpCode from person as p where p.Person_id=(SELECT person_id FROM learner as l WHERE l.Learner_id= pg.member3 )) as Member3,
    (select p.grno_EmpCode from person as p where p.Person_id=(SELECT person_id FROM learner as l WHERE l.Learner_id= pg.member4 )) as Member4
FROM
    project_group AS pg
    LEFT JOIN instructor as i on i.Instructor_id=pg.Instructor_id1
     LEFT JOIN person as p1 on i.Person_id=p1.Person_id
    INNER JOIN
    learner AS l
ON
    l.group_id = pg.Group_id
INNER JOIN person AS p
ON
    p.Person_id = l.Person_id
INNER JOIN project_domain AS pd
ON
    pd.Domain_id = pg.final_domain
GROUP BY
    pg.Group_Name`;

    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});









//done add instructor 2
//UPDATE GROUP DETAILS
router.put('/CoordinatorGroupDetails', (request, response) => {
    const connection = db.connect();

    const { final_domain, Member1, Member2, Member3, Member4, Group_Name, instructor } = request.body;
    console.log("start"+`${Member1}`);
    if(!`${Member1}`){
        console.log("Inside 1st Member");
        const memstatement=`update project_group set Member1= Null where Group_Name='${Group_Name}'`;
        connection.query(memstatement, (error, result) => {
            console.log(result);

        })
    }
    if(!`${Member2}`){
        const memstatement=`update project_group set Member2= Null where Group_Name='${Group_Name}'`;
        connection.query(memstatement, (error, result) => {
            console.log(result);

        })
    }
    if(!`${Member3}`){
        const memstatement=`update project_group set Member3= Null where Group_Name='${Group_Name}'`;
        connection.query(memstatement, (error, result) => {
            console.log(result);

        })
    }
    if(!`${Member4}`){
        const memstatement=`update project_group set Member4= Null where Group_Name='${Group_Name}'`;
        connection.query(memstatement, (error, result) => {
            console.log(result);

        })
    }

    //Store instructor_id
    var fact_statement1 = `select Instructor_id from instructor where Person_id=(select Person_id from person WHERE 
                            grno_EmpCode ='${instructor}')`;

    connection.query(fact_statement1, (error, result) => {
        result = JSON.parse(JSON.stringify(result));
        let fact_id = result[0].Instructor_id;
        console.log("Faculty ID :" + fact_id);

        if (!error) {

            //update the group id for students in learner table
            const fact_statement2 = `update learner set Group_id=(select Group_id from project_group where Group_Name='${Group_Name}') 
                                      where person_id in (select person_id from person where grno_EmpCode 
                                     in ('${Member1}','${Member2}','${Member3}','${Member4}'));`;
            connection.query(fact_statement2, (error, result) => {
                console.log(result);
                if (!error) {

                    //update the group_id null for the student removed 
                    const statement3 = `update learner set Group_id= Null where Group_id=(select Group_id from project_group where 
                                        Group_Name='${Group_Name}') and Person_id  not in (select person_id from person where grno_EmpCode
                                        in ('${Member1}','${Member2}','${Member3}','${Member4}'));`

                    connection.query(statement3, (error, result) => {
                        console.log(result);
                        if (!error) {

                            //update domain and factulty  and members in project_group
                            const statement4 = `update project_group set final_domain='${final_domain}',Instructor_id1='${fact_id}'
                             where Group_Name='${Group_Name}'`;
                            connection.query(statement4, (error, result) => {
                                console.log("LAst LOOP"+result);

                                connection.end();
                                response.send(utils.createResponse(error, result));
                            })
                        }
                        else {
                            console.log("Statement4" + error);
                        }
                    })
                }
                else {
                    console.log("Statement3" + error);
                }


            })
        }
        else {
            console.log("Outermost" + error);
        }
    })
});









//To Display Queries by students for Co-ordinator
router.get('/CoordinatorSupport', (request, response) => {
    //Support_id Group_id Learner_id Support_Description_id Resolved


    const connection = db.connect();

    const statement = `select pg.Group_Name, p.grno_EmpCode, sd.Support_Description_Name 
    from support as s join support_reason as sd 
    on s.Support_Description_id = sd.Support_Description_id INNER JOIN learner as l on s.Learner_id=l.Learner_id 
    INNER JOIN person as p on p.Person_id=l.Person_id  INNER JOIN project_group as pg on pg.Group_id=l.group_id
    WHERE s.resolved = False; `;

    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});








//query Responded or not API DONE
router.put('/CoordinatorSupport', (request, response) => {
    const connection = db.connect();
    const { grno_EmpCode } = request.body;
    console.log("Gr Number " + grno_EmpCode);

    const statement = ` update support set Resolved = True where Learner_id =(select Learner_id from person where grno_EmpCode = '${grno_EmpCode}')`;


    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});


module.exports = router