import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../uploader/s3-client.js";

const getSignedRecipeThumbUrl = async (thumbKey) => {
  if (!thumbKey) return null;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: thumbKey,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 }); // 1 година
};

export default getSignedRecipeThumbUrl;
