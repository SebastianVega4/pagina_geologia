import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private readonly API_KEY = environment.googleMapsApiKey;
  private readonly BASE_URL = 'https://www.googleapis.com/drive/v3/files';

  constructor(private http: HttpClient) {}

  /**
   * List files in a specific folder.
   * Requires Google Drive API enabled and folder/files sharing set to "Anyone with the link".
   */
  getFilesFromFolder(folderId: string): Observable<DriveFile[]> {
    const query = `'${folderId}' in parents and trashed = false`;
    const fields = 'files(id, name, mimeType, thumbnailLink, webContentLink)';
    const url = `${this.BASE_URL}?q=${encodeURIComponent(query)}&fields=${fields}&key=${this.API_KEY}`;
    
    return this.http.get<{ files: DriveFile[] }>(url).pipe(
      map(response => response.files)
    );
  }

  /**
   * Helper to convert a Drive file ID to a direct thumbnail or content link.
   * Note: Some links require specific formats to bypass preview pages.
   */
  getDirectImageUrl(fileId: string): string {
    // This format works well for public files to be used in <img> tags
    return `https://lh3.googleusercontent.com/u/0/d/${fileId}`;
  }
}
