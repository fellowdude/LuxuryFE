import { IExclusiveServicesCard, IHowToBuyCard, IHowToEnjoy } from "../models/static-items.model";

export const howToBuyCard: IHowToBuyCard = {
  title: "Lorem Ipsum",
  text: "Irure officia culpa et sunt qui non ipsum ex reprehenderit fugiat et ullamco Lorem amet. Proident excepteur elit ipsum proident ipsum aute anim nulla tempor. Non non cillum aute fugiat duis esse ut aliquip reprehenderit laboris laborum enim elit ad."
}

export const howToBuyList: Array<IHowToBuyCard> = [ howToBuyCard, howToBuyCard, howToBuyCard];

export const exclusiveServiceCard: IExclusiveServicesCard = {
  title: "Lorem Ipsum",
  text: "Irure officia culpa et sunt qui non ipsum ex",
  subText: "reprehenderit fugiat"
}

export const exclusiveServicesList: Array<IExclusiveServicesCard> = [ exclusiveServiceCard, exclusiveServiceCard, exclusiveServiceCard, exclusiveServiceCard];

export const howToEnjoyData: IHowToEnjoy = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet felis in ligula tincidunt auctor in mollis magna. Fusce at lacinia nulla. Etiam lobortis faucibus rutrum. Sed eu orci nec enim porttitor bibendum a id urna. Maecenas posuere diam dui, ac aliquam mauris blandit sed.",
  imageUrl: "assets/images/how-to-enjoy.svg"
}

export const howToEnjoyData2: IHowToEnjoy = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet felis in ligula tincidunt auctor in mollis magna. Fusce at lacinia nulla. Etiam lobortis faucibus rutrum. Sed eu orci nec enim porttitor bibendum a id urna. Maecenas posuere diam dui, ac aliquam mauris blandit sed.",
  imageUrl: "assets/images/how-to-enjoy2.svg"
}

export const howToEnjoyList: Array<IHowToEnjoy> = [howToEnjoyData, howToEnjoyData2]
