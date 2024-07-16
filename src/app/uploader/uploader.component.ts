import { Component } from '@angular/core';

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.css'
})
export class UploaderComponent {

  uploadResult: any;

  uploadFiles() {
    // upload files
    try {
      

    } catch (error) {
      console.error(error);
    }

    this.uploadResult = true;
    console.log('uploadResult: ', this.uploadResult);
  }
  onFileSelected($event: Event) {

    // get file
    try {
      const file = $event.target as HTMLInputElement;
      file
      console.log('file: ', file);
    } catch (error) {
      console.error(error);
    }
  }

}
