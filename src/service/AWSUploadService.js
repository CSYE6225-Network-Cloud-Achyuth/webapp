import { upload, deleteTheFile } from "../utils/AWS_S3.js";
import fs from "fs";
import util from "util";
import BadRequestException from "../errors/BadRequest.js";

const unLink = util.promisify(fs.unlink);

const uploadFile = async (file, fileName) => {
  try {
    const result = await upload(file, fileName);
    await unLink(file.path);
    return await result;
  } catch (err) {
    console.error(err);
    throw new BadRequestException(err);
  }
};

const deleteFile = async (filename) => {
  try {
    const result = await deleteTheFile(filename);
    return result;
  } catch (error) {
    throw new BadRequestException("Error in code: " + error);
  }
};

export { uploadFile, deleteFile };
