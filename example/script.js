import MenuJS from "./../init.js";

document.addEventListener('DOMContentLoaded', function() {

  const menuJS = new MenuJS(document.getElementById("menuJS_content"));

  menuJS.setValue([
    {
      icon: "icons-pointer",
      id: "rndString1",
      enabled: true,
      helper: {
        img: "https://i.pinimg.com/originals/26/6b/e8/266be8ffd47b293b5aa0f3d35c19775d.gif",
        title: "Выделение",
        desc: "Данная функция позволяет выделить элементы в программе",
        buttons: [
          {
            text: "123",
            click: () => {
              console.log("123");
            },
          },
          {
            text: "123",
            click: () => {
              console.log("123");
            },
          },
        ],
      },
      name: "Выделить",
      click: (e) => {
        console.log("Выделить22", e);
      },
    },
    {
      icon: "icons-pointer",
      id: "rndString1",
      enabled: true,
      helper: {
        img: "https://i.pinimg.com/originals/26/6b/e8/266be8ffd47b293b5aa0f3d35c19775d.gif",
        title: "Выделение",
        desc: "Данная функция позволяет выделить элементы в программе",
        buttons: [
          {
            text: "123",
            click: () => {
              console.log("123");
            },
          },
          {
            text: "123",
            click: () => {
              console.log("123");
            },
          },
        ],
      },
      name: "Выделить",
      value: "rndString1",
      items: [
        {
          icon: "icons-load",
          id: "rndString1",
          name: "Выделить",
          enabled: true,
          click: (e) => {
            console.log("Выделить", e);
          },
        },
        {
          icon: "icons-home",
          id: "rndString2",
          name: "Выделить все",
          enabled: true,
          click: (e) => {
            console.log("Выделить все", e);
          },
        },
      ],
    },
  ]);  

  menuJS.getValue();

})