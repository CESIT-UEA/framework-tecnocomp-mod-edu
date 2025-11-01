import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, Input, OnInit, Sanitizer, NgZone } from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css'],
})
export class YoutubePlayerComponent implements OnInit {
  player: any;
  @Input() idVideo: any = '';

  constructor(private domSanitizer: DomSanitizer) {}

  // Inicializa a API do YouTube quando o componente é carregado
  ngOnInit(): void {
    
  }

  // Carrega o script da API do YouTube dinamicamente
  loadYouTubeAPI(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    // Configura a função global exigida pela API
    (window as any).onYouTubeIframeAPIReady = () =>
      this.onYouTubeIframeAPIReady();
  }

  onYouTubeIframeAPIReady(): void {
    this.player = new (window as any).YT.Player('player', {
      height: '360',
      width: '640',
      videoId: this.idVideo,
      playerVars: {
        rel: 0,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
  }

  onPlayerReady(event: any): void {
    // console.log('Player está pronto!');
  }

  onPlayerStateChange(event: any): void {
    // console.log('Estado do player:', event.data);
    if (event.data == 0) {
      console.log('Video terminou');
    }
  }

  playVideo(): void {
    this.player.playVideo();
  }

  pauseVideo(): void {
    this.player.pauseVideo();
    // console.log(this.player.getPlayerState());
        // console.log(    this.player.getIframe())
  }

  stopVideo(): void {
    this.player.stopVideo();
  }

  seekTo(seconds: number): void {
    this.player.seekTo(seconds, true);

    // console.log(this.player.getVideoLoadedFraction());
  }

  muteVideo(): void {
    this.player.mute();
  }

  unmuteVideo(): void {
    this.player.unMute();
  }
}
