(() => {
  const container = document.getElementById("container");

  function createCard(name) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerText = name;
    return card;
  }

  function createArrayOfCouple(n) {
    let arr = [];

    for (let i = 1; i <= n; i++) {
      let element1 = createCard(i);
      let element2 = createCard(i);
      arr.push(element1);
      arr.push(element2);
    }

    return arr;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createModalWindow() {
    const form = document.createElement("form");
    const inputElement = document.createElement("input");
    const button = document.createElement("button");
    form.append(inputElement);
    form.append(button);
    button.innerText = "Начать игру!";

    // Устанавливаем атрибуты элемента (например, тип, placeholder и т.д.)
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", "Количество карт");

    return { form, inputElement, button };
  }

  function restartGame(container = document.getElementById("container")) {
    container.innerHTML = "";
    startGame();
  }

  function restartGameEnd(container = document.getElementById("container")) {
    alert("Время вышло, долбоёб!");
    container.innerHTML = "";
    startGame();
  }

  function game(cardsQuantity) {
    container.innerHTML = "";

    ///////////////////////////////////////////////////////////

    const timerText1 = document.createElement("div");
    timerText1.setAttribute("id", "timer-text1");
    container.append(timerText1);

    let timerText = document.getElementById("timer-text1");
    let currentValue = 60;
    let timerId = null;

    clearInterval(timerId);

    timerId = setInterval(() => {
      timerText.textContent = currentValue;
      currentValue -= 1;
      if (currentValue < 0) {
        clearInterval(timerId);
      }
    }, 1000);

    /////////////////////////////////////////////////////////////
    let points = 0;
    let counterOfOpenCards = 0;
    let arrOfOpenCard = [];
    setTimeout(restartGameEnd, 60000);

    let arrayOfNumbers = createArrayOfCouple(cardsQuantity / 2);

    shuffle(arrayOfNumbers);

    arrayOfNumbers.forEach((item) => {
      container.append(item);
      item.addEventListener("click", () => {
        item.classList.toggle("red");
        counterOfOpenCards += 1;
        arrOfOpenCard.push(item);

        if (counterOfOpenCards === 2) {
          let timer = setTimeout(() => {
            if (arrOfOpenCard[0].innerText === arrOfOpenCard[1].innerText) {
              if (
                !(
                  arrOfOpenCard[0].classList.contains("green") &&
                  arrOfOpenCard[1].classList.contains("green")
                )
              ) {
                points += 2;
                arrOfOpenCard.forEach((el) => {
                  el.classList.add("green");
                });
              }

              if (points === cardsQuantity) {
                alert("Вы победили!!!");
                points = 0;
                restartGame(container);
              }
            } else {
              arrOfOpenCard.forEach((el) => {
                el.classList.toggle("red");
              });
            }

            counterOfOpenCards = 0;
            arrOfOpenCard.length = 0;
          }, 300);
        }
      });
    });
  }

  // начало работы приложения
  function startGame() {
    const modalWindow = createModalWindow();
    container.append(modalWindow.form);

    modalWindow.form.addEventListener("submit", function (e) {
      // эта строчка нужна, чтобы предотвратить действие браузера по умолчанию
      // в данном случае мы не хотим, чтобы страница перезагрузилась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь не заполнил форму
      if (!modalWindow.inputElement.value) {
        cardsQuantity = 4;
      }

      cardsQuantity = +modalWindow.inputElement.value;

      if (cardsQuantity % 2 !== 0 || cardsQuantity <= 0) {
        cardsQuantity = 4;
      }

      ///////////////////////////////////////
      game(cardsQuantity);
      //////////////////////////////////////
    });
  }

  window.startGame = startGame;
})();
