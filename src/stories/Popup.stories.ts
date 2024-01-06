import { moduleMetadata, storiesOf } from '@storybook/angular';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

import { SharedModule } from '../app/shared/shared.module';

const popup = storiesOf('Shared/Popup', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule],
  })
);

popup.add('Display', () => {
  return {
    component: PopupComponent,
  };
});
