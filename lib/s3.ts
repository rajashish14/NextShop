import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const bucketName = process.env.AWS_S3_BUCKET_NAME || "nextshop-product-images";

export const s3Client =
  accessKeyId && secretAccessKey
    ? new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      })
    : null;

export async function uploadFileToS3(fileBuffer: Buffer, fileName: string, contentType: string): Promise<string> {
  const uniqueKey = `products/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  if (!s3Client) {
    console.warn("⚠️ AWS S3 credentials missing. Generating simulated upload URL for local preview.");
    // Return high quality unsplash image or base64 preview format
    return `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80`;
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueKey,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `https://${bucketName}.s3.${region}.amazonaws.com/${uniqueKey}`;
}

export async function getPresignedUploadUrl(fileName: string, contentType: string) {
  const uniqueKey = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  if (!s3Client) {
    return {
      uploadUrl: null,
      key: uniqueKey,
      publicUrl: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80`,
    };
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${uniqueKey}`;

  return { uploadUrl, key: uniqueKey, publicUrl };
}
