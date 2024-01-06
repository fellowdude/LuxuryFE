import { Component, Input, OnInit } from '@angular/core';

export interface ICountdownBanner {
  backgroundImage: string;
  dateStart: Date;
  dateEnd: Date;
  buttonLabel: string;
  redirection: string;
  upperText: string;
  lowerText: string;
}

@Component({
  selector: 'app-countdown-banner',
  templateUrl: './countdown-banner.component.html',
  styleUrls: ['./countdown-banner.component.scss'],
})
export class CountdownBannerComponent implements OnInit {
  @Input() info: any = null;
  @Input() type: 'desktop' | 'mobile' = 'desktop';
  content: ICountdownBanner = null;
  finished: boolean = false;
  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  constructor() {}

  setBannerIndex() {
    // if type is desktop use the first banner, if not use the second
    return this.info.length === 1 || this.type === 'desktop' ? 0 : 1;
  }

  ngOnInit(): void {
    const index = this.setBannerIndex();
    this.content = {
      backgroundImage:
        this.info?.[index]?.url_attachment + this.info?.[index]?.value,
      dateEnd: this.info?.[index]?.date_select_end
        ? new Date(this.info?.[index]?.date_select_end)
        : null,
      dateStart: this.info?.[index]?.date_select_end ? new Date() : null,
      buttonLabel: this.info?.[index]?.button_label
        ? this.info?.[index]?.button_label
        : null,
      redirection: this.info?.[index]?.redirect,
      upperText: this.info?.[index]?.text_info
        ? this.textIntoHTMLFormat(this.info?.[index]?.text_info)
        : null,
      lowerText: this.info?.[index]?.subtitle
        ? this.textIntoHTMLFormat(this.info?.[index]?.subtitle)
        : null,
    };

    if (this.content.dateEnd) {
      const timeleft =
        this.content?.dateEnd?.getTime() - this.content?.dateStart?.getTime();
      this.daysLeft = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      this.hoursLeft = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutesLeft = Math.floor(
        (timeleft % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.secondsLeft = Math.floor((timeleft % (1000 * 60)) / 1000);

      this.validateTime();

      const interval = setInterval(() => {
        this.secondsLeft -= 1;
        if (this.secondsLeft < 0) {
          this.minutesLeft -= 1;
          !(this.minutesLeft < 0) && (this.secondsLeft = 59);
        }
        if (this.minutesLeft < 0) {
          this.hoursLeft -= 1;
          !(this.hoursLeft < 0) && (this.minutesLeft = 59);
        }
        if (this.hoursLeft < 0) {
          this.daysLeft -= 1;
          !(this.daysLeft < 0) && (this.hoursLeft = 23);
        }
        if (this.daysLeft < 0) {
          this.daysLeft = 0;
          this.daysLeft = 0;
          this.hoursLeft = 0;
          this.minutesLeft = 0;
          this.secondsLeft = 0;
          clearInterval(interval);
          this.finished = true;
        }
      }, 1000);
    }
  }

  textIntoHTMLFormat(text: string): string {
    let result = [];
    text?.split(' ')?.forEach((e) => {
      if (e.includes('**')) {
        let phrase = e?.replace('**', '<b>')?.replace('**', '</b>');
        result?.push(phrase);
      } else {
        result?.push(e);
      }
    });
    return result?.join(' ');
  }

  validateTime(): void {
    if (this.daysLeft < 0) this.daysLeft = 0;
    if (this.hoursLeft < 0) this.hoursLeft = 0;
    if (this.minutesLeft < 0) this.minutesLeft = 0;
    if (this.secondsLeft < 0) this.secondsLeft = 0;
  }
}
