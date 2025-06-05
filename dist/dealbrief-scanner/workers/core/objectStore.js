import AWS from 'aws-sdk';
import fs from 'node:fs/promises';
import { log } from './logger.js';
const s3 = new AWS.S3({
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
});
const BUCKET = 'dealbrief-files';
export async function uploadFile(filePath, key, mime) {
    const Body = await fs.readFile(filePath);
    await s3
        .putObject({
        Bucket: BUCKET,
        Key: key,
        ACL: 'private',
        Body,
        ContentType: mime
    })
        .promise();
    log('[s3-upload]', key);
    return `s3://${BUCKET}/${key}`;
}
//# sourceMappingURL=objectStore.js.map