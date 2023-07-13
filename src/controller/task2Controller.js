const {Collection1, Collection2} = require('../model/task2Model');

const schedule = async (req, res) => {
    try {
      const { message, day, time } = req.body;
  
      if (!message || !day || !time) {
        return res.status(400).send({ status: false, message: 'Invalid request. Please provide message, day, and time.' });
      }
  
      const [dayPart, monthPart, yearPart] = day.split("-");
      const [hoursPart, minutesPart, secondsPart] = time.split(":");
      const isoDateString = `${yearPart}-${monthPart}-${dayPart}T${hoursPart}:${minutesPart}:${secondsPart}`;
      const timestamp = new Date(isoDateString);
      const currentTime = new Date();
  
      if (timestamp <= currentTime) {
        return res.status(400).send({ status: false, message: 'Invalid timestamp. Please provide a future date and time.' });
      }
  
      const newMessage = await Collection1.create({ message, timestamp });
      await newMessage.save();
  
      console.log('Message saved in Collection1');

        setTimeout(async () => {       
            const result = await Collection1.findOneAndDelete({ message, timestamp });
            if (result) {
            await Collection2.create({ message, timestamp });
            console.log('Message transferred to Collection2');  
            }
        }, timestamp-currentTime);
    
        res.status(200).send({ status: true, message: 'Job scheduled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: 'An error occurred while scheduling the job' });
    }
  };
  
  module.exports = { schedule };
  