import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CategoryGroupComponent } from 'src/app/core/store/category-group/category-group.component';
import { CategoryGroupModule } from 'src/app/core/store/category-group/category-group.module';
import { SharedModule } from 'src/app/shared/shared.module';

const categoryGroup = storiesOf('Core/Category Group', module).addDecorator(
  moduleMetadata({
    imports: [CategoryGroupModule, SharedModule],
  })
);

categoryGroup.add('Display', () => ({
  component: CategoryGroupComponent,
}));
