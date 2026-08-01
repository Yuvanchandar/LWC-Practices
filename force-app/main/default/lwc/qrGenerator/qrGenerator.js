import qrcodejs from '@salesforce/resourceUrl/QRcodejs';
import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';

export default class QrGenerator extends LightningElement {

    qrLibLoaded = false;
    url = '';
    file = '';
    logoName = '';
    logoUrl = null;
    isNoGenerate = false;
    error;
    qrCodeUrl = '';

    connectedCallback(){
        this.loadQrLib();
    }

    async loadQrLib(){
        if(this.qrLibLoaded){
            return;
        }
        try {
            await loadScript(this, qrcodejs);
            this.qrLibLoaded = true;
            console.log('QR Code Lib loaded');
        } catch (error) {
            console.log('Failed to Load the qrcodejs resource', error.message);
        }
    }

    handleUrlChange(event){
        this.url = event.target.value;
        console.log('this.url', this.url);
    }

    handleFileChange(event){
       const file = event.target.files[0];
       if(!file){
          this.logoName = null;
          this.logoUrl = '';
          return;
       }

       this.logoName = file.name;
       const reader = new FileReader();
       reader.onload = (e) =>{
            this.logoUrl = e.target.result;
       }
       reader.readAsDataURL(file);
    }

    handleRemoveUrl(){
        this.logoName = null;
        this.logoUrl = '';
    }

    async handleQRGeneration(){
        if(!this.url ){
            this.error = 'Please Generate URL for QR generation';
        }
        if(!this.qrLibLoaded){
            this.error = 'QR Code library is not loaded.';
        }

        this.error = undefined;
        this.qrCodeUrl = '';
        try{
            const options = {
                text: this.url,
                width: 1024,
                height: 1024,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: globalThis.QRCodeWithLogo.CorrectLevel.H,
                logoUrl: this.logoUrl,
                logoSize: 0.25,
                logoRound: true,
                logoBackgroundColor: '#ffffff'
            };

            this.qrCodeUrl = await globalThis.QRCodeWithLogo.generate(options);
        }catch(err){
            this.error = 'Failed for QR Code generation';
        }
    }

    get hasQRCode(){
        return this.qrCodeUrl;
    }

}