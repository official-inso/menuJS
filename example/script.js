import MenuJS from "./../init.js";

document.addEventListener('DOMContentLoaded', function() {

  const menuJS = new MenuJS(document.getElementById("menuJS_content"));

  menuJS.setValue([
    {
      icon: "icons-pointer",
      id: "idElement0",
      helper: {
        img: "https://i.pinimg.com/originals/26/6b/e8/266be8ffd47b293b5aa0f3d35c19775d.gif",
        title: "Выделение",
        desc: "Данная функция позволяет выделить элементы в программе",
        buttons: [
          {
            text: "Название кнопки",
            click: () => {
              console.log("Вы нажали на кнопку подсказки");
            },
          },
        ],
      },
      name: "Пункт меню 0",
      click: (element, e) => {
        console.log("Пункт меню 0", e);
      },
    },
    {
      items: [
        {
          icon: "icons-load",
          id: "idElement1",
          name: "Пункт меню 1",
          click: (element, e) => {
            console.log("Пункт меню 1", e);
          },
        },
        {
          icon: "icons-home",
          id: "idElement2",
          name: "Пункт меню 2",
          click: (element, e) => {
            console.log("Пункт меню 2", e);
          },
        },
      ],
    },
    'hr',
    {
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
      items: [
        {
          icon: "icons-download",
          id: "idElement3",
          name: "Пункт меню 1",
          click: (element, e) => {
            console.log("Пункт меню 3", e);
          },
        },
        {
          icon: "icons-upload",
          id: "idElement4",
          name: "Пункт меню 2",
          click: (element, e) => {
            console.log("Пункт меню 4", e);
          },
        },
        {
          icon: "icons-del",
          id: "idElement5",
          name: "Пункт меню 5",
          click: (element, e) => {
            console.log("Пункт меню 5", e);
          },
        },
      ],
    },
  ]);  

  menuJS.getValue();

  document.getElementById('btn1').addEventListener('click', function(){
    let arrBtns = ['idElement0', 'idElement1', 'idElement2', 'idElement3', 'idElement4', 'idElement5'];
    let rand = Math.floor(Math.random() * arrBtns.length);

    menuJS.updateValue(arrBtns[rand]);
  })

  // document.getElementById('btn2').addEventListener('click', function () {
  //   let side = menuJS.getSide();
  //   if (side == 'left') {
  //     menuJS.updateSide('right');
  //   } else {
  //     menuJS.updateSide('left');
  //   }
  // })

})