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

  hr() {
    let hr = document.createElement("MenuJSHR");
    return hr;
  }

  button(
    state = "Текст кнопки",
    iconClass = "icons-error",
    helperObj = undefined,
    active = false,
    items = [],
    click = undefined,
    id = this.parent.randomString(30)
  ) {
    // <MenuJSItem type="switch" tabindex="0" helper="true" active>
    //   <MenuJSItemIcon class="icons-pointer"></MenuJSItemIcon>
    //   <MenuJSItemTitle>Выделить</MenuJSItemTitle>
    //   <MenuJSItemMore></MenuJSItemMore>
    //   <MenuJSItemSubmenu>
    //     <MenuJSItem>
    //       <MenuJSItemIcon class="icons-home"></MenuJSItemIcon>
    //       <MenuJSItemTitle>Element1</MenuJSItemTitle>
    //     </MenuJSItem>

    //     <MenuJSItem>
    //       <MenuJSItemIcon class="icons-home"></MenuJSItemIcon>
    //       <MenuJSItemTitle>Element2</MenuJSItemTitle>
    //     </MenuJSItem>
    //   </MenuJSItemSubmenu>

    //   <MenuJSItemHelper visible="hidden">
    //     <MenuJSItemHelperImage style="background-image: url(https://i.pinimg.com/originals/26/6b/e8/266be8ffd47b293b5aa0f3d35c19775d.gif)"></MenuJSItemHelperImage>
    //     <MenuJSItemHelperText>Выделить</MenuJSItemHelperText>
    //     <MenuJSItemHelperDesc>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
    //       <a href="#">Porro</a> debitis corrupti quam a, consectetur cum nobis
    //       impedit totam vel optio quia modi ipsa quis laudantium eveniet.
    //       Obcaecati, deserunt.
    //     </MenuJSItemHelperDesc>
    //     <button>Просмотр</button>
    //   </MenuJSItemHelper>
    // </MenuJSItem>

    let item = document.createElement("MenuJSItem");
    let icon = document.createElement("MenuJSItemIcon");
    let title = document.createElement("MenuJSItemTitle");
    let more = document.createElement("MenuJSItemMore");
    let submenu = document.createElement("MenuJSItemSubmenu");

    let openHelper = true;

    item.setAttribute("_id", id);

    if (typeof state == "string") {
      title.innerText = state;
    }

    icon.classList.add(iconClass);

    item.appendChild(icon);
    item.appendChild(title);

    if (items && items.length > 0) {
      items.forEach((element) => {
        let out = this.button(
          element.state,
          element.icon,
          undefined,
          element.enabled,
          [],
          element.click,
          element.id
        );
        submenu.appendChild(out);
      });

      item.appendChild(more);
      item.appendChild(submenu);

      // Если долгое удержание левой кнопки мыши, то открываем меню добавляя атрибут submenu
      item.addEventListener("mousedown", (e) => {
        if (e.which == 1) {
          let timer = setTimeout(() => {
            item.setAttribute("submenu", "true");
            item.removeAttribute("helper");
            openHelper = false;
          }, 250);
          item.addEventListener("mouseup", () => {
            clearTimeout(timer);
          });
        }
      });
    }

    if (helperObj) {
      let helper = this.helper(
        helperObj.img,
        helperObj.title,
        helperObj.desc,
        helperObj.buttons
      );
      item.appendChild(helper);

      let mousePosition = { x: 0, y: 0 };
      let lastMousePosition = { x: 0, y: 0 };
      let mouseMoved = false;
      let mouseStoppedTimer = null;

      item.addEventListener("mousemove", function (event) {
        mousePosition.x = event.pageX;
        mousePosition.y = event.pageY;
        mouseMoved =
          Math.abs(mousePosition.x - lastMousePosition.x) > 15 ||
          Math.abs(mousePosition.y - lastMousePosition.y) > 15;
        lastMousePosition.x = mousePosition.x;
        lastMousePosition.y = mousePosition.y;
        clearTimeout(mouseStoppedTimer);
        mouseStoppedTimer = setTimeout(function () {
          if (!mouseMoved) {
            if (openHelper) {
              item.setAttribute("helper", "true");
            }
          }
        }, 1000);
      });

      item.addEventListener("mouseleave", function (event) {
        clearTimeout(mouseStoppedTimer);
        item.removeAttribute("helper");
        openHelper = true;
      });
    }

    let r = false;

    item.addEventListener("mousedown", (e) => {
      // e.preventDefault();

      let container = document.getElementById(
        this.parent.container.getAttribute("id")
      );
      container.querySelectorAll("MenuJSItem").forEach((element) => {
        element.removeAttribute("active");
      });
      r = true;
    });

    item.addEventListener("mouseup", (e) => {
 
      let divElement = e.target.parentNode;

      if (items.length == 0 && e.target.parentNode.tagName != "MENUJS") {
        
        e.target.setAttribute("active", "true");

        
        while (divElement.tagName !== "MENUJSITEM") {
          divElement = divElement.parentNode;
          if (!divElement) {
            break;
          }
        }
        divElement.querySelector("MenuJSItemIcon").setAttribute("class", "");
        divElement.querySelector("MenuJSItemIcon").classList.add(iconClass);
        divElement.setAttribute("_id", id);
      }
      if (r) if (click) click(id);

      if(divElement.querySelectorAll("MenuJSItem").length > 0){
        console.log(123)
      }

      item.setAttribute("active", "true");
      r = false;
    });

    item.setAttribute("type", "switch");
    item.setAttribute("tabindex", "0");

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