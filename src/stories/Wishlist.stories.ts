import { storiesOf, moduleMetadata } from '@storybook/angular';
import { ModalsModule } from 'src/app/modals/modals.module';
import { ModalWishlistItemComponent } from 'src/app/modals/shared/modal-wishlist-item/modal-wishlist-item.component';
import { WishlistComponent } from 'src/app/modals/shopping/wishlist/wishlist.component';
import { SharedModule } from 'src/app/shared/shared.module';

const modal = storiesOf('Modals/Shopping', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule],
  })
);


const modalItem = storiesOf('Modals/Shared', module ).addDecorator(
	moduleMetadata({
		imports: [ModalsModule]
	})
)

modalItem.add('WishlistItem', () => {
  return {
    component: ModalWishlistItemComponent,
  };
});

modal.add('WishList', () => {
  return {
    component: WishlistComponent,
  };
});
