import MenuJS from "./../init.js";

document.addEventListener('DOMContentLoaded', function() {

  const menuJS = new MenuJS(document.getElementById("menuJS_content"));

  menuJS.setValue([
    {
      icon: "icons-pointer",
      id: "rndString1",
      enabled: true,
      state: {
        enabled: {
          icon: "icons-pointer",
          name: "Включено",
        },
        disabled: {
          icon: "icons-pointer",
          name: "Выключено",
        },
      },
      click: (value, element, id, e) => {
        console.log(value, element, id, e);
      },
    },
    {
      icon: "icons-pointer",
      id: "rndString1",
      enabled: true,
      state: {
        enabled: {
          icon: "icons-pointer",
          name: "Включено",
        },
        disabled: {
          icon: "icons-pointer",
          name: "Выключено",
        },
      },
      list: [
        {
          icon: "icons-pointer",
          id: "rndString1",
          enabled: true,
          state: {
            enabled: {
              icon: "icons-pointer",
              name: "Включено",
            },
            disabled: {
              icon: "icons-pointer",
              name: "Выключено",
            },
          },
          click: (value, element, id, e) => {
            console.log(value, element, id, e);
          },
        },
        {
          icon: "icons-pointer",
          id: "rndString1",
          enabled: true,
          state: {
            enabled: {
              icon: "icons-pointer",
              name: "Включено",
            },
            disabled: {
              icon: "icons-pointer",
              name: "Выключено",
            },
          },
          click: (value, element, id, e) => {
            console.log(value, element, id, e);
          },
        },
      ],
    },
  ]);  

  menuJS.getValue();

})