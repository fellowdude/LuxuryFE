import { Injectable } from '@angular/core';
import {
  ICarouselBanner,
  ICarouselImage,
} from 'src/app/models/carousel-banner.model';
import { IBrandCarouselItem } from 'src/app/models/brands-carousel.model';
import { IHowToEnjoy } from '../../models/static-items.model';
import { IProductCard } from 'src/app/models/product-card.model';
import { ICategoriesGroupItem } from 'src/app/models/shared.model';
import { ProductDiscountService } from './product-discount.service';
import { RedirectService } from '../redirect.service';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(
    private productDiscountService: ProductDiscountService,
    private redirectService: RedirectService
  ) {}

  setRedirectURL(element: any) {
    if (!element?.redirectOption) return element?.redirect;

    const redirectSplitted = element?.redirect?.split('/'),
      storeOrBenefit = redirectSplitted?.[1],
      group = redirectSplitted?.[2],
      campOrCategory = redirectSplitted?.[3],
      productOrBrand = redirectSplitted?.[4];

    const isCampaign = element?.is_campaign;

    switch (element?.redirectOption) {
      case 'Grupo de categoria':
        return storeOrBenefit === 'product'
          ? `/tienda/${group}`
          : `/beneficios/${group}`;

      case 'Categoria':
        return `/tienda/${group}/categoria/${campOrCategory}`;
      case 'Campaña':
        return `/tienda/${group}/camp/${campOrCategory}`;
      case 'Marca':
        return `/tienda/${group}/${
          isCampaign ? 'camp' : 'categoria'
        }/${campOrCategory}/marca/${productOrBrand}`;
      case 'Producto':
        return `/tienda/${group}/categoria/${campOrCategory}/marca/marca/producto/${productOrBrand}`;
      case 'Experiencia':
        return `/beneficios/${group}/categoria/${campOrCategory}`;
      default:
        return '';
    }
  }

  transformCarouselData(
    carousel: any,
    autoplay: boolean = true,
    animation: boolean = true,
    itemsPerSlide: number = 1,
    arrows: boolean = false,
    indicators: boolean = true
  ): ICarouselBanner {
    const banners: Array<ICarouselImage> = [];
    const carouselData: ICarouselBanner = {
      interval: carousel?.transition_time || 5000,
      autoplay: autoplay,
      animation: animation,
      itemsPerSlide: itemsPerSlide,
      arrows: arrows,
      indicators: indicators,
      banners: banners,
    };
    carousel?.content.forEach((el) => {
      carouselData.banners.push({
        buttonLabel: el.button_label,
        imageURL: el.url_attachment + el.value,
        title: el.text_info,
        subtitle: el.subtitle,
        redirectURL: this.setRedirectURL(el),
      });
    });
    return carouselData;
  }

  transformBannerListData(bannerList: Array<any>): Array<ICarouselImage> {
    const bannerListData: Array<ICarouselImage> = [];
    bannerList.forEach((el) => {
      bannerListData.push({
        buttonLabel: el.button_label,
        imageURL: el.url_attachment + el.value,
        redirectURL: this.setRedirectURL(el),
        subtitle: el.subtitle,
        title: el.text_info,
      });
    });
    return bannerListData;
  }

  transformAssociatedBrandsData(brandsList: any): Array<IBrandCarouselItem> {
    return brandsList?.data.map((brand: any) => ({
      _id: brand?._id,
      logo: brandsList?.url_attachment + brand?.image_logo_banner,
    }));
  }

  transformHteData(howToEnjoyData: any): IHowToEnjoy[] {
    return [
      {
        text: howToEnjoyData.contenido_texto_izquierda?.value,
        imageUrl:
          howToEnjoyData?.contenido_imagen_derecha.url_attachment +
          howToEnjoyData?.contenido_imagen_derecha?.value,
      },
      {
        text: howToEnjoyData.contenido_texto_derecha.value,
        imageUrl:
          howToEnjoyData.contenido_imagen_izquierda.url_attachment +
          howToEnjoyData.contenido_imagen_izquierda.value,
      },
    ];
  }

  transformFeaturedProducts(prodList: Array<any>): Array<IProductCard> {
    let featuredProd: Array<IProductCard> = [];
    let itemProd: IProductCard;
    prodList?.forEach((el) => {
      itemProd = {
        _id: el?._id,
        brand: el?.brand?.name,
        productName: el?.name,
        productImage: el?.url_attachment + el?.image_cover,
        specialPrice: el?.special_price,
        normalPrice: el?.price,
        stock: el?.stock,
        link:
          '/tienda/' +
          el?.categories[0]?.group?.friendly_url +
          '/categoria/' +
          el?.categories[0]?.friendly_url +
          '/marca/' +
          el?.brand?.friendly_url +
          '/producto/' +
          el?.friendly_url,
        discount: this.productDiscountService.calcDiscountFromRawData(el),
        isCampaign: el?.campaign && el?.campaign?.active,
        campaignPrice: el?.campaign_price,
        campaignName: el?.campaign?.discount_name,
        sku: el?.SKU,
        categories: el?.categories,
        isBase: el?.type_variation === 'B',
        image_stamp: this.getStamp(el, el?.url_attachment),
      };
      let categoryDiscount = el?.categories?.find((e) => {
        return e.active_discount;
      });
      if (categoryDiscount) {
        itemProd.isGiftCard = true;
        itemProd.giftCardName = 'Precio Scotiabank';
        itemProd.giftCardPrice =
          el?.special_price - (categoryDiscount?.discount_amount || 50);
      }
      featuredProd.push(itemProd);
    });
    return featuredProd;
  }
  getStamp(product, url_attachment): string {
    if (product?.image_stamp && product.active_stamp) {
      return url_attachment + product.image_stamp;
    }
    if (product?.campaign?.image_stamp && product?.campaign?.active_stamp) {
      console.log('campaing');
      return url_attachment + product.campaign.image_stamp;
    }
    if (
      product?.found_category?.image_stamp &&
      product?.found_category?.active_stamp
    ) {
      console.log('category');
      return url_attachment + product.found_category.image_stamp;
    }
    const foundCategory = product?.categories?.find(
      (category) => category.active_stamp && category.image_stamp
    );
    if (foundCategory) {
      return url_attachment + foundCategory.image_stamp;
    }
    return '';
  }

  categoryListFormat(categoryList: Array<any>): Array<ICategoriesGroupItem> {
    let result: Array<ICategoriesGroupItem> = [];
    let item: ICategoriesGroupItem = null;
    categoryList?.forEach((e) => {
      item = {
        _id: e?._id,
        friendly_url: e?.friendly_url,
        image_app: e?.image_app,
        image_web: e?.image_intro,
        name: e?.name,
        typeGroupCategory: e?.typeGroupCategory,
        url_attachment: e?.url_attachment,
        link:
          (e?.typeGroupCategory?.ref1 == 'product'
            ? '/tienda/'
            : '/beneficios/') + e?.friendly_url,
      };
      result.push(item);
    });
    return result;
  }
}
