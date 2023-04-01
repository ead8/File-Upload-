import File from "../model/fileModel";

interface parmas {
  id: string;
}

const addFile = async (req: any, res: any) => {
  if (!req.file) {
    return res
      .status(404)
      .json({ message: "file is required", status: "Failed" });
  }
  const picture = req.file as any;
  const createFile = {
    fileName: picture?.filename as string,
    fileSize: (picture?.size / 1000) as number,
    uploadDate: new Date(),
  };
  const newFile = new File(createFile as any);
  const saveFile = await newFile.save();
  if (!saveFile)
    return res
      .status(404)
      .json({ message: "File not uploaded", status: "Failed" });

  return res.json({ data: "File added successfully", status: "Success" });
};
const getFile = async (req: any, res: any) => {
  const findFile = await File.findAll();
  if (!findFile.length)
    return res.status(404).json({ message: "No file found", status: "Failed" });

  return res.json({ data: findFile, status: "Success" });
};
const deleteFile = async (req: any, res: any) => {
  const { id } = req.params as parmas;
  const findFileToDelete = await File.findOne({ where: { id } });
  if (!findFileToDelete)
    return res
      .status(404)
      .json({ message: "This file doesn't exist", status: "Failed" });
  const findFile = await File.destroy({ where: { id } });
  if (!findFile)
    return res
      .status(404)
      .json({ message: "File deletion is not successful", status: "Failed" });
  return res.json({
    data: await File.findAll(),
    message: "File deleted",
    status: "Success",
  });
};

export { addFile, getFile, deleteFile };
