import RATING from '../models/rating.model.js';
 
export const storeRating = async (req, res, next) => {
  try {
    const { username, rate } = req.body;
 
    // Find the existing rating for the user
    let userRating = await RATING.findOne({ username });
 
    if (userRating) {
      // If the user exists, update the rating
      const newLength = userRating.length + 1;
      const newRating = (userRating.rating * userRating.length + rate) / newLength;
 
      userRating.rating = parseFloat(newRating.toFixed(1)); // Convert to 1 decimal place
      userRating.length = newLength;
 
      await userRating.save();
    } else {
      // If the user doesn't exist, create a new rating entry
      userRating = new RATING({
        username,
        rating: parseFloat(rate.toFixed(1)), // Convert to 1 decimal place
        length: 1
      });
 
      await userRating.save();
    }
 
    res.status(200).json({ message: 'Rating updated successfully', userRating });
  } catch (error) {
    console.error('Error storing rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 
export const getRating = async (req, res, next) => {

  try {
    
    const { username } = req.params;
    // Find the rating for the given username
    const userRating = await RATING.findOne({ username });
 
    if (userRating) {
      res.status(200).json({ rate: userRating.rating });
    } else {
      res.status(404).json({ message: 'Rating not found' });
    }
  } catch (error) {
    
    console.error('Error retrieving rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// getRating();