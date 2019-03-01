import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { PhotoUrls } from 'src/app/models/photo';
import { forEach } from '@angular/router/src/utils/collection';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      data => { this.user = data['user']; });

      /* this added for directly use query string to
         select and open messages tab when component initialize .*/
      this.route.queryParams.subscribe(params => {
        const selectedTab = params['tab'];
        this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
      });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photo.length; i++) {
      imageUrls.push({
        small: this.user.photo[i].url,
        medium: this.user.photo[i].url,
        big: this.user.photo[i].url,
        description: this.user.photo[i].description
      });
    }
    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
