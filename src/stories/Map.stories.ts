import { moduleMetadata, storiesOf } from '@storybook/angular';
import { MapComponent } from 'src/app/shared/map/map.component';
import { SharedModule } from '../app/shared/shared.module';

const carousel = storiesOf( 'Shared/Map', module ).addDecorator(
	moduleMetadata({
		imports: [
			SharedModule
		]
	})
)
carousel.add('MapComponent', () => {
	return {
		component: MapComponent
	}
})
