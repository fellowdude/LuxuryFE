import { IMagazinePrestigeCard } from '../models/magazine-prestige-card.model';

export const magazinePrestigeCard1: IMagazinePrestigeCard = {
  prestigeTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  prestigeBody:
    'Nunc ultricies metus id dui tincidunt, non scelerisque mauris bibendum. Etiam pulvinar mi non nulla placerat.',
  prestigeImage: 'magazine-prestige-image.svg',
};

export const magazinePrestigeCard2: IMagazinePrestigeCard = {
  prestigeTitle: 'Quisque mi libero, dictum ut finibus id, tincidunt quis.',
  prestigeBody:
    'Nunc ultricies metus id dui tincidunt, non scelerisque mauris bibendum. Etiam pulvinar mi non nulla placerat.',
  prestigeImage: 'magazine-prestige-image.svg',
};

export const magazinePrestigeCards: IMagazinePrestigeCard[] = [
  magazinePrestigeCard1,
  magazinePrestigeCard2,
];
