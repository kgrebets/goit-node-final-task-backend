import gravatar from "gravatar";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../uploader/s3-client.js";

/**
 * Generate S3 public avatar URL or Gravatar URL if avatar is not found
 *
 * @param user
 * @param signedUrlExpirationDelay
 * @returns {Promise<string>}
 */
const getSignedAvatarUrl = async (user, signedUrlExpirationDelay = 3600) => {
  const imageName = user.avatar;
  if (!imageName) {
    return gravatar.url(user.email, { s: '120', r: 'pg', d: 'identicon' }, true);
  }

  const getObjectParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
  }

  const getCommand = new GetObjectCommand(getObjectParams);

  return await getSignedUrl(s3Client, getCommand, { expiresIn: signedUrlExpirationDelay })
}

export default getSignedAvatarUrl;