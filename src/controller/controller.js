const worker = require('../worker/worker');
const models = require('../model/model')

const upload = async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).send({status: false, message: 'CSV File Missing'});
      }
      const fileName = req.file.originalname;
      if (!fileName.endsWith('.csv')) {
      return res.status(400).send({ status: false, message: 'Invalid file format. Only CSV files are allowed.' });
      }
      await worker(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send({status: false, message: 'An error occurred while aprocessing request'});
    }
  };

const searchPolicyByUser = async (req, res) => {
    try {
      const { username } = req.query;
  
      const user = await models.User.findOne({ firstName: { $regex: new RegExp(username, 'i') } }, '_id').exec();
      if (!user) {
        return res.status(404).send({ status: false, message: "User Not Found" });
      }
  
      const policyInfo = await models.PolicyInfo.find({ userId: user._id }, { _id: 0, __v: 0 }).lean().exec();
  
      res.status(200).send({ status: true, message: "Fetched Successfully", count: policyInfo.length, data: policyInfo });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: 'An error occurred while searching policy by user' });
    }
  };
  


const aggregatePoliciesByUser = async (_req, res) => {
    try {
      const aggregatedPolicies = await models.PolicyInfo.aggregate([
        {
          $group: {
            _id: '$userId',
            policyCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            userId: '$_id',
            policyCount: 1,
          },
        },
      ]).exec();
      res.status(200).send({ status: true, message: "Fetched Successfully", count:aggregatedPolicies.length, data: aggregatedPolicies });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: 'An error occurred while aggregating policies by user' });
    }
};
  
  
  module.exports = { upload, searchPolicyByUser, aggregatePoliciesByUser};