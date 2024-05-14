import Program from "../../models/programs.js";

export const  getAllPrograms=async (req,res)=>{
    let data=await Program.find();
    if (!data || data.length === 0) {
        return res.status(404).json({ message: "No   program found" });
      }
      res.status(200).json({ message  :"list of avaiable programs   ",
        data:data });

};

