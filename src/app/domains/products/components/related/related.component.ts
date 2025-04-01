import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from '../product/product.component';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedComponent {
  slug = input.required<string>({ alias: 'slug' });
  private productService = inject(ProductService);

  relatedProductsRs = rxResource({
    request: () => ({
      slug: this.slug(),
    }),
    loader: ({ request }) =>
      this.productService.getRelatedProducts(request.slug),
  });
}
