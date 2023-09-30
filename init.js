/**
 * @file init.js
 * @description
 * @since v.1.0.0
 * @version v.1.0.0
 * @author Roman Zhuzhgov
 * @license MIT
 */

/**
 * @requires templates/templates
 */
import templates from './templates/templates.js';

/**
 * @class MenuJS
 * @description Класс для работы с боковым меню
 */
export default class MenuJS {

  #value = undefined;
  
  static initLongPress = false;

  static initLongHover = false;

  #side = 'left';

  /**
   * Инициализация навигатора по переданному селектору или элементу
   * @param {string|HTMLElement} selector Селектор или элемент где будет инициализирован навигатор
   * @returns {void}
   */
  constructor(selector, side) {

    if (side){
      this.setSide(side);
    }
    this.templates = new templates(this);
    this.#createMenu(selector);

    this.#longPress();
    this.#longHover();
  }

  setValue(value){
    this.#value = value;
  }

  getValue(){
    
    let container = document.getElementById(
      this.templates.container.getAttribute("id")
    );

    container.innerHTML = "";

    for (const key in this.#value) {
      const element = this.#value[key];
      
      if (element == 'hr') {
        let out = this.templates.create.hr();
        container.appendChild(out);
      } else {
        let out = this.templates.create.button(
          element.state,
          element.icon,
          element.helper,
          element.enabled,
          element.items,
          element.click,
          element.id
        );
        container.appendChild(out);
      }

      
    }

  }

  setSide(side){
    if (side.match(/^(left|right)$/ui)) {
      this.#side = side;
    }
  }

  getSide(){
    return this.#side;
  }

  updateSide(side){
    this.setSide(side);
  }

  updateValue(id){
    let container = document.getElementById(
      this.templates.container.getAttribute("id")
    );
    let elem = container.querySelector("#" + id);

    const mouseUpEvent = new MouseEvent("mouseup", {
      bubbles: true,  // Указываем, что событие должно всплывать
      cancelable: true, // Указываем, что событие можно отменить
      view: window, // Определяем вид окна
      button: 0, // Определяем кнопку мыши (0 для левой кнопки, 1 для средней, 2 для правой)
      buttons: 1, // Определяем состояние кнопок мыши (1 для левой кнопки)
      clientX: 0, // Определяем положение мыши по горизонтали
      clientY: 0, // Определяем положение мыши по вертикали
    });

    if (elem) elem.dispatchEvent(mouseUpEvent);

    
  }

  #createMenu(selector) {
    if (!(selector instanceof HTMLElement || typeof selector === "string"))
      return console.error(
        "Переданный селектор не является HTMLElement или строкой"
      );

    if (selector instanceof HTMLElement) {
      selector.appendChild(this.templates.container);
    } else if (document.querySelectorAll(selector).length > 0) {
      document.querySelectorAll(selector).forEach((element) => {
        selector.appendChild(this.templates.container);
      });
    }
  }

  #longPress(){

    if (MenuJS.initLongPress) return;

    MenuJS.initLongPress = true;

    // Расширяем прототип DOM элемента, добавляя метод longPress
    HTMLElement.prototype.longPress = function (callback, duration) {
      let pressTimer;
      const element = this;

      element.addEventListener("mousedown", function () {
        pressTimer = setTimeout(function () {
          const longPressEvent = new Event("longPress");
          element.dispatchEvent(longPressEvent);
          callback();
        }, duration);
      });

      element.addEventListener("mouseup", function () {
        clearTimeout(pressTimer);
      });

      element.addEventListener("mouseout", function () {
        clearTimeout(pressTimer);
      });
    };
  }

  #longHover(){
  
    if (MenuJS.initLongHover) return;

    MenuJS.initLongHover = true;

    // Расширяем прототип DOM элемента, добавляя метод longHover
    HTMLElement.prototype.longHover = function (callback, duration) {
      let hoverTimer;
      const element = this;

      element.addEventListener("mouseenter", function () {
        hoverTimer = setTimeout(function () {
          const longHoverEvent = new Event("longHover");
          element.dispatchEvent(longHoverEvent);
          callback();
        }, duration);
      });

      element.addEventListener("mouseleave", function () {
        clearTimeout(hoverTimer);
      });
    };

  }

};