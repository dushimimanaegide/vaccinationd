import Program from "../../models/programs.js";

export const deleteProgramById = async (req, res) => {
  const programId = req.params.programID;

  try {
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Check if the program status is open
    if (program.status === "open") {
      return res
        .status(400)
        .json({ message: "The program is open, cannot be deleted" });
    }

    // If the program is not open, proceed with deletion
    await Program.findByIdAndDelete(programId);

    res.status(200).json({
      message: "Program deleted successfully",
      data: program,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" ,error:error.message});
  }
};
