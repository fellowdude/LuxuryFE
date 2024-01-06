import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CategoryGroupComponent } from 'src/app/core/partner-benefits/category-group/category-group.component';
import { CategoryGroupModule } from 'src/app/core/partner-benefits/category-group/category-group.module';
import { CategoryComponent } from 'src/app/core/partner-benefits/category/category.component';
import { CompanyComponent } from 'src/app/core/partner-benefits/company/company.component';
import {MicroModule} from 'src/app/micro/micro.module';
import { FilterListModule } from 'src/app/shared/filter-list/filter-list.module';
import { SharedModule } from 'src/app/shared/shared.module';

const experiencesPage = storiesOf('Core/Experiences', module).addDecorator(
  moduleMetadata({
    imports: [CategoryGroupModule, SharedModule, FilterListModule, MicroModule],
  })
);

experiencesPage.add('Display', () => ({
  component: CategoryGroupComponent,
}));

experiencesPage.add('Category', () => ({
  component: CategoryComponent,
}));

experiencesPage.add('Company', () => ({
  component: CompanyComponent,
}));
