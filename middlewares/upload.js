import multer from "multer";

import HttpError from "../helpers/HttpError.js";

// Memory storage - stores files in memory as buffers (doesn't save to temp folder)
const storage = multer.memoryStorage();

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb)=> {
    const extension = file.originalname.split(".").pop();
    if(extension === "exe") {
        return cb(HttpError(400, ".exe extension not allowed"));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;