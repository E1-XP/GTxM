import { html, run } from "project-f";

import { Props } from "./index";

import { button, icon } from "./../shared";
import { SliderNavigation } from "./../sliderNavigation";

export default ({
  images,
  getImageList,
  getLikes,
  currentSlide,
  checkIfLiked,
  isSliderRunning,
  isLightboxOpen,
  parentRef
}: Props) => html`
  <div class="image_slider">
    <div
      class="${isLightboxOpen ? "is-open " : ""}image_slider__lightbox"
      id="js-lightbox"
    ></div>
    <figure class="image_slider__content">
      <ul class="content__list">
        ${images && getImageList()}
      </ul>
      <nav class="content__navigation">
        <div
          class="navigation__progress ${isSliderRunning ? "is-open" : ""}"
        ></div>
        <div class="slide__button--left" id="js-slider-back">
          <span class="material-icons icon">arrow_back_ios</span>
        </div>
        <div class="navigation__dock">
          <div class="navigation__button" id="js-slider-stop">
            <span class="material-icons icon"
              >${isSliderRunning ? "pause" : "play_arrow"}</span
            >
          </div>
          <div class="navigation__button" id="js-slider-getimg">
            <span class="material-icons icon">open_in_new</span>
          </div>
        </div>
        <div class="navigation__button--fullscreen" id="js-slider-fullscreen">
          <span class="material-icons icon">photo_size_select_large</span>
        </div>
        <div class="slide__button--right" id="js-slider-next">
          <span class="material-icons icon">arrow_forward_ios</span>
        </div>
      </nav>
    </figure>
    <section class="image_slider__info">
      <div class="info__slide_count">
        ${images &&
          currentSlide !== undefined &&
          currentSlide + 1 + " / " + images.length}
      </div>
      <p class="info__description">description</p>
      <div class="info__likes">
        <div class="likes__count">
          ${currentSlide !== undefined && getLikes(currentSlide)}
        </div>
        ${button(["like ", icon("add")], "medium", {
          id: "js-likes-btn",
          class:
            currentSlide !== undefined && checkIfLiked(currentSlide)
              ? "active"
              : ""
        })}
      </div>
    </section>
    ${run(SliderNavigation, "sn", parentRef)}
  </div>
`;
