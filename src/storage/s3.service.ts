import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';

interface UploadResult {
  key: string;
  url: string;
}

@Injectable()
export class S3Service {
  private readonly bucketName = process.env.S3_BUCKET_NAME || '';
  private readonly region = process.env.S3_REGION || 'eu-west-3';
  private readonly endpoint = process.env.S3_ENDPOINT;
  private readonly publicBaseUrl = process.env.S3_PUBLIC_BASE_URL;
  private readonly forcePathStyle =
    (process.env.S3_FORCE_PATH_STYLE || 'false').toLowerCase() === 'true';

  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: this.region,
      endpoint: this.endpoint,
      forcePathStyle: this.forcePathStyle,
      credentials:
        process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
          ? {
              accessKeyId: process.env.S3_ACCESS_KEY_ID,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            }
          : undefined,
    });
  }

  async uploadPublicImage(
    file: Express.Multer.File,
    prefix: string,
  ): Promise<UploadResult> {
    this.assertConfigured();

    const sanitizedPrefix = this.sanitizeKeyPart(prefix);
    const sanitizedName = this.sanitizeFilename(file.originalname);
    const key = `${sanitizedPrefix}/${Date.now()}-${randomUUID()}-${sanitizedName}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch {
      throw new InternalServerErrorException(
        'Impossible de televerser le fichier sur S3',
      );
    }

    return { key, url: this.buildPublicUrl(key) };
  }

  async deleteObjectByUrl(url: string | null | undefined): Promise<void> {
    if (!url) return;
    const key = this.extractKeyFromUrl(url);
    if (!key) return;

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
    } catch {
      throw new InternalServerErrorException(
        'Impossible de supprimer le fichier sur S3',
      );
    }
  }

  private assertConfigured(): void {
    if (!this.bucketName) {
      throw new InternalServerErrorException(
        'S3_BUCKET_NAME est requis pour utiliser le stockage S3',
      );
    }
  }

  private sanitizeFilename(filename: string): string {
    return filename
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private sanitizeKeyPart(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9/_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/\/+/g, '/')
      .replace(/^\/+|\/+$/g, '');
  }

  private buildPublicUrl(key: string): string {
    if (this.publicBaseUrl) {
      return `${this.publicBaseUrl.replace(/\/$/, '')}/${key}`;
    }

    if (this.endpoint) {
      return `${this.endpoint.replace(/\/$/, '')}/${this.bucketName}/${key}`;
    }

    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
  }

  private extractKeyFromUrl(url: string): string | null {
    try {
      const parsed = new URL(url);

      if (this.publicBaseUrl) {
        const normalized = this.publicBaseUrl.replace(/\/$/, '');
        if (url.startsWith(`${normalized}/`)) {
          return decodeURIComponent(url.substring(normalized.length + 1));
        }
      }

      if (parsed.pathname.startsWith(`/${this.bucketName}/`)) {
        return decodeURIComponent(
          parsed.pathname.slice(`/${this.bucketName}/`.length),
        );
      }

      if (parsed.hostname.startsWith(`${this.bucketName}.`)) {
        return decodeURIComponent(parsed.pathname.replace(/^\//, ''));
      }

      return null;
    } catch {
      return null;
    }
  }
}
