import { moduleMetadata, storiesOf } from '@storybook/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutUsComponent } from 'src/app/static-pages/about-us/about-us.component';
import { StaticPagesModule } from 'src/app/static-pages/static-pages.module';

const staticPages = storiesOf('StaticPages/Components', module).addDecorator(
  moduleMetadata({
    imports: [StaticPagesModule, SharedModule],
  })
);

staticPages.add('/AboutUs', () => {
  return {
    component: AboutUsComponent,
  };
});
