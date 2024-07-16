import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  uploadResult: any;
  http: any;
  fileToUpload: any;
  presignedUrl: any;

  config = {
    bucketName: 'games-away-demo',
    dirName: 'media', /* optional - when use: e.g BUCKET_ROOT/dirName/fileName.extesion */
    region: 'us-east-1',
    accessKeyId: environment.AWS_ACCESS_KEY,
    secretAccessKey: environment.AWS_SECRET_KEY,
    s3Url: 'https://aws-s3-upload-ash.s3.amazonaws.com/'
  }
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);

  /**
* Handles the selection of a file.
* @param file The selected file.
* Call this method when a file is selected, passing the selected File object.
* For example, bind this method to the change event of a file input element in your HTML template.
*/
  fileInput(file: File) {
    this.fileToUpload = file;
  }

  getPresignedUrl() {
    this.http.get('YOUR_SERVER_ENDPOINT_TO_GENERATE_PRESIGNED_URL')
      .subscribe((response: { presignedUrl: any; }) => {
        this.presignedUrl = response.presignedUrl;
        this.uploadFiles();
      });
  }


  onFileSelected($event: Event) {

    // get file
    try {
      const file = $event.target as HTMLInputElement;
      if (file.files) {
        const webgl = file.files[0];
        console.log('file: ', webgl);
      } else {
        console.error('No file selected.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // upload files
  uploadFiles() {

    if (!this.presignedUrl || !this.fileToUpload) {
      console.error('Presigned URL or file is missing.');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    this.http.post(this.presignedUrl, formData)
      .subscribe(() => {
        console.log('File uploaded successfully.');
        // Add any further actions upon successful upload
      }, (error: any) => {
        console.error('Error uploading file:', error);
      });

    this.uploadResult = true;
    console.log('uploadResult: ', this.uploadResult);
  }


  title = 'cloudcrud';
}
