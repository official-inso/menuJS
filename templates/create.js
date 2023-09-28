export default class Create {
  parent = undefined;

  /**
   * Конструктор класса templates
   * @constructor
   * @returns {void}
   */
  constructor(parent) {
    this.parent = parent;
  }

  /**
   * Создает контейнер для меню и возвращает его
   * @returns Возвращает контейнер для меню
   */
  container(id) {
    let menu = document.createElement("MenuJS");
    menu.classList.add("MenuJS_container");
    menu.setAttribute("id", id);

    return menu;
  }

};