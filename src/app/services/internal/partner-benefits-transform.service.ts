import { Injectable } from '@angular/core';
import { IBenefitData } from 'src/app/models/benefits.model';
import { ICompanyPage } from 'src/app/models/company.model';
import {
  ICategoryExperience,
  IExperiencesPage,
} from 'src/app/models/experiences.model';
import { IPartnerBenefitsCategoryGroup } from 'src/app/resolvers/core/partner-benefits/category-group.resolver';
import { IPartnerBenefitsCategory } from 'src/app/resolvers/core/partner-benefits/category.resolver';
import { IPartnerBenefitsCompany } from 'src/app/resolvers/core/partner-benefits/company.resolver';
import { IPartnerBenefitsCompanyDetail } from 'src/app/resolvers/core/partner-benefits/benefit-detail.resolver';

@Injectable({
  providedIn: 'root',
})
export class PartnerBenefitsTransformService {
  constructor() {}
  transformCategoryGroup(
    categoryGroup: IPartnerBenefitsCategoryGroup,
    pathToCategoryItemCard
  ): IExperiencesPage {
    return {
      bannerItems: categoryGroup?.carouselData?.content?.map((banner) => ({
        title: banner.text_info,
        imageURL: banner.url_attachment + banner.value,
        redirectURL: banner.redirect,
      })),
      categories: categoryGroup?.categoriesData?.data.map((category) => ({
        friendly_url: category.friendly_url,
        link: pathToCategoryItemCard + category?.friendly_url,
        image_app: category?.image_link_mobile,
        image_web: category?.image_link,
        name: category?.name,
        url_attachment: category?.url_attachment,
        _id: category?._id,
        typeGroupCategory: {
          active: category?.active,
          code: category?.code_ERP,
          ref1: '',
          value: '',
          _id: category?._id,
        },
      })),
    };
  }

  transformCategory(
    category: IPartnerBenefitsCategory,
    path: string
  ): ICategoryExperience {
    return {
      categoryName: category?.entity?.name,
      desktopBanner: category?.entity?.images_banner_link.map((element) => ({
        link: category?.url_attachment + element.link,
        subtitle: element.subtitle,
        title: element.title,
        urlredirect: element.urlredirect,
      })),
      mobileBanner:
        category?.entity?.images_banner_link_app.map((element) => ({
          link: category?.url_attachment + element.link,
          subtitle: element.subtitle,
          title: element.title,
          urlredirect: element.urlredirect,
        })) || [],
      brands: category?.brands?.data.map((data) => ({
        _id: data?._id,
        friendly_url: data?.friendly_url,
        logo: category?.url_attachment + data?.image_logo_cover,
        imageUrl: category?.url_attachment + data?.image_cover,
        linkRedirect:
          path +
          category?.entity?.friendly_url +
          '/empresa/' +
          data?.friendly_url,
      })),
      subcategories: category.subCategories.data.map((subcategory) => ({
        text: subcategory?.name,
        imageDesktop: category?.url_attachment + subcategory?.image_link,
        imageMobile: category?.url_attachment + subcategory?.image_link_app,
        link: `/beneficios/${category.entity.group.friendly_url}/categoria/${subcategory.friendly_url}`,
      })),
      activations: {
        activationsList: category?.benefits?.data?.map((benefit) => ({
          _id: benefit?._id,
          backgroundUrl: category?.url_attachment + benefit?.image_thumbnail,
          link:
            path +
            category?.entity?.friendly_url +
            '/empresa/' +
            benefit?.business_slug +
            '/beneficio/' +
            benefit?.slug,
          slug: benefit?.slug,
          subtitle: null,
          title: benefit?.title,
          buisness: benefit?.experience_name
        })),
        totalPages: category?.benefits?.quantityPage,
        totalFound: category?.benefits?.totalItem,
      },
    };
  }

  transformCompany(
    company: IPartnerBenefitsCompany,
    pathToExperienceCard: string
  ): ICompanyPage {
    return {
      name: company?.name,
      logo: company?.url_attachment + company?.image_logo_cover,
      desktopBanner: company?.url_attachment + company?.image_banner,
      images_link: company.images_link.map((el) => el[0]),
      videos_link: company.videos_link,
      description: company.detail_list[0].description,
      _id: company._id,
      experiences: company?.list_advantage.map((data) => ({
        _id: data?._id,
        title: data?.title,
        slug: data?.slug,
        backgroundUrl: company?.url_attachment + data?.image_thumbnail,
        link: pathToExperienceCard + data?.slug,
      })),
      list_address: company?.list_address.map((dataAddress) => ({
        address: dataAddress?.address,
        lat: dataAddress?.lat,
        long: dataAddress?.lng,
        phone: '',
        localName: '',
        selected: false,
      })),
      contactInfo: {
        schedule: [
          {
            day: null,
            time: company?.schedule,
          },
        ],
        phone: company?.phone,
        actionsSubmit: company?.list_main_action_email_form?.map((value) => ({
          buttonName: value?.button_name,
          typeButton: value?.type_button,
          _id: value?._id,
        })),
      },
      url_attachment: company.url_attachment,
    };
  }

  transformBenefitDetail({
    benefitDetail,
    companyData,
  }: IPartnerBenefitsCompanyDetail): IBenefitData {
    return {
      name: benefitDetail?.title,
      company_images: benefitDetail.company_images.map((el) => el[0]),
      company_videos: benefitDetail.company_videos,
      url_attachment: benefitDetail.url_attachment,
      company_description: benefitDetail.company_description[0].description,
      desktopBanner:
        benefitDetail?.url_attachment + benefitDetail?.image_description,
      mobileBanner:
        benefitDetail?.url_attachment + benefitDetail?.image_description_mobile,
      detail: benefitDetail?.description.map((info) => ({
        title: info?.title,
        text: info?.description,
      })),
      addressList: companyData?.list_address.map((dataAddress) => ({
        address: dataAddress?.address,
        lat: dataAddress?.lat,
        long: dataAddress?.lng,
        phone: '',
        localName: '',
        selected: false,
      })),
      contactInfo: {
        schedule: [
          {
            day: null,
            time: companyData?.schedule,
          },
        ],
        phone: companyData?.phone,
        actionsSubmit: companyData?.list_main_action_email_form.map(
          (value) => ({
            buttonName: value?.button_name,
            typeButton: value?.type_button,
            _id: value?._id,
          })
        ),
      },
    };
  }
}
