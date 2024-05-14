import Program from "../../models/programs.js";

export const findProgramById = async (req, res,programId) => {

  let idToSearch = programId || req.params.programID;
  

  try {
    const program = await Program.findById(idToSearch);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

if(!programId){
  
  res.status(200).json({
    message: "Program found successfully",
    data: program,
  });
}
 
else{
  if(program.status ==="closed")
  {return res.status(404).json({message:"the currently status of the program is closed   so try again later"})
}
 const programNameAsString =  program.programName.toString();

 return program;
}

next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getProgramById = async (req, res) => {
  const programId = req.params.id;
  try {
    let program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    return res.status(200).json({ message: 'Program retrieved successfully', data: program });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};