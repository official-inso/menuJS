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
  

  /**
   * Инициализация навигатора по переданному селектору или элементу
   * @param {string|HTMLElement} selector Селектор или элемент где будет инициализирован навигатор
   * @returns {void}
   */
  constructor(selector) {
    this.templates = new templates();
    this.#createInspector(selector);
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

  #createInspector(selector) {
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



};