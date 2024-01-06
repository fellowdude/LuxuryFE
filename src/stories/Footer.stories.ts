// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { FooterComponent } from '../app/shared/footer/footer.component';
import { SharedModule } from '../app/shared/shared.module'


const card = storiesOf('Shared/Footer', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule],
    providers: [
    ]
  })
);

card.add('Primary', () => {
  return {
    component: FooterComponent,
    props: {}
  }
});