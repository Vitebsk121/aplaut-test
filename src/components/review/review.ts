import { ReviewData } from '../../shared/interfaces';
import { Author } from '../author/author';
import { BaseComponent } from '../baseComponent';
import { CarouselOfPhotos } from '../carouselOfPhotos/carouselOfPhotos';
import './review.scss';

export class Review extends BaseComponent {
  constructor(review: ReviewData) {
    super('div', ['rv-field__rv']);

    this.render(review);
  }

  render(review: ReviewData): void {

    let isLiked = false;
    let isDisliked = false;

    let countOfLikes: number | string = review.likes;

    if (countOfLikes === 0) countOfLikes = '';

    let countOfDislikes: number | string = review.dislikes;

    if (countOfDislikes === 0) countOfDislikes = '';

    const author = new Author(review);

    const reviewMessage = new BaseComponent('p', ['rv__message'], '', review.body);

    const reviewPros = new BaseComponent('p', ['rv__pros']);

    reviewPros.element.innerHTML = `
        <b>Достоинства: </b>${review.pros}
        `;

    const reviewCons = new BaseComponent('p', ['rv__pros'], '', `Недостатки: ${review.cons}`);

    reviewCons.element.innerHTML = `
        <b>Недостатки: </b>${review.cons}
        `;

    const reviewGallery = new CarouselOfPhotos('', review);

    const reviewInfo = new BaseComponent('div', ['rv__info']);

    const reviewLikesInfo = new BaseComponent('div', ['rv__info__likes-info']);

    const like = new BaseComponent('div', ['rv__info__like']);

    like.element.addEventListener('click', () => {
      if (isLiked) return;
      isLiked = true;

      like.element.style.backgroundImage = 'url(like.svg)';
      countOfLikes = Number(countOfLikes) + 1;
      if (countOfLikes === 0) countOfLikes = '';
      likesCount.element.innerText = String(countOfLikes);

      if (isDisliked) {
        dislike.element.style.backgroundImage = 'url(https://image.flaticon.com/icons/png/512/633/633759.png)';
        dislike.element.style.filter = 'hue-rotate(0deg)';
        countOfDislikes = Number(countOfDislikes) - 1;
        if (countOfDislikes === 0) countOfDislikes = '';
        dislikesCount.element.innerText = String(countOfDislikes);
        isDisliked = false;
      }
    });

    const likesCount = new BaseComponent('p', ['rv__info__likes-count'], '', `${countOfLikes}`);

    const reviewDislikesInfo = new BaseComponent('div', ['rv__info__dislikes-info']);

    const dislike = new BaseComponent('div', ['rv__info__dislike']);

    dislike.element.addEventListener('click', () => {
      if (isDisliked) return;
      isDisliked = true;

      dislike.element.style.backgroundImage = 'url(like.svg)';
      dislike.element.style.filter = 'hue-rotate(240deg)';
      countOfDislikes = Number(countOfDislikes) + 1;
      if (countOfDislikes === 0) countOfDislikes = '';
      dislikesCount.element.innerText = String(countOfDislikes);

      if (isLiked) {
        like.element.style.backgroundImage = 'url(https://image.flaticon.com/icons/png/512/633/633759.png)';
        countOfLikes = Number(countOfLikes) - 1;
        if (countOfLikes === 0) countOfLikes = '';
        likesCount.element.innerText = String(countOfLikes);
        isLiked = false;
      }
    });

    const dislikesCount = new BaseComponent('p', ['rv__info__dislikes-count'], '', `${countOfDislikes}`);


    const answerBtn = new BaseComponent('button', ['rv__info__answer-btn'], '', 'Ответить');



    this.element.append(
      author.element,
      reviewMessage.element,
      reviewPros.element,
      reviewCons.element,
      reviewGallery.element,
      reviewInfo.element,
    );

    if (review.pros === null) reviewPros.element.style.display = 'none';
    if (review.cons === null) reviewCons.element.style.display = 'none';

    reviewInfo.element.append(reviewLikesInfo.element, reviewDislikesInfo.element, answerBtn.element);

    reviewLikesInfo.element.append(like.element, likesCount.element);

    reviewDislikesInfo.element.append(dislike.element, dislikesCount.element);
  }
}
