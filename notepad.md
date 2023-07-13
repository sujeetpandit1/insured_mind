**---Process To Clone and start the server---**

Step 1 : Clone The project to local machine;
Step 2 : Update all necessary dependency by using "NPM UPDATE", (it will update all dependency);
Step 3 : Install dotenv
Step 4 : Replace this environment "MONGODB_URI =mongodb+srv://yourcluster";
Step 5 : Run this by "NPM RUN DEV"; local server will started.


**--**
Document for Task 1 and Task 2:

Task 1:
The given code implements an API server using Express.js and MongoDB. It allows users to upload a CSV file containing user and policy data. The uploaded data is processed, and relevant information is stored in the MongoDB database. Users can then search for policies by username and aggregate policies by user. Let's understand each component and its functionality:

1. `index.js`:
   - Initializes the Express application and sets up the server.
   - Configures environment variables using `dotenv`.
   - Connects to the MongoDB database using Mongoose.
   - Sets up middleware and routes.
   - Starts the server to listen for incoming requests.

2. `route.js`:
   - Defines the routes and their corresponding handlers using an Express Router.
   - Specifies routes for uploading a CSV file, searching for policies by user, aggregating policies by user, and a testing route.
   - Handles 404 errors for invalid routes.

3. `model.js`:
   - Defines Mongoose schemas for different collections representing entities such as `Agent`, `User`, `UserAccount`, `PolicyCategory`, `PolicyCarrier`, and `PolicyInfo`.
   - These schemas define the structure and data types for each collection.

4. `worker.js`:
   - Contains the main logic for processing the uploaded CSV file and saving the data to the respective collections.
   - Utilizes the `csv-parser` module to parse the CSV file.
   - Iterates over each row of data, creates corresponding objects based on the data, and saves them to the appropriate collections using Mongoose models.
   - Extracts unique agent names from the CSV file and saves them to the `Agent` collection.
   - Handles errors and sends appropriate responses.

5. `controller.js`:
   - Contains the controller functions for handling API requests related to the main task.
   - The `upload` function processes the uploaded CSV file using the `worker` function.
   - The `searchPolicyByUser` function searches for policies based on a provided username and returns the corresponding policy information.
   - The `aggregatePoliciesByUser` function aggregates policies by user and returns the count of policies for each user.
   - Handles errors and sends appropriate responses.

**--API LIST --**
Using Postman:-
1. for uploading csv: http://localhost:4000/upload
    Key: csv
    Value: select your .CSV File (make sure it's under "Files" tab)
    Method Type : POST

    Response:-
    {
        "status": true,
        "message": "CSV data uploaded and processed successfully"
    }
2. For Searching :- http://localhost:4000/search
    Request Body Parameters:
    Key: username
    Value: Enter any name you want search like "ebel"
    Method type: GET
    Response:- If there exists an entry with that user-name then response will be like this:
    {
        "status": true,
        "message": "Fetched Successfully",
        "count": 1,
        "data": [
            {
                "policyNumber": "QGNX6OZH7T29",
                "policyStartDate": "2018-06-30",
                "policyEndDate": "2019-06-30",
                "policyCategory": "64af8705004594c48c283f77",
                "collectionId": "NC",
                "companyCollectionId": "27295",
                "userId": "64af8705004594c48c284029"
            }
        ]
    }

3. For Aggregate Searching :- http://localhost:4000/aggregate
    Method type: GET
    Response:- If there exists an entry with that user-name then response will be like this:
    {
    "status": true,
    "message": "Fetched Successfully",
    "count": 1198,
    "data": [
        {
            "policyCount": 1,
            "userId": "64af83ea75c94ab8c89340a9"
        },
        {
            "policyCount": 1,
            "userId": "64af83ea75c94ab8c8933804"
        }, many more]
    }

Task 2:
CPU Real-Time Track- There also coded for Track real-time CPU utilization of the node server and on 70% usage restart the server.

The given code implements a scheduling task that involves saving and transferring messages between two collections in a MongoDB database. Let's understand each component and its functionality:

1. `task2model.js`:
   - Defines Mongoose schemas for two collections specific to the task at hand, namely `Collection1` and `Collection2`.
   - These schemas have a single field, `message`, which is required and stores the message to be scheduled and transferred.

2. `task2Controller.js`:
   - Contains the controller function for handling API requests specific to the task at hand.
   - The `schedule` function receives a message, day, and time in the request body.
   - It validates the timestamp and schedules a job using `setTimeout` to transfer the message from `Collection1` to `Collection2` at the specified time.
   - Handles errors and sends appropriate responses.

**--API LIST --**
Using Postman:-
1. For Scheduling link:- http://localhost:4000/schedule
   Element to be passed through body:
    {
        "message": "OK tested",
        "day": "13-07-2023",
        "time": "10:42:00"
    }

    Response:-
    {
        "status": true,
        "message": "Job scheduled successfully"
    }



The overall flow of the application is as follows:
1. The server starts running, and the MongoDB database is connected.
2. Requests are received through defined routes.
3. For Task 1, a CSV file is uploaded, and the data is processed using the `worker` function, which saves the data to the appropriate collections and extracts unique agent names.
4. API requests for searching policies by user or aggregating policies by user are handled by the corresponding controller functions, which interact with the database models and send the response.
5. For Task 2, API requests to schedule a message transfer are handled by the `schedule` function, which saves the message to `Collection1` and schedules a job to transfer it to `Collection2` at the specified time.
6. Error handling is implemented throughout the application, ensuring appropriate responses are sent in case of errors.

This document provides an overview of the code structure, its purpose, and how the different files interact to implement Task 1 and Task 2.