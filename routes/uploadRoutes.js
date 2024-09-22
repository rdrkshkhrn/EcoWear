import express from "express";
import multer from "multer";
import { Readable } from "stream";
import { gridfsBucket } from "../index.js";
const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// File upload route
uploadRouter.post("/images",upload.array("file", 5), (req, res) => {
  if (!gridfsBucket) {
    console.error("GridFSBucket not initialized");
    return res.status(500).json({ error: "GridFSBucket is not initialized." });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  const fileUploadPromises = req.files.map((file) => {
    console.log("Uploading file:", file.originalname);

  
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    // Upload the file to GridFS
    const uploadStream = gridfsBucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      readableStream
        .pipe(uploadStream)
        .on("error", (error) => {
          console.error("Error uploading file to GridFS:", error);
          reject(error);
        })
        .on("finish", () => {
          console.log("File uploaded successfully:", uploadStream.id);
          resolve(uploadStream.id); // Resolve with the file ID
        });
    });
  });

  // Wait for all files to be uploaded
  Promise.all(fileUploadPromises)
    .then((fileIds) => {
      res.status(201).json({ fileUrls: fileIds });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error uploading files", error });
    });
});

export default uploadRouter;
