import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../uploader/s3-client.js";

const isHttpUrl = (value) =>
  typeof value === "string" && /^https?:\/\//i.test(value);

/**
 * Resolves recipe thumb URL:
 * - returns null if empty
 * - returns original value if it's already a public URL
 * - generates signed S3 URL if it's an S3 key
 */
const resolveRecipeThumb = async (thumb) => {
  if (!thumb) return null;

  // already a public URL (old data / CDN / ftp)
  if (isHttpUrl(thumb)) {
    return thumb;
  }

  // assume S3 key
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: thumb,
  });

  return await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 60,
  });
};

export default resolveRecipeThumb;
