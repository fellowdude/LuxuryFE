import { storiesOf, moduleMetadata } from '@storybook/angular';
import { MagazinePrestigeCardComponent } from 'src/app/shared/magazine-prestige-card/magazine-prestige-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

const magazineCard = storiesOf('Shared/Magazine', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule],
  })
);

magazineCard.add('MagazinePrestigeCard', () => ({
  component: MagazinePrestigeCardComponent,
}));
