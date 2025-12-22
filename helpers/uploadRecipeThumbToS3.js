import sharp from "sharp";
import HttpError from "./HttpError.js";
import s3Client from "../uploader/s3-client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import randomImageName from "./generateRandomImageName.js";
import { RECIPES_THUMBS_S3_BUCKET_FOLDER } from "../helpers/constants.js";

const uploadRecipeThumbToS3 = async (file, recipeId) => {
  if (!file) {
    throw HttpError(400, "thumb is required");
  }

  if (!process.env.AWS_BUCKET_NAME) {
    return `recipes/${recipeId}/mock-thumb.webp`;
  }

  const key = `${RECIPES_THUMBS_S3_BUCKET_FOLDER}/${recipeId}/${randomImageName()}.webp`;

  const imageBuffer = await sharp(file.buffer)
    .resize({ width: 600, height: 600, fit: "cover" })
    .toFormat("webp", { quality: 80 })
    .toBuffer();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: imageBuffer,
      ContentType: "image/webp",
    })
  );

  return key;
};

export default uploadRecipeThumbToS3;
