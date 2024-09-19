import Sender from "../models/sender.model.js"


export const getSenderPost=async(req,res,next)=>{
  try {
    const senders=await Sender.find();
    res.json(senders);
  } catch (error) {
    next(error);
  }
}