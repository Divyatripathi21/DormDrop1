import DASHBOARD from '../models/dashboard.model.js';
import { errorHandler } from '../utils/error.js';

export const userDashboard = async (req, res, next) => {
  const { username, receivers } = req.body;

  try {
    let updatedDashboard;

    // Check if a dashboard document with the given username already exists
    const existingDashboard = await DASHBOARD.findOne({ username: username });

    if (existingDashboard) {
      // If the dashboard document exists, update the receivers array
      updatedDashboard = await DASHBOARD.findOneAndUpdate(
        { username: username },
        { $push: { receivers: { $each: receivers } } },
        { new: true }
      );
    } else {
      // If the dashboard document doesn't exist, create a new document
      updatedDashboard = await DASHBOARD.create({
        username: username,
        receivers: receivers
      });
    }

    res.json(updatedDashboard);
  } catch (error) {
    next(error);
  }
};


export const getUserDashboard = async (req, res, next) => {
  try {
    const { username } = req.params; // Assuming the username is passed as a URL parameter
    const dashboard = await DASHBOARD.findOne({ username }); // Find the dashboard with the provided username
    if (!dashboard) {
      // return res.status(404).json({ message: 'Dashboard not found' });
      return  res.json(0);
    }
    res.json(dashboard);
  } catch (error) {
    next(error);
  }
};