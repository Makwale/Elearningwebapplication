import { Injectable } from '@angular/core';
import { Plugins,CameraResultType,Capacitor,FilesystemDirectory,
CameraPhoto,CameraSource } from "@capacitor/core";
import { Platform } from '@ionic/angular';

const {Camera, Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;
  constructor(platform: Platform) { 
    this.platform = platform;
  }

  public async addNewToGallery(){
    //Take a Photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    this.photos.unshift({
      filePath: "soon...",
      webviewPath: capturedPhoto.webPath
    });
    //save the picture and add it to photo collection
    const savedImageFile =  await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos)
      });
  }
  public async loadSaved(){
    // retrieve cached photo array data
    const photoList = await Storage.get({
      key: this.PHOTO_STORAGE
    });
    this.photos = JSON.parse(photoList.value) || [];

    //Easier way to detect when running on the web:
    //"When the platform is NOT hybrid, do this"
    if(!this.platform.is('hybrid')){
    //Display the photo by reading into base64 format
    for(let photo of this.photos){
      // Read each saved photo's data from the Filesystem 
      // Web platform only Load the photo as base64 data
      photo.webviewPath = 'data.image/jpeg;base64,${readFile.data}';
    }
  }
}
  private async savePicture(cameraPhoto: CameraPhoto){
      //convert photo to based format, required by Filesystem API to save
      const base64Data = await this.readAsBase64(cameraPhoto);

      ////write the file to the data directory
      const fileName = new Date().getTime() + 'jpeg';
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data
      });

      if(this.platform.is('hybrid')){
        // Display the new image by rewritting the 'file://' path to HTTP
        return{
            filePath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        };
      }
      else{
      // use webPath to display the new image instead of base64 since it's 
      // already loaded into memory
      return {
        filePath: fileName,
        webviewPath: cameraPhoto.webPath
      };   
    }
  }
 public async deletePicture(photo:Photo, position: number){
   //Remove this photo from the photos reference data array
   this.photos.splice(position,1);

   // Update photos array cache by overwritting the existing photo array
   Storage.set({
     key: this.PHOTO_STORAGE,
     value: JSON.stringify(this.photos)
   });
   // delete photo  file filesystem
   const filename = photo.filePath
   .substr(photo.filePath.lastIndexOf('/')+1);
   await Filesystem.deleteFile({
     path: filename,
     directory: FilesystemDirectory.Data
   });
 }
  private async readAsBase64(cameraPhoto: CameraPhoto){
    // "Hybrid" will detect Cordova or Capacitor
    if(this.platform.is('hybrid')){
        //read the file into base64 format
        const file = await Filesystem.readFile({
          path: cameraPhoto.path
        });
        return file.data;
    }
    else{
      // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

}
  convertBlobToBase64 = (blob:Blob) => new Promise((resolve,reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload =() => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
export interface Photo {
  filePath: string;
  webviewPath: string;
}
