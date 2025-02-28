"use server";

import { s3GetFiles, s3GetFile } from "@/lib/s3";

export async function fetchS3Files(): Promise<{ key: string; url: string }[]> {
  try {
    return await s3GetFiles();
  } catch (error) {
    console.error("Failed to fetch S3 files:", error);
    return [];
  }
}

export async function fetchS3File(fileKey: string): Promise<{ key: string; url: string } | null> {
  try {
    if (!fileKey) throw new Error("File key is required");
    return await s3GetFile(fileKey);
  } catch (error) {
    console.error(`Failed to fetch S3 file: ${fileKey}`, error);
    return null;
  }
}
