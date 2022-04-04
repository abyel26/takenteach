// Author: Goma Niroula
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// Convert base 64 string to a blob
function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-usergallery',
  templateUrl: './usergallery.page.html',
  styleUrls: ['./usergallery.page.scss'],
})
export class UsergalleryPage implements OnInit {

  currentImage = null;
  form: FormGroup;

  constructor(
    private file: File
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
        photoName: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        photoDescription: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.maxLength(200)]
        }),

        image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string | File){
    let imageFile;
    if(typeof imageData === 'string'){
      try{
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,',''), 'image/jpeg');
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
       imageFile = imageData;
    }
    this.form.patchValue({image: imageFile});
  }

  onUploadPicture(){
    if(!this.form.valid || this.form.get('image').value){
      return;
    }
    console.log(this.form.value);
  }


}
