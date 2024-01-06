import { moduleMetadata, storiesOf } from '@storybook/angular';
import { BreadcrumbComponent } from 'src/app/shared/breadcrumb/breadcrumb.component';
import { CategorySelectComponent } from 'src/app/shared/category-select/category-select.component';
import { ExclusiveServicesComponent } from 'src/app/shared/exclusive-services/exclusive-services.component';
import { FilterListComponent } from 'src/app/shared/filter-list/filter-list.component';
import { HowToBuyComponent } from 'src/app/shared/how-to-buy/how-to-buy.component';
import { SharedModule } from '../app/shared/shared.module';

const carousel = storiesOf( 'Shared/General', module ).addDecorator(
	moduleMetadata({
		imports: [
			SharedModule
		]
	})
)

carousel.add('Breadcrumb', () => {
	return {
		component: BreadcrumbComponent
	}
})

carousel.add('Category Select', () => {
	return {
		component: CategorySelectComponent
	}
})

carousel.add('Filter List', () => {
	return {
		component: FilterListComponent
	}
})

carousel.add('Breadcrumb', () => {
	return {
		component: BreadcrumbComponent
	}
})

carousel.add('How To Buy', () => {
	return {
		component: HowToBuyComponent
	}
})

carousel.add('Exclusive Services', () => {
	return {
		component: ExclusiveServicesComponent
	}
})

