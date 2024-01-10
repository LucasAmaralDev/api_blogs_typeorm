import * as Minio from 'minio';
import * as path from 'path';
import * as multer from 'multer';

export class MinioService {
  private readonly minioClient: Minio.Client;
  private readonly bucketName: string;
  private readonly port: number;

  constructor() {

    const portDefault = process.env.useSSL ? 443 : 80;
    this.port = process.env.port ? +process.env.port : portDefault

    this.minioClient = new Minio.Client({
      endPoint: process.env.endPoint,
      port: this.port,
      useSSL: process.env.useSSL === 'true',
      accessKey: process.env.accessKey,
      secretKey: process.env.secretKey,
    });
    
    this.bucketName = process.env.bucketName;
  }

  async upload(file: multer.File) {
    const objectName = path.basename(file.originalname);
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);

    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);

      const policy = `
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {"AWS": ["*"]},
              "Action": ["s3:GetObject"],
              "Resource": ["arn:aws:s3:::${this.bucketName}/*"]
            }
          ]
        }
      `;

      await this.minioClient.setBucketPolicy(this.bucketName, policy);
    }

    await this.minioClient.putObject(this.bucketName, objectName, file.buffer, file.size);

    const url = `${process.env.useSSL === 'true' ? 'https://' : 'http://'}${process.env.endPoint}:${this.port}/${this.bucketName}/${objectName}`;

    return {
      name: objectName,
      url,
      contentType: file.mimetype,
    };
  }
}