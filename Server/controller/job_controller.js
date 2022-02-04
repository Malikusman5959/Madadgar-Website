const Job = require("../model/Post");
const response = require("../model/Responses");
const serviceProvider = require("../model/ServiceProivder");
const {newJobNotification}= require("../utils/notificationActions");
const {newResponseNotification}= require("../utils/notificationActions");
const {hireNotification}= require("../utils/notificationActions");
const HiredHelper = require("../model/HiredHelper")

//Create a job

exports.addPost = async function (req, res) {
  // try {
  //   const JobPost = await Job.create(req.body);
  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       post_created: JobPost,
  //     },
  //   });
  // } catch (e) {
  //   res.status(400).json({
  //     status: "Job posting unsuccessful",
  //     message: e,
  //   });
  // }
  try {
    const custId= req.body.customerId;

    const title= req.body.title;
    const JobPost = await Job.create(req.body);
    

    console.log(req.body)
    if(req.body.skills!=="" || req.body.skills!==null) {
    var serviceProviders = await serviceProvider.find({
      skill: { $in: [req.body.skills ]}
    });

  
    
    if(!serviceProviders){
      res.status(404).send('Service Providers with such skills not found');
   }
   else{
    await newJobNotification( JobPost._id, serviceProviders, custId, title );
   }
  }
   res.status(201).json({
    status: "success",
    data: {
      post_created: JobPost,
    },
  });
  } catch (e) {
    res.status(400).json({
      status: "Job posting unsuccessful",
      message: e,
    });
  }
};

//Get All jobs
exports.allPostedJobs = async function (req, res) {
  try {
    var postedJobs = await Job.find().populate(['customerId', 'serviceProvidersId']);
    const allPostedJobs = Object.keys(postedJobs).length;
    res.status(201).json({
      status: "success",
      total: allPostedJobs,
      data: {
        joblist: postedJobs,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "failed to get data from db",
    });
  }
};

//send 
exports.addResponse = async function (req, res) {
  try {
    const JobResponse = await response.create(req.body);

    console.log(JobResponse);
    const sp = JobResponse.ServiceProviderId;

    var job = await Job.findOne({
      _id: JobResponse.jobId
    });
    const customer= job.customerId;
    console.log("Job details are: "+ job);
    
    await newResponseNotification( JobResponse.jobId, customer,sp, job.title );
    res.status(201).json({
      status: "success",
      data: {
        responses: JobResponse,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Response generation unsuccessful",
      message: e,
    });
  }
};


//send job responses to customer
exports.allResponses = async function (req, res) {
  try {
    var postedResponses = await response.find().populate(['ServiceProviderId', 'jobId']);
    const allPostedResponses = Object.keys(postedResponses).length;
    res.status(201).json({
      status: "success",
      total: allPostedResponses,
      data: {
        posted_response: postedResponses,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "failed to get data from db",
    });
  }
};


// data of service providers hows skills matc with the post
exports.getmatchedskilledHelpers = async function (req, res) {

  try {
    var skilledHelper = await serviceProvider.find({
      skill: { $in: req.body.skills }
    }).exec();
    res.status(201).json({
      status: "success",
      exist: skilledHelper != "" ? true : false,
      data: {
        provider: skilledHelper,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};


exports.allRelatedJobs = async function (req, res) {

  try {
    var job = await Job.find({
      skills: { $in: req.body.skills }
    }).exec();
    res.status(201).json({
      status: "success",
      exist: job != "" ? true : false,
      data: {
        joblist: job,
      },
    });

  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.allPostedJobsByCustomerId = async function (req, res) {

  try {
    var query = require("url").parse(req.url, true).query;
    var id = query.id;
    var job = await Job.find({
      customerId: id
    }).populate(["customerId" , "serviceProvidersId"]).exec();
    res.status(201).json({
      status: "success",
      exist: job != "" ? true : false,
      data: {
        joblist: job,
      },
    });

  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};


exports.allRequestedJobsBySPId = async function (req, res) {

  try {
    var query = require("url").parse(req.url, true).query;
    var id = query.id;
    var job = await Job.find({
      serviceProvidersId: id
    }).populate('customerId').exec();
    res.status(201).json({
      status: "success",
      exist: job != "" ? true : false,
      data: {
        joblist: job,
      },
    });

  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};


exports.updateJobStatusByID = async function (req, res) {

  var query = require("url").parse(req.url, true).query;
  var id = query.id;
  
  try {
    
    var job = await Job.findByIdAndUpdate(
      id,
      req.body
    );

    

    res.status(201).json({
      status: "success",
      body: req.body,
      data: {
        job : job,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};


exports.addJobSP = async function (req, res) {

  var query = require("url").parse(req.url, true).query;
  var id = query.spId;

  try {
    
    var job = await Job.findByIdAndUpdate(
      id,
      req.body
    );

    res.status(201).json({
      status: "success",
      data: {
        job : job,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};


exports.updateJobContractById = async function (req, res) {

  var query = require("url").parse(req.url, true).query;
  var id = query.jobId;

  try {
    
    var job = await Job.findByIdAndUpdate(
      id,
      req.body
    );

    res.status(201).json({
      status: "success",
      data: {
        job : job,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};




exports.addHiredJob = async function (req, res) {
  try {
    const HireJob = await HiredHelper.create(req.body);
    console.log("hire job details:"+ HireJob);
    var job = await Job.findOne({
      _id: HireJob.jobId
    });
    console.log("job details:"+ job);
   await hireNotification( HireJob.jobId, HireJob.serviceProviderId, HireJob.customerId, job.title );

    res.status(201).json({
      status: "success",
      data: {
        HiredJob: HireJob,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Job posting unsuccessful",
      message: e,
    });
  }
};

exports.getHiredHelper = async function (req, res) {

  var query = require("url").parse(req.url, true).query;
  var jobId = query.jobId;

  try {
    var HiredJob = await HiredHelper.find({
      jobId: jobId
    }).populate(['serviceProviderId', 'jobId', 'customerId']);
    const count = Object.keys(HiredJob).length;
    res.status(201).json({
      status: "success",
      total: count,
      data: {
        hired_jobs: HiredJob,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "failed to get data from db",
    });
  }
};


exports.getCurrentJobsbySpId = async function (req, res) {

  var query = require("url").parse(req.url, true).query;
  var spId = query.spId;

  try {
    var jobs = await HiredHelper.find({
      serviceProviderId: spId
    }).populate(['serviceProviderId', 'jobId', 'customerId']);
    const count = Object.keys(jobs).length;
    res.status(201).json({
      status: "success",
      total: count,
      data: {
        Sp_jobs: jobs,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "failed to get data from db",
    });
  }
};