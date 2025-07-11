// Define options interface
interface ArchTextOptions {
  radius: number;
  dir: number;
  rotate: boolean;
  reverse: boolean;
}

// Define element type
type ArchTextElement = string | HTMLElement;

class ArchText {
  private element: HTMLElement;
  private options: ArchTextOptions;
  private letterSpans: HTMLSpanElement[];

  constructor(
    element: ArchTextElement,
    options: Partial<ArchTextOptions> = {}
  ) {
    this.element =
      typeof element === "string"
        ? document.querySelector(element)!
        : (element as HTMLElement);
    this.options = Object.assign(
      { radius: 0, dir: 1, rotate: true, reverse: false },
      options
    );
    this.letterSpans = [];
    this.wrapLetters();
    this.letterSpans = Array.from(this.element.querySelectorAll("span"));
    this.letterSpans.forEach(
      (span: HTMLSpanElement) => (span.style.display = "inline-block")
    );
    this.calculatePositions();
    this.applyTransforms();
  }

  // Wrap characters and handle reverse
  private wrapLetters(): void {
    this.element.innerHTML = Array.from(this.element.innerText)
      .map((char: string) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
      .join("");
    if (this.options.reverse) {
      this.element.style.display = "inline-block";
      this.element.style.transform = "rotate(180deg)";
    }
  }

  // Calculate character positions and angles
  private calculatePositions(): void {
    if (this.options.radius === -1) return;
    let totalWidth = 0;
    this.letterSpans.forEach((span: HTMLSpanElement) => {
      totalWidth += span.offsetWidth;
      span.dataset.center = (totalWidth - span.offsetWidth / 2).toString();
    });
    const center = totalWidth / 2;
    console.log(center);
    if (this.options.radius < center) this.options.radius = center;
    const archLength =
      this.options.radius *
      2 *
      Math.asin(totalWidth / (2 * this.options.radius));
    let currentX = 0;
    this.letterSpans.forEach((span: HTMLSpanElement) => {
      const w = span.offsetWidth;
      const archLetter = (w / totalWidth) * archLength;
      const beta = archLetter / this.options.radius;
      const h = this.options.radius * Math.cos(beta / 2);
      const alpha = Math.acos(
        (totalWidth / 2 - currentX) / this.options.radius
      );
      const theta = alpha + beta / 2;
      const x = Math.cos(theta) * h;
      const y = Math.sin(theta) * h;
      const xpos = currentX + Math.abs(totalWidth / 2 - x - currentX);
      const xOffset = xpos - parseFloat(span.dataset.center || "0");
      const yOffset = this.options.radius - y;
      const angle = this.options.rotate
        ? -Math.asin(x / this.options.radius) * (180 / Math.PI)
        : 0;
      currentX = 2 * xpos - currentX;
      span.dataset.x = xOffset.toString();
      span.dataset.y = (this.options.dir === 1 ? yOffset : -yOffset).toString();
      span.dataset.a = (this.options.dir === 1 ? angle : -angle).toString();
    });
  }

  // Apply transforms
  private applyTransforms(): void {
    this.letterSpans.forEach((span: HTMLSpanElement) => {
      span.style.transform =
        this.options.radius === -1
          ? "none"
          : `translateX(${span.dataset.x}px) translateY(${span.dataset.y}px) rotate(${span.dataset.a}deg)`;
    });
  }
}

export default ArchText;
