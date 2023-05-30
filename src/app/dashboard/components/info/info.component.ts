import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { UserService } from 'src/app/Service/user.service';

/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.warn(this.selectedFile)
  }
  uploadFile() {
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);

      const headers = new HttpHeaders();
headers.append('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary');

this.http.post('http://localhost:8080/User/api/upload', uploadData, { headers: headers }).subscribe(
  response => {
    console.log('File uploaded successfully');
  },
  error => {
    console.log('File upload failed:', error);
  }
);
    }
  }
}
