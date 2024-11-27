const mongoose = require('mongoose');
let chai = require('chai');
//let mocha= require('mocha')
let chaiHttp = require('chai-http');
let expect = chai.expect;
let server = require('../index');

const Application = require('../models/application'); 
const User=require('../models/user'); 
const Job=require('../models/job'); 


chai.should();
chai.use(chaiHttp);

describe('Tasks API', function() {
    this.timeout(10000);

    describe("GET /api/v1/users/fetchapplications" , () => {

        it("IT SHOULD RETURN ALL THE APPLICATIONS" , (done) => {
            // const task = {
            //     email:'shaangzb@gmail.com',
            //     password:'123',
                
            // };

            chai.request('http://localhost:8000')
                .get("/api/v1/users/fetchapplications")
                
                .end((err,response) => {
                    
                    response.body.should.be.a('object');
                    response.body.should.have.property('application').that.is.an('array');
    
                    console.log('*********',response.body)
                  

                done();

                });
        })

    })

    describe('POST /api/v1/users/deleteaplications', function() {
        this.timeout(10000);

        beforeEach(async () => {
            // Set up: Add test applications to the database
            console.log('Deleting applications...');
            await Application.deleteMany({});
            console.log('Seeding applications...');
            console.log('Setup complete');
            await Application.create([
                
                {_id:'637e1b2d9f1b8a3e12345678',
                    jobid:'6893a6172c15c4520ef1779a',
                    jobname:"Student Cashier",
                    applicantid:"6743a497555194d8de1a4d1b",
                    applicantname:"Evan",
                    applicantemail:"evan@gmail.com",
                    applicantskills:"Python",
                    phonenumber:"",
                    managerid:"67838d603bc4520ef17718",
                    address:"",
                    hours:"",
                    dob:"",
                    gender:""
                    }
                

            ]);
        });
    
        afterEach(async () => {
            // Clean up: Remove test data from the database
            await Application.deleteMany({});
        });
    
        it('should delete an application successfully', (done) => {
            this.timeout(5000);
            chai.request('http://localhost:8000')
                .post("/api/v1/users/deleteapplication/") // Adjust the endpoint URL
                .send({ applicationId: '637e1b2d9f1b8a3e12345678' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('message', 'Application deleted successfully');
                    
                    // Verify that the application was deleted
                    Application.findById('637e1b2d9f1b8a3e12345678')
                        .then((application) => {
                            expect(application).to.be.null;
                            done();
                        })
                        .catch(done);
                });
        });
    });

    describe('POST /api/v1/users/createapplication', () => {
        it('should create an application successfully', (done) => {
            // Sample application data
            const newApplication = {_id:'637e1b2d9f1b8a3e12345678',
                jobid:'6893a6172c15c4520ef1779a',
                jobname:"Student Cashier",
                applicantid:"6743a497555194d8de1a4d1b",
                applicantname:"Evan",
                applicantemail:"evan@gmail.com",
                applicantskills:"Python",
                phonenumber:"",
                managerid:"67838d603bc4520ef17718",
                address:"",
                hours:"",
                dob:"",
                gender:""
                };
            chai.request('http://localhost:8000')
            .post('/api/v1/users/createapplication')  // Your endpoint for creating an application
            .send(newApplication)  // Sending the application data
            .end((err, res) => {
                // Ensure there is no error
                expect(err).to.be.null;

                // Check the status code
                res.should.have.status(200);  // Expecting 201 for successful creation

                // Ensure the response body is a JSON object
                res.body.should.be.a('object');

                // Check that the response contains a success message
                res.body.should.have.property('message').eql('Application created successfully');

                // Check that the response contains the created application data
                res.body.data.should.have.property('application');
                res.body.data.application.should.have.property('jobname').eql('Student Cashier');
                res.body.data.application.should.have.property('applicantname').eql('Evan');
                res.body.data.application.should.have.property('applicantemail').eql('evan@gmail.com');


            

                done();
            });
    });
});


// describe('POST /api/v1/users/acceptapplication', function () {
//     this.timeout(10000);

    
//     console.log("hi")

//     beforeEach(async () => {
//         // Set up: Seed the database with a test application
//         console.log('Seeding application...');
//         await Application.deleteMany({}); // Clear any existing applications
//         const applicationId =mongoose.Types.ObjectId('617e1b2d9f1b8a3e12345678'); // Save the ID for testing

//         await Application.create([
                
//                             {_id:applicationId,
//                                 jobid:'6893a6172c15c4520ef1779a',
//                                 jobname:"Student Cashier",
//                                 applicantid:"6743a497555194d8de1a4d1b",
//                                 applicantname:"Evan",
//                                 applicantemail:"evan@gmail.com",
//                                 applicantskills:"Python",
//                                 phonenumber:"",
//                                 managerid:"67838d603bc4520ef17718",
//                                 address:"",
//                                 hours:"",
//                                 dob:"",
//                                 gender:""
                                
//                                 }
                            
            
//                         ]);

//         // console.log('Application seeded:', applicationId);
//     });

//     afterEach(async () => {
//         // Clean up: Remove test data from the database
//         console.log('Cleaning up applications...');
//         //await Application.deleteMany({});
//     });

//     it('should update the application status successfully', (done) => {
//         this.timeout(5000);
//         const applicationId =mongoose.Types.ObjectId('617e1b2d9f1b8a3e12345678'); // Save the ID for testing
//         //const id = mongoose.Types.ObjectId('63467107fae98b57d082e83e');

//         const body={ applicationId:applicationId }
//         chai.request('http://localhost:8000')
//             .post("/api/v1/users/acceptapplication") // Replace with your actual endpoint URL
//             .type('application/json')
//             .send({ applicationId:applicationId }) // Send applicationId in the request body
//             .end((err, res) => {
//                 if (err) done(err);

//                 // Assert the response
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.be.an('object');
//                 expect(res.body).to.have.property('success', true);
//                 expect(res.body).to.have.property('message', 'Application is updated Successfully');
//                 expect(res.body.data).to.have.property('application');

//                 // Assert the application's updated status
//                 const updatedApplication = res.body.data.application;
//                 expect(updatedApplication).to.have.property('status', '1'); // Status should be updated to '1'

//                 // Verify the application in the database
//                 Application.findById(applicationId)
//                     .then((application) => {
//                         expect(application).to.not.be.null;
//                         expect(application.status).to.equal('1'); // Confirm status in the database
//                         done();
//                     })
//                     .catch(done);
//             });
//     });

    // it('should return an error if applicationId is invalid', (done) => {
    //     chai.request('http://localhost:8000')
    //         .post('/api/v1/users/acceptapplication') // Replace with your actual endpoint URL
    //         .send({ applicationId: 'invalid_id' }) // Send an invalid ID
    //         .end((err, res) => {
    //             // Assert the response
    //             expect(res).to.have.status(500);
    //             expect(res.body).to.be.an('object');
    //             expect(res.body).to.have.property('message', 'Internal Server Error');
    //             done();
    //         });
    // });
// });


    describe("GET /api/v1/users/" , () => {

        it("IT SHOULD RETURN ALL THE JOBS" , (done) => {
            // const task = {
            //     email:'shaangzb@gmail.com',
            //     password:'123',
                
            // };

            chai.request('http://localhost:8000')
                .get("/api/v1/users/")
                
                .end((err,response) => {
                    
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eql('List of jobs');
                    response.body.should.have.property('jobs');

    
                    console.log('*********',response.body)
                  

                done();

                });
        })

    })

    describe("GET /api/v1/users/" , () => {

        it("IT SHOULD RETURN ALL THE JOBS" , (done) => {
            // const task = {
            //     email:'shaangzb@gmail.com',
            //     password:'123',
                
            // };

            chai.request('http://localhost:8000')
                .get("/api/v1/users/")
                
                .end((err,response) => {
                    
                    response.body.should.be.a('object');
    
                    console.log('*********',response.body)
                  

                done();

                });
        })

    })

    describe("POST /api/v1/users/createjob" , function(){
        this.timeout(20000)

        beforeEach(async () => {
            // Set up: Add test applications to the database
            console.log('Deleting applications...');
            await User.deleteMany({});
            console.log('Seeding applications...');
            console.log('Setup complete');

            const id = mongoose.Types.ObjectId('63467107fae98b57d082e83e');


            await User.create([
                
                {
                    _id:id,
                    email:"user@gmail.com",
                    isVerified:true,
                    password:"password",
                    name:"Chris",
                    role:"Applicant",
                    address:"",
                    phonenumber:"",
                    hours:"",
                    gender:"",
                    availability:"",
                    affiliation:"dining",
                    skills:"Communication",
                    __v:3
                }
                

            ]);
        });

        afterEach(async () => {
            // Clean up: Remove test data from the database
            await User.deleteMany({});
        });

        it("IT SHOULD RETURN THE JOB" , (done) => {
            const id = mongoose.Types.ObjectId('63467107fae98b57d082e83e');

            const body = {
                
                id:id,
                
                name:"Student Barista",
                
                managerAffilication:"nc-state-dining",
                status:"closed",
                location:"Talley",
                description:"Student barista",
                pay:"10",
                requiredSkills:"Organizational Skills",
                type:"part-time",
                question1:"Have you worked at Campus Enterprises before?",
                question2:"Do you have any experience as a Barista?",
                question3:"Student ID?",
                question4:"Course?",
                
                
                
            };

            chai.request('http://localhost:8000')
                .post("/api/v1/users/createjob")
                .send(body)
                .end((err,response) => {
                    
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eql('Job Created!!');
                    //res.body.data.job.should.have.property('managerid').eql('1234556');


                    console.log('*********',response.body)
                  

                done();

                });
        })

    })

    describe("POST /api/v1/users/closejob" , function(){
        this.timeout(20000)

        beforeEach(async () => {
            // Set up: Add test applications to the database
            console.log('Deleting applications...');
            await User.deleteMany({});
            await Job.deleteMany({});
            console.log('Seeding applications...');
            console.log('Setup complete');

            const id = mongoose.Types.ObjectId('62467107fae98b56d082e83e');

            await User.create([
                
                {
                    _id:id,
                    email:"user@gmail.com",
                    isVerified:true,
                    password:"password",
                    name:"Chris",
                    role:"Applicant",
                    address:"",
                    phonenumber:"",
                    hours:"",
                    gender:"",
                    availability:"",
                    affiliation:"dining",
                    skills:"Communication",
                    __v:4
                }
                

            ]);
            await Job.create([
                
                {
                _id:id,
                id:id,
                name:"Student Barista",
                managerid:id,
                managerAffilication:"nc-state-dining",
                status:"open",
                location:"Talley",
                description:"Student barista",
                pay:"10",
                requiredSkills:"Organizational Skills",
                type:"part-time",
                question1:"Have you worked at Campus Enterprises before?",
                question2:"Do you have any experience as a Barista?",
                question3:"Student ID?",
                question4:"Course?"
                }
               
            ]);
        });

        afterEach(async () => {
            // Clean up: Remove test data from the database
            await User.deleteMany({});
            await Job.deleteMany({});
        });

        it("IT SHOULD CLOSE THE JOB" , (done) => {
            const id = mongoose.Types.ObjectId('62467107fae98b56d082e83e');

            const body = {
                jobid:"62467107fae98b56d082e83e"
            };
            chai.request('http://localhost:8000')
                .post("/api/v1/users/closejob")
                .send(body)
                .end((err,response) => {
                    
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eql('Job is updated Successfully');
                    //res.body.data.job.should.have.property('managerid').eql('1234556');


                    console.log('*********',response.body)
                  

                done();

                });
        })

    })


    describe("GET /api/v1/users/search" , () => {

        it("IT SHOULD RETURN THE SEARCHED JOB" , (done) => {
            const body = {
                
                name: 'Shaan',
                managerid: '1234556',
                skills: 'C,java',
                location: 'Noida',
                description: 'xyz',
                pay: '10',
                schedule: '10/10/10',
                
            };

            chai.request('http://localhost:8000')
                .get("/api/v1/users/search/TA")
                // .send(body)
                .end((err,response) => {
                    
                    response.body.should.be.a('object');

                    console.log('*********',response.body.users)
                  

                done();

                });
        })

    })

    describe("POST /api/v1/users/create-session" , () => {

        it("IT SHOULD RETURN THE USER" , (done) => {
            const body = 
                {email:'boss@gmail.com',
                password:'123',
                
        };
            chai.request('http://localhost:8000')
                .post("/api/v1/users/create-session")
                .send(body)
               
                .end((err,response) => {
                    
                    response.body.should.be.a('object');
                    console.log('*********',response.body)
                  

                done();

                });
        })

    })

    describe("GET /api/v1/users/" , () => {

                it("IT SHOULD RETURN ALL THE MANAGERS" , (done) => {
                
        
                    chai.request('http://localhost:8000')
                        .get("/api/v1/users/getmanagers")
                        
                        .end((err,response) => {
                            
                            response.body.should.be.a('object');
                            response.body.should.have.property('message').eql('The Managers list');
                            response.body.data.should.have.property('managers');
        
            
                            console.log('*********',response.body)
                          
        
                        done();
        
                        });
                })
        
            })

            describe('POST /api/v1/users/deletemanager', function() {
                        this.timeout(10000);
                
                        beforeEach(async () => {
                            // Set up: Add test applications to the database
                           // console.log('Deleting applications...');
                            await User.deleteMany({});
                            // console.log('Seeding applications...');
                            // console.log('Setup complete');
                
                            const id = mongoose.Types.ObjectId('63467107fae98b57d082e83e');
                
                
                            await User.create([
                                
                                {
                                    _id:id,
                                    email:"user@gmail.com",
                                    isVerified:true,
                                    password:"password",
                                    name:"Chris",
                                    role:"Applicant",
                                    address:"",
                                    phonenumber:"",
                                    hours:"",
                                    gender:"",
                                    availability:"",
                                    affiliation:"",
                                    skills:"Communication"
                                }
                                
                
                            ]);
                        });
                    
                        afterEach(async () => {
                            // Clean up: Remove test data from the database
                            await User.deleteMany({});
                        });
                    
                        it('should delete manager successfully', (done) => {
                            this.timeout(5000);
                            chai.request('http://localhost:8000')
                                .post("/api/v1/users/deletemanager/") // Adjust the endpoint URL
                                .send({ managerId: '63467107fae98b57d082e83e' })
                                .end((err, res) => {
                                    expect(res).to.have.status(200);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).to.have.property('success', true);
                                    expect(res.body).to.have.property('message', 'Manager deleted successfully');
                                    
                                    // Verify that the application was deleted
                                    User.findById('63467107fae98b57d082e83e')
                                        .then((manager) => {
                                            expect(manager).to.be.null;
                                            done();
                                        })
                                        .catch(done);
                                });
                        });
                    });


    

})