export default class Create {
  parent = undefined;
  click = undefined;
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

    menu.setAttribute("side", this.parent.parent.getSide());
    return menu;
  }

  hr() {
    let hr = document.createElement("MenuJSHR");
    return hr;
  }

  button(
    name = "Текст кнопки",
    iconClass = "icons-error",
    helperObj = undefined,
    active = false,
    items = [],
    click = undefined,
    id = this.parent.randomString(30),
    length = 0
  ) {

    let item = document.createElement("MenuJSItem");
    let itemClick = document.createElement("MenuJSItemClick");
    let itemIcon = document.createElement("MenuJSItemIcon");
    let itemTitle = document.createElement("MenuJSItemTitle");
    let itemMore = document.createElement("MenuJSItemMore");
    let itemSubmenu = document.createElement("MenuJSItemSubmenu");
    


    itemClick.appendChild(itemIcon);
    itemClick.appendChild(itemTitle);

    item.appendChild(itemClick);
    item.appendChild(itemSubmenu);
    

    item.setAttribute("type", "switch");
    itemClick.setAttribute("tabindex", "0");

    itemClick.setAttribute("id", id);

    if(items.length > 0){

      itemIcon.classList.add(items[0].icon);
      itemTitle.innerText = items[0].name;
      itemClick.appendChild(itemMore);
      

      if (helperObj) {
        let itemHelper = this.helper(
          helperObj.img,
          helperObj.title,
          helperObj.desc,
          helperObj.buttons
        );

        item.appendChild(itemHelper);
        item.longHover(() => {
          item.setAttribute("helper", "true");
        }, 1000);

      }

      item.longPress(() => {
        item.setAttribute("submenu", "true");
      }, 500);
      
      items.forEach(element => {
        itemSubmenu.appendChild(this.button(
          element.name,
          element.icon,
          element.helper,
          element.enabled,
          element.items,
          element.click,
          element.id,
          length + 1
        ));
      });
    } else {
      itemIcon.classList.add(iconClass);
      itemTitle.innerText = name;

      if (length == 0){
        if (helperObj) {
          let itemHelper = this.helper(
            helperObj.img,
            helperObj.title,
            helperObj.desc,
            helperObj.buttons
          );

          item.appendChild(itemHelper);
          item.longHover(() => {
            item.setAttribute("helper", "true");
          }, 1000);

        }
      } 
      
    }

    itemClick.addEventListener("mouseup", (e) => {

      if(length == 0){

        let items = e.target.parentElement.parentElement.parentElement.querySelectorAll("MenuJS > MenuJSItem");
        
        items.forEach(element => {
          element.removeAttribute("active");
        });

        if (click) {
          click(e.target, id);
          e.target.parentElement.setAttribute("active", "true");
          e.target.parentElement.removeAttribute("submenu");
          e.target.parentElement.removeAttribute('helper')
        }
        else {

          let container = document.getElementById(this.parent.container.getAttribute('id'));

          let activeElem = item.querySelector("MenuJSItemSubmenu MenuJSItem[active] MenuJSItemClick");
          let _id = undefined;
          if(activeElem) {
            _id = activeElem.getAttribute("id");
          } else {
            activeElem = item.querySelector("MenuJSItemSubmenu MenuJSItem MenuJSItemClick")
            _id = activeElem.getAttribute("id");
          }

          let elemFirstActive = container.querySelector("#" + _id);

          const mouseUpEvent = new MouseEvent("mouseup", {
            bubbles: true,  // Указываем, что событие должно всплывать
            cancelable: true, // Указываем, что событие можно отменить
            view: window, // Определяем вид окна
            button: 0, // Определяем кнопку мыши (0 для левой кнопки, 1 для средней, 2 для правой)
            buttons: 1, // Определяем состояние кнопок мыши (1 для левой кнопки)
            clientX: 0, // Определяем положение мыши по горизонтали
            clientY: 0, // Определяем положение мыши по вертикали
          });

          elemFirstActive.dispatchEvent(mouseUpEvent);
        }
      } else {
        click(e.target, id);
        let icon = e.target.querySelector("MenuJSItemIcon").getAttribute("class").split(" ")[0];
        let title = e.target.querySelector("MenuJSItemTitle").innerText;
        let container = document.getElementById(this.parent.container.getAttribute('id'));
        let mainElem = e.target.parentElement.parentElement.parentElement.querySelector('MenuJSItemClick');
        let mainIcon = mainElem.querySelector("MenuJSItemIcon");
        let mainTitle = mainElem.querySelector("MenuJSItemTitle");
        let items = container.querySelectorAll("MenuJS > MenuJSItem");

        items.forEach(element => {
          element.removeAttribute("active");
        });

        e.target.parentElement.parentElement.querySelectorAll("MenuJSItem").forEach(element => {
          element.removeAttribute("active");
        });

        e.target.parentElement.parentElement.parentElement.setAttribute("active", "true");

        e.target.parentElement.setAttribute("active", "true");
        mainIcon.setAttribute("class", icon);
        mainTitle.innerText = title;

        

        setTimeout(() => {
          e.target.parentElement.parentElement.parentElement.removeAttribute("submenu")
          e.target.parentElement.parentElement.parentElement.removeAttribute('helper')
        }, 500)
        
        
      }

    });





    return item;


  }

  helper(img, title = "Нет названия", text, btns = []) {
    let helper = document.createElement("MenuJSItemHelper");
    let helperImage = document.createElement("MenuJSItemHelperImage");
    let helperText = document.createElement("MenuJSItemHelperText");
    let helperDesc = document.createElement("MenuJSItemHelperDesc");
    let helperBtns = document.createElement("MenuJSItemHelperBtns");

    if (img && img != "") {
      helperImage.style.backgroundImage = `url(${img})`;
      helper.appendChild(helperImage);
    }

    helperText.innerText = title;
    helper.appendChild(helperText);

    if (text && text != "") {
      helperDesc.innerText = text;
      helper.appendChild(helperDesc);
    }

    if (btns.length > 0) {
      btns.forEach((element) => {
        let btn = document.createElement("button");
        btn.innerText = element.text;
        btn.addEventListener("click", element.click);
        helperBtns.appendChild(btn);
      });
    }

    helper.appendChild(helperBtns);

    return helper;
  }
};