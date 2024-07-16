// src/app/aws-config.service.ts
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class AwsConfigService {
  constructor() {
    AWS.config.update({
      accessKeyId: 'YOUR_ACCESS_KEY_ID',
      secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
      region: 'YOUR_AWS_REGION'
    });
  }

  getS3Bucket() {
    return new AWS.S3({
      params: { Bucket: 'YOUR_BUCKET_NAME' }
    });
  }
}
