import Receiver from "../models/receiver.model.js"


export const getReceiverPost=async(req,res,next)=>{
  try {
    const receivers=await Receiver.find();
    res.json(receivers);
  } catch (error) {
    next(error);
  }
}