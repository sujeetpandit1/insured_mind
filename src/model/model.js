const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false, 
  },
  dob: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
    required: false,
  },
});

const userAccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: false,
  },
});

const policyCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: false,
  },
});

const policyCarrierSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false,
  },
});

const policyInfoSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: false,
  },
  policyStartDate: {
    type: String,
    required: false,
  },
  policyEndDate: {
    type: String,
    required: false,
  },
  policyCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PolicyCategory',
    required: false,
  },
  collectionId: {
    type: String,
    required: false,
  },
  companyCollectionId: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

const Agent = mongoose.model('Agent', agentSchema);
const User = mongoose.model('User', userSchema);
const UserAccount = mongoose.model('UserAccount', userAccountSchema);
const PolicyCategory = mongoose.model('PolicyCategory', policyCategorySchema);
const PolicyCarrier = mongoose.model('PolicyCarrier', policyCarrierSchema);
const PolicyInfo = mongoose.model('PolicyInfo', policyInfoSchema);

module.exports = {Agent, User, UserAccount, PolicyCategory, PolicyCarrier, PolicyInfo};
