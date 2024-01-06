import { moduleMetadata, storiesOf } from '@storybook/angular';
import { BrandsCarouselComponent } from 'src/app/shared/brands-carousel/brands-carousel.component';
import { SharedModule } from '../app/shared/shared.module';

const carousel = storiesOf( 'Shared/Brand', module ).addDecorator(
	moduleMetadata({
		imports: [
			SharedModule
		]
	})
)
carousel.add('Carousel', () => {
	return {
		component: BrandsCarouselComponent
	}
})
