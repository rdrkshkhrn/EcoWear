import { gridfsBucket } from "../index.js";

import mongoose from 'mongoose';

export async function fileController (req, res) {
    try {
      const fileId = req.params.id;
  
      if (!gridfsBucket) {
        console.error('GridFSBucket not initialized');
        return res.status(500).json({ error: 'GridFSBucket is not initialized.' });
      }
  
      // Open a download stream to retrieve the file by its ObjectId
      const downloadStream = gridfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
  
      // Set headers to indicate it's an image
      downloadStream.on('file', (file) => {
        res.set({
          'Content-Type': file.contentType || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${file.filename}"`
        });
      });
  
      // Pipe the file stream to the response
      downloadStream.pipe(res);
  
      downloadStream.on('error', (err) => {
        console.error('Error retrieving file:', err);
        res.status(404).json({ error: 'File not found' });
      });
      
    } catch (error) {
      console.error('Error retrieving file:', error);
      res.status(500).json({ error: 'Failed to retrieve file' });
    }
  }