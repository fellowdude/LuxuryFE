// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { HomeComponent } from '../app/core/home/home.component';
import { SharedModule } from '../app/shared/shared.module';
import { HomeModule } from '../app/core/home/home.module';


const card = storiesOf('Core/Home', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule, HomeModule],
    providers: [
    ]
  })
);

card.add('Primary', () => {
  return {
    component: HomeComponent,
    props: {}
  }
});