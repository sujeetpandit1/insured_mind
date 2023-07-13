const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const route = require('./routes/route');
const osUtils = require('os-utils');

mongoose.set('strictQuery', false);

app.use(express.json());
const upload = multer({ dest: path.join(__dirname, 'uploads') });

mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB is Connected');
    app.listen(process.env.PORT || 4000, () => {
    console.log(`Running at http://localhost:${process.env.PORT || 4000}`);
    });
    })
    .catch((err) => {
    console.log(err.message);
    });
    
    app.use((req, res, next) => {
      upload.single('csv')(req, res, function (err) {
        if (err) {
          if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Multer Error: ' + err.message });
          } 
        }
        next();
      });
    });
    app.use('/', route);

    // Track CPU utilization and restart the server at 70% usage
    const checkCpuUtilization = () => {
      osUtils.cpuUsage((usage) => {
        if (usage > 0.7) {
          console.log('CPU usage is high. Restarting the server...');
          process.exit(0); // Restart the server 
        }
      });
    };
    
    setInterval(checkCpuUtilization, 1000); // Check CPU utilization every second