import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { GtagService } from './gtag/gtag.service';
import { UiService } from './services/communication/ui.service';
import { UrlService } from './services/url.service';
import { HeaderComponent } from './shared/header/header.component';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isBlur: boolean = false;
  loading: boolean = false;
  isLogin: boolean = true;
  inHome: boolean = false;
  hasCountdown: boolean = false;
  @ViewChild('header') header: HeaderComponent;

  constructor(
    private uiService: UiService,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
    private gtag: GtagService
  ) {
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError
      ) {
        this.closeSubMenu();
        this.loading = false;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((navigation: any) => {
        String(navigation.url).indexOf('ingreso') != -1 || String(navigation.url).indexOf('preview') != -1
          ? (this.isLogin = true)
          : (this.isLogin = false);

        // GTM
        if (navigation instanceof NavigationEnd) {
          this.gtag.pageView(this.title, navigation.url);
          if (navigation.urlAfterRedirects !== '/inicio') {
            this.urlService.setInHome(false);
          } else {
            this.urlService.setInHome(true);
          }
        }
      });

    this.urlService.inHome$.subscribe((value) => (this.inHome = value));
  }

  ngOnInit(): void {
    this.uiService.isBlur.subscribe((resp) => {
      this.isBlur = resp;
    });
  }

  closeSubMenu(): void {
    this.isBlur = false;
    //this.uiService.setBlur(false);
    this.header && this.header.closeMenu();
  }

  itHasCountdown(event): void {
    this.hasCountdown = event;
  }

  title = 'Luxury';
}
