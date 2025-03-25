import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadPlataformaService implements OnInit {
  installPrompt: any = null;
  hiddenButton: boolean = true

  ngOnInit(): void {
    this.initEventInstall()
  }

  getHiddenButton(): boolean {
    return this.hiddenButton
  }

  getInstallPrompt(){
    return this.installPrompt
  }

  initEventInstall(){
    window.addEventListener("beforeinstallprompt", (event)=>{
      event.preventDefault();
      this.installPrompt = event;
      this.hiddenButton = false
    })
  }

  async installPromptEvent(){
    if (!this.installPrompt) return 
    const result = await this.installPrompt.prompt()
    // console.log(`resultado da escolha do prompt ${result.outcome}`)
    this.disableInAppInstallPrompt();
  }

  appInstalled(){
    window.addEventListener("appinstalled", (event) => {
        this.disableInAppInstallPrompt();
  });
}

  disableInAppInstallPrompt() {
    this.installPrompt = null;
    this.hiddenButton = true;
  }
}
