import SenderEnd1 from '../models/senderEnd1.model.js';
import { errorHandler } from '../utils/error.js';


export const senderEnd1 = async (req, res, next) => {
  const { currentReceiver, currentSender } = req.body;


  if (!currentReceiver || !currentSender) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Create a new instance of the ReceiverEnd1 model with the currentReceiver and currentSender objects
    const newData = new SenderEnd1({
      currentReceiver,
      currentSender
    });

    // Save the new data to MongoDB
    const savedData = await newData.save();

    // Send a success response
    res.status(201).json(savedData);
  } catch (error) {
    // Log the error for troubleshooting
    console.error('Error saving data to MongoDB:', error);
    
    // Pass any errors to the error handling middleware
    next(error);
  }
};



// export const receiverEnd1 = async (req, res, next) => {
//   try {
//     const { username } = req.params; // Assuming the username is passed as a URL parameter
//     const data = await SenderEnd1.findOne({ 'currentReceiver.registrationNumber': username })
//       .populate('currentSender', '-__v'); // Populate the currentSender field, excluding __v field
//     if (!data) {
//       // If data is not found, you can return a 404 response or an empty object
//       return res.status(404).json({ message: 'Data not found' });
//     }
//     res.json(data);
//   } catch (error) {
//     next(error);
//   }
// };


export const receiverEnd1 = async (req, res, next) => {
  try {
    const { registrationNumber } = req.params;

    // Find the current receiver using the provided registration number
    // const currentReceiver = await SenderEnd1.findOne({ 'currentReceiver.registrationNumber': registrationNumber });
    const currentReceiver = await SenderEnd1.findOne({ registrationNumber });
    // If the receiver is not found, return an error
    if (!currentReceiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Extract the registration number of the current sender from the receiver object
    const senderRegistrationNumber = currentReceiver.currentSender.registrationNumber;

    // Find the current sender using the registration number obtained from the receiver
    const currentData = await SenderEnd1.findOne({ 'currentSender.registrationNumber': senderRegistrationNumber });

    // If the sender is not found, return an error
    if (!currentData) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // If sender is found, return sender information
    return res.status(200).json({ currentData});
  } catch (error) {
    next(error);
  }
};


