// const csv = require('csv-parser');
// const fs = require('fs');
// const { Agent, User, UserAccount, PolicyCategory, PolicyCarrier, PolicyInfo } = require('../model/model');

// const worker = async (req, res) => {
//   const { path } = req.file;

//   try {
//     const results = [];

//     fs.createReadStream(path) 
//       .pipe(csv())
//       .on('data', async (row) => {
//         results.push(row);
        
//         await User.create({
//           firstName: row.firstname,
//           dob: row.dob,
//           address: row.address,
//           phoneNumber: row.phone,
//           state: row.state,
//           zipCode: row.zip,
//           email: row.email,
//           gender: row.gender,
//           userType: row.userType
//         });

//         await UserAccount.create({ accountName: row.account_name });
//         await PolicyCategory.create({ categoryName: row.category_name });
//         await PolicyCarrier.create({ companyName: row.company_name });
//         await PolicyInfo.create({
//           policyNumber: row.policy_number,
//           policyStartDate: row.policy_start_date,
//           policyEndDate: row.policy_end_date,
//           policyCategory: await PolicyCategory.findOne({ categoryName: row.category_name }),
//           collectionId: row.state,
//           companyCollectionId: row.zip,
//           userId: await User.findOne({ firstName: row.firstname }),
//         });
//       })
//       .on('end', async () => {
//         fs.unlinkSync(path); // Remove the uploaded file after processing

//         const uniqueAgents = [];

//         for (let i = 0; i < results.length; i++) {
//           const agent = results[i].agent;

//           if (!uniqueAgents.includes(agent)) {
//             uniqueAgents.push(agent);
//           }
//         }

//         for (let i = 0; i < uniqueAgents.length; i++) {
//           const agent = uniqueAgents[i];

//           const existingAgent = await Agent.findOne({ name: agent });

//           if (!existingAgent) { 
//             await Agent.create({ name: agent });
//           }
//         }

//         res.status(201).send({status: true, message:'CSV data uploaded and processed successfully'});
//       });
//   } catch (error) {
//     // console.error(error);
//     res.status(500).send({status: false, message:'An error occurred while processing the CSV data'});
//   }
// };
 
// module.exports = worker; 

const csv = require('csv-parser');
const fs = require('fs');
const {
  Agent,
  User, 
  UserAccount,
  PolicyCategory,
  PolicyCarrier,
  PolicyInfo,
} = require('../model/model');

const worker = async (req, res) => {
  const { path } = req.file;

  try {
    const results = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', async (row) => {
         results.push(row);
          const user = {
            firstName: row.firstname,
            dob: row.dob,
            address: row.address,
            phoneNumber: row.phone,
            state: row.state,
            zipCode: row.zip,
            email: row.email,
            gender: row.gender,
            userType: row.userType,
          };

          await Promise.all([
            User.create(user),
            UserAccount.create({ accountName: row.account_name }),
            PolicyCategory.create({ categoryName: row.category_name }),
            PolicyCarrier.create({ companyName: row.company_name }),
            PolicyInfo.create({
              policyNumber: row.policy_number,
              policyStartDate: row.policy_start_date,
              policyEndDate: row.policy_end_date,
              policyCategory: await PolicyCategory.findOne({
                categoryName: row.category_name,
              }),
              collectionId: row.state,
              companyCollectionId: row.zip,
              userId: await User.findOne({ firstName: row.firstname }),
            }),
          ]);
        })
        .on('end', () => {
          fs.unlinkSync(path); // Remove the uploaded file after processing

            const uniqueAgents = [];

            for (let i = 0; i < results.length; i++) { 
                const agent = results[i].agent;

                if (!uniqueAgents.includes(agent)) { 
                    uniqueAgents.push(agent);
                }
                }
                uniqueAgents.forEach(async (agent) => {
                  const existingAgent = await Agent.findOne({ name: agent });
                
                  if (!existingAgent) {
                    await Agent.create({ name: agent });
                  } 
                });
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });


    res.status(201).send({
      status: true,
      message: 'CSV data uploaded and processed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: 'An error occurred while processing the CSV data',
    });
  }
};

module.exports = worker;
