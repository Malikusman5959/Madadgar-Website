const ServiceProivder = require("../model/ServiceProivder");

// Methods
// addProvider
// allProviders
// getMemeberByID
// updateMemberByID
// addMember

exports.addProvider = async function (req, res) {
  try {
    const serviceProvider = await ServiceProivder.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        servce_provider: serviceProvider,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

// get All memebers
exports.allProviders = async function (req, res) {
  try {
    var serviceProvider = await ServiceProivder.find();
    const allProviders = Object.keys(serviceProvider).length;
    res.status(201).json({
      status: "success",
      total: allProviders,
      data: {
        providers: serviceProvider,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.getServiceProviderByEmail = async function (req, res) {
  try {
    var serviceProvider = await ServiceProivder.findOne({
      email: req.body.email,
      password: req.body.password,
    }).exec();
    res.status(201).json({
      status: "success",
      exist: serviceProvider != "" ? true : false,
      data: {
        provider: serviceProvider,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.getServiceProviderById = async function (req, res) {
  try {
    var serviceProvider = await ServiceProivder.find({
      _id: req.params.id,
    }).exec();
    res.status(201).json({
      status: "success",
      exist: serviceProvider != "" ? true : false,
      data: {
        provider: serviceProvider,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
exports.searchServiceProvider = async function (req, res) {
  try {
    console.log(req.body);
    var serviceProvider = await ServiceProivder.find({
      skills: { $in: req.body.skills },
      city: req.body.city,
    })
      // .sort({ rating: -1 })
      .exec();

    res.status(201).json({
      status: "success",
      exist: serviceProvider != "" ? true : false,
      total: Object.keys(serviceProvider).length,
      data: {
        provider: serviceProvider,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.getServiceProviderByType = async function (req, res) {

  var query = require("url").parse(req.url, true).query;
  var type = query.type;

  try {

    var serviceProvider = await ServiceProivder.find({
      user_type: type
      
    })
      .exec();

    res.status(201).json({
      status: "success",
      exist: serviceProvider != "" ? true : false,
      total: Object.keys(serviceProvider).length,
      data: {
        provider: serviceProvider,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.updateServiceproviderByID = async function (req, res) {
  try {
    var members = await ServiceProivder.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(201).json({
      status: "success",
      data: {
        servce_provider : members,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.searchServiceProviderBySkills = async function (req, res) {
  
  try {
    console.log(req.body);
    var serviceProvider = await ServiceProivder.find({
      skill: { $in: req.body.skills },
    })
      .sort({ rating: -1 })
      .exec();

    res.status(201).json({
      status: "success",
      exist: serviceProvider != "" ? true : false,
      total: Object.keys(serviceProvider).length,
      data: {
        provider: serviceProvider,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};