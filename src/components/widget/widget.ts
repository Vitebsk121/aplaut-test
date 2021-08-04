import './widget.scss';

import { BaseComponent } from '../baseComponent';
import { ProductInfo } from '../product-Info/productInfo';
import { getWidgetData } from '../../shared/server';
import { ReviewsField } from '../reviewsField/reviewsField';

export class Widget {
  private widget: BaseComponent;

  constructor(rootElement: HTMLElement) {
    this.widget = new BaseComponent('div', ['wg-wrapper']);

    getWidgetData(['page=1', 'per_page=40']).then((data) => {
      this.render(rootElement, data);
    });
  }

  render(rootElement: HTMLElement, data: Widget): void {

    const productInfo = new ProductInfo(Object(data).product);

    Object(data).reviews;
    const reviewsField = new ReviewsField(Object(data).reviews);

    rootElement.append(this.widget.element);

    this.widget.element.append(productInfo.element, reviewsField.element);
  }
}
