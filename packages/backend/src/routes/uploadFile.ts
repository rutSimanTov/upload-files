

// import { Router } from 'express';
// import { upload } from '../middlewares/middlewareUploadFiles';
// import { Request, Response } from 'express';
// import { databaseService } from '../services/database'; // Adjust the path as necessary
// import { ContentItem, ContentCategory, ContentType, ContentStatus } from '../../../../types/content.type';

// const router = Router();

// // API function for file uploads
// router.post('/upload', upload.array('files', 5), async (req: Request, res: Response) => {
//   const files = req.files as Express.Multer.File[];
//   const userId = req.body.userId; // The user ID is assumed to come from the request body
//   const uploadDate = new Date().toISOString();

//   if (!files || files.length === 0) {
//     console.log(`UserID: ${userId}, Date: ${uploadDate}, Status: Failure, Reason: No files uploaded.`);
//     return res.status(400).send('No files uploaded.');
//   }

//   let uploadSuccessful = true;
//   const fileNames: string[] = [];

//   for (const file of files) {
//     fileNames.push(file.filename);

//     // Log for each uploaded file
//     console.log(`UserID: ${userId}, Date: ${uploadDate}, File: ${file.originalname}, MimeType: ${file.mimetype}, Size: ${file.size} bytes, Status: Success`);

//     // Create ContentItem from uploaded file details
//     const contentItem: Omit<ContentItem, 'id'> = {
//       title: file.originalname,
//       description: `File uploaded: ${file.originalname}`,
//       category: ContentCategory.INDUSTRY_NEWS, // Adjust category as necessary
//       type: ContentType.DOCUMENT, // Adjust type as necessary
//       status: ContentStatus.DRAFT, // Adjust status as necessary
//       authorId: userId,
//       createdAt: new Date(),
//       updatedAt:undefined,
//       tags: [], // Populate tags if necessary
//       metadata: {
//         language: 'en', // Set language as appropriate
//         fileSize: file.size,
//         fileType: file.mimetype,
//       },
//       downloadUrl: file.path, // Assuming 'file.path' gives the location of the uploaded file
//       attachmentUrls: [file.path], // Add the path to the list of attachment URLs
//     };

//     // Insert ContentItem into database
//     try {
//         await databaseService.createContentItem(contentItem);
//     } catch (error) {
//         console.error(`Failed to create content item for file ${file.originalname}:`, error);
//         uploadSuccessful = false; // Mark upload as failed if insertion fails
//     }
//   }

//   if (uploadSuccessful) {
//     res.send(`Files uploaded successfully: ${fileNames.join(', ')}`);
//   } else {
//     res.status(500).send('Upload failed.');
//   }
// });

// export default router;


import { Router } from 'express';
import { upload } from '../middlewares/middlewareUploadFiles';
import { Request, Response } from 'express';
import { databaseService } from '../services/database'; 
import { ContentItem, ContentCategory, ContentType, ContentStatus } from '../../../../types/content.type';

const router = Router();

// API function for file uploads
router.post('/upload', upload.array('files', 5), async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const userId = req.body.userId; // The user ID is assumed to come from the request body

  if (!files || files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  let uploadSuccessful = true;
  const fileNames: string[] = [];

  for (const file of files) {
    fileNames.push(file.filename);

    // Create ContentItem from uploaded file details
    const contentItem: Omit<ContentItem, 'id'> = {
      title: file.originalname,
      description: `File uploaded: ${file.originalname}`,
      category: ContentCategory.INDUSTRY_NEWS, // Adjust category as necessary
      type: ContentType.DOCUMENT, // Adjust type as necessary
      status: ContentStatus.DRAFT,
      authorId: userId,
      createdAt: new Date(),
      updatedAt: undefined,
      tags: [], // Populate tags if necessary
      metadata: {
        language: 'en', // Set language as appropriate
        fileSize: file.size,
        fileType: file.mimetype,
      },
      downloadUrl: file.path, // Assuming 'file.path' gives the location of the uploaded file
      attachmentUrls: [file.path], // Add the path to the list of attachment URLs
    };

    // Insert ContentItem into database
    try {
      await databaseService.createContentItem(contentItem);
    } catch (error) {
      console.error(`Failed to create content item for file ${file.originalname}:`, error);
      uploadSuccessful = false; // Mark upload as failed if insertion fails
    }
  }

  if (uploadSuccessful) {
    res.send(`Files uploaded successfully: ${fileNames.join(', ')}`);
  } else {
    res.status(500).send('Upload failed.');
  }
});

export default router;
