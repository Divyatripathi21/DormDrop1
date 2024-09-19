import YOURORDERS from '../models/yourOrders.model.js';
import { errorHandler } from '../utils/error.js';

export const userYourOrders = async (req, res, next) => {
  const { username, senders } = req.body;

  try {
    let updatedYourOrders;

    // Check if a dashboard document with the given username already exists
    const existingYourOrders = await YOURORDERS.findOne({ username: username });

    if (existingYourOrders) {
      // If the dashboard document exists, update the receivers array
      updatedYourOrders = await YOURORDERS.findOneAndUpdate(
        { username: username },
        { $push: { senders: { $each: senders } } },
        { new: true }
      );
    } else {
      // If the dashboard document doesn't exist, create a new document
      updatedYourOrders = await YOURORDERS.create({
        username: username,
        senders: senders
      });
    }

    res.json(updatedYourOrders);
  } catch (error) {
    next(error);
  }
};


export const getUserYourOrders = async (req, res, next) => {
  try {
    const { username } = req.params; // Assuming the username is passed as a URL parameter
    const yourOrders = await YOURORDERS.findOne({ username }); // Find the dashboard with the provided username
    if (!yourOrders) {
      return res.json(0);
    }
    res.json(yourOrders);
  } catch (error) {
    next(error);
  }
};