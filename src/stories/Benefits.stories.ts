import { moduleMetadata, storiesOf } from "@storybook/angular";
import { BenefitDetailComponent } from "src/app/core/partner-benefits/benefit-detail/benefit-detail.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { MicroModule } from 'src/app/micro/micro.module';

const card = storiesOf('Core/Benefits', module).addDecorator(
  moduleMetadata({
    imports: [ SharedModule, MicroModule ],
    providers: [
    ]
  })
);

card.add('BenefitDetailDisplay', () => {
  return {
    component: BenefitDetailComponent,
    props: {}
  }
});
