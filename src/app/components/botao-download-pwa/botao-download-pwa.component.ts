import { Component, OnInit } from '@angular/core';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';

@Component({
  selector: 'app-botao-download-pwa',
  templateUrl: './botao-download-pwa.component.html',
  styleUrls: ['./botao-download-pwa.component.css']
})
export class BotaoDownloadPwaComponent implements OnInit {

    constructor(public downloadService: DownloadPlataformaService){}

    ngOnInit(): void {
      this.downloadService.initEventInstall()
      this.downloadService.appInstalled()
    }
}
