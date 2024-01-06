import { storiesOf, moduleMetadata } from '@storybook/angular';
import { SearchComponent } from 'src/app/core/search/search.component';
import { SearchModule } from 'src/app/core/search/search.module';
import { SharedModule } from 'src/app/shared/shared.module';

const searchPage = storiesOf('Core/Search', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule, SearchModule],
  })
);

searchPage.add('Display', () => {
  return {
    component: SearchComponent,
  };
});
