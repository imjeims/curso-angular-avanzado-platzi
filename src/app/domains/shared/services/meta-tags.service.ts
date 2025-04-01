import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

export interface PageMetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const defaultMetaData: PageMetaData = {
  title: 'Ng Store',
  description: 'Ng Store is a store for Ng products',
  image: 'https://store.com/assets/images/og-image.png',
  url: environment.domain,
};

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  titleService = inject(Title);
  metaService = inject(Meta);

  updateMetaTags(metaData: Partial<PageMetaData>) {
    const metaDataToUpdate = {
      ...defaultMetaData,
      ...metaData,
    };

    this.generateMetaDefinitions(metaDataToUpdate).forEach((tag) => {
      this.metaService.updateTag(tag);
    });

    this.titleService.setTitle(metaData.title || defaultMetaData.title);
    this.metaService.updateTag({
      name: 'description',
      content: metaData.description || defaultMetaData.description,
    });
  }

  private generateMetaDefinitions(metaData: PageMetaData): MetaDefinition[] {
    return [
      {
        name: 'title',
        content: metaData.title,
      },
      {
        name: 'description',
        content: metaData.description,
      },
      {
        property: 'og:title',
        content: metaData.title,
      },
      {
        property: 'og:description',
        content: metaData.description,
      },
      {
        property: 'og:image',
        content: metaData.image,
      },
      {
        property: 'og:url',
        content: metaData.url,
      },
    ];
  }
}
