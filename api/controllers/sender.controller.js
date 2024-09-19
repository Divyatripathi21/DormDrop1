import Sender from '../models/sender.model.js';
import { errorHandler } from '../utils/error.js';

export const senderForm = async (req, res, next) =>{
  const { name, registrationNumber, mobileNumber,availabilityTime } = req.body;

  if (
    !name ||
    !registrationNumber ||
    !mobileNumber ||
    !availabilityTime ||
    name === '' ||
    registrationNumber === '' ||
    availabilityTime===''||
    mobileNumber === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const newSender = new Sender({
    name,
    registrationNumber,
    mobileNumber,
    availabilityTime,
  });


  try {
    await newSender.save();
    res.json(newSender);
  } 

  catch (error)
   {
    next(error);
  }
}