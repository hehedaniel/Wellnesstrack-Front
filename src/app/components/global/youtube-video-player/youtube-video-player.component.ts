import { Component, Inject } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-youtube-video-player',
   standalone: true,
   imports: [YouTubePlayerModule],
   templateUrl: './youtube-video-player.component.html',
   styleUrls: ['./youtube-video-player.component.css'],
})
export class YoutubeVideoPlayerComponent {
   showVideo = false;
   videoId: string;

   constructor(@Inject(MAT_DIALOG_DATA) private data: { videoId: string }) {
      this.videoId = data.videoId;
   }

   ngOnInit() {
      console.log('ID del video recibido:', this.videoId);
      this.toggleVideo();
   }

   toggleVideo() {
      this.showVideo = !this.showVideo;
   }

   onReady(event: any) {
      console.log('Video listo:', event);
   }
}
