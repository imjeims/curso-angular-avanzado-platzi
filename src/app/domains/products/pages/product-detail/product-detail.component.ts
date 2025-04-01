import { Component, inject, input, linkedSignal, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { Title, Meta } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent {
  readonly slug = input.required<string>();

  productRs = rxResource({
    request: () => ({
      slug: this.slug(),
    }),
    loader: ({ request }) => {
      return this.productService.getOneBySlug(request.slug);
    },
  });

  $cover = linkedSignal(() => this.productRs.value()?.images[0] ?? '');
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    effect(() => {
      const product = this.productRs.value();
      if (product) {
        this.titleService.setTitle(product.title);
        this.metaService.updateTag({
          name: 'description',
          content: product.description,
        });
        this.metaService.updateTag({
          property: 'og:image',
          content: product.images[0],
        });
        this.metaService.updateTag({
          property: 'og:title',
          content: product.title,
        });
        this.metaService.updateTag({
          property: 'og:description',
          content: product.description,
        });
        this.metaService.updateTag({
          property: 'og:url',
          content: `${environment.domain}/product/${product.slug}`,
        });
      }
    });
  }

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.productRs.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
