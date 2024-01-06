import { moduleMetadata, storiesOf } from "@storybook/angular";
import { ModalModule } from "angular-bootstrap-md";
import { BrandComponent } from "src/app/core/store/brand/brand.component";
import { BrandModule } from "src/app/core/store/brand/brand.module";
import { MicroModule } from "src/app/micro/micro.module";
import {BrandBannerComponent} from 'src/app/shared/brand-banner/brand-banner.component';
import { FilterListModule } from "src/app/shared/filter-list/filter-list.module";
import { SharedModule } from "src/app/shared/shared.module";

const card = storiesOf('Core/Brand', module).addDecorator(
  moduleMetadata({
    imports: [MicroModule, BrandModule, SharedModule, ModalModule.forRoot(), FilterListModule],
    providers: [
    ]
  })
);

card.add('Banner', () => {
  return {
    component: BrandBannerComponent,
    props: {}
  }
});

card.add('Display', () => {
  return {
    component: BrandComponent,
    props: {}
  }
});
