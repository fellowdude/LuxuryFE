import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CategoryComponent } from 'src/app/core/store/category/category.component';
import { CategoryModule } from 'src/app/core/store/category/category.module';

const categoryPage = storiesOf('Core/Category', module).addDecorator(
  moduleMetadata({
    imports: [CategoryModule],
  })
);

categoryPage.add('Display', () => {
  return {
    component: CategoryComponent,
  };
});
