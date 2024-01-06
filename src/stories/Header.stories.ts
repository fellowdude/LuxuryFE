// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { HeaderComponent } from '../app/shared/header/header.component';
import { CategoriesListComponent } from '../app/shared/header/categories-list/categories-list.component';
import { SharedModule } from '../app/shared/shared.module'


const card = storiesOf('Shared/Header', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule],
    providers: [
    ]
  })
);

card.add('Primary', () => {
  return {
    component: HeaderComponent,
    props: {}
  }
});

card.add('Categories', () => {
  return {
    component: CategoriesListComponent,
    props: {}
  }
});
