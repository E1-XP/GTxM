import { Component, html } from "project-f";

export interface Props {}

export class PageBackgrounds extends Component {
  props = ["currentSlide"];

  active: HTMLElement | null = null;
  prevActiveStyle: string = "";
  isOdd = false;

  getBackgrounds = () => {
    const { extractedColors, currentSlide } = this.model.getState();

    if (currentSlide === undefined || !extractedColors) {
      throw new Error("page backgrounds crashed.");
    }

    const val = (() => {
      const darkMuted = extractedColors[currentSlide].DarkMuted;
      if (darkMuted) return darkMuted._rgb.join(",");

      return extractedColors[currentSlide].DarkVibrant._rgb.join(",");
    })();

    const val2 = (() => {
      const muted = extractedColors[currentSlide].Muted;
      if (muted) return muted._rgb.join(",");

      return extractedColors[currentSlide].Vibrant._rgb.join(",");
    })();

    const val3 = (() => {
      // const darkVibrant = extractedColors[currentSlide].DarkVibrant;
      // if (darkVibrant) return darkVibrant._rgb.join(",");
      return "15, 15, 15";
    })();

    this.prevActiveStyle = this.active
      ? <string>this.active.style.background
      : "";

    const template = `linear-gradient(to top, rgb(${val3}) , rgb(${val}), rgb(${val2}))`;

    return { active: template, back: this.prevActiveStyle };
  };

  render() {
    this.isOdd = !this.isOdd; // force class replacement to enable transition
    this.active = document.querySelector(".page_background__item.active div");

    const { active, back } = this.getBackgrounds();

    return html`
        <ul class="page_background">
            <li class="page_background__item ${this.isOdd ? "active" : "back"}">
                <div style="background:${this.isOdd ? active : back};"></div>
            </li>
            <li class="page_background__item ${this.isOdd ? "back" : "active"}">
                <div style="background:${this.isOdd ? back : active};" ></div>
            </li>
        </ul>
    `;
  }
}
