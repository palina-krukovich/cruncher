import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {UploadMetadata} from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: AngularFireStorage) { }

  public upload(path: string, data: any, metadata?: UploadMetadata| undefined): AngularFireUploadTask {
    return this.storage.upload(path.length > 50 ? path.substr(0, 50) : path, data, metadata);
  }
}
