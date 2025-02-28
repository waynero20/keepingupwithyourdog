import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.AWS_BUCKET_NAME;

const client = new S3Client({
	region: process.env.AWS_REGION!,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});

export const s3GetFiles = async () => {
	try {
		const command = new ListObjectsV2Command({
			Bucket: bucketName,
		});

		const { Contents } = await client.send(command);

		if (!Contents) return [];

		const files = await Promise.all(
			Contents.map(async (file) => {
				const getObjectCommand = new GetObjectCommand({
					Bucket: bucketName,
					Key: file.Key!,
				});

				const signedUrl = await getSignedUrl(client, getObjectCommand, { expiresIn: 3600 });

				return {
					key: file.Key!,
					url: signedUrl,
				};
			})
		);

		return files;
	} catch (error) {
		console.error("Error fetching files from S3:", error);
		return [];
	}
};

export const s3GetFile = async (fileKey: string) => {
	try {
		if (!fileKey) throw new Error("File key is required");
	
		const getObjectCommand = new GetObjectCommand({
			Bucket: bucketName,
			Key: fileKey,
		});

		const signedUrl = await getSignedUrl(client, getObjectCommand, { expiresIn: 3600 });

		return {
			key: fileKey,
			url: signedUrl,
		};
	} catch (error) {
		console.error(`Error fetching file ${fileKey} from S3:`, error);
		return null;
	}
};
