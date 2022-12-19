function onLoad() {
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  const popups = [
    {
      openBtnSelector: ".profile__edit-btn",
      closeBtnSelector: ".popup__close-btn",
      popupSelector: ".popup__edit-form",
    },
    {
      openBtnSelector: ".profile__add-btn",
      closeBtnSelector: ".popup__close-btn",
      popupSelector: ".popup__add-photo",
    },
    {
      closeBtnSelector: ".popup__close-btn",
      popupSelector: ".image-popup",
    },
  ];

  const elements = popups.map((selectors) => {
    const popup = document.querySelector(selectors.popupSelector);
    const openBtn = document.querySelector(selectors.openBtnSelector);
    const closeBtn = popup.querySelector(selectors.closeBtnSelector);

    return {
      openBtn,
      closeBtn,
      popup,
    };
  });

  function setOpenPopupHandler(openBtn, popup) {
    if (!openBtn || !popup) {
      return;
    }

    openBtn.addEventListener("click", () => {
      popup.classList.add("popup_opened");
    });
  }

  function setClosePopupHandler(closeBtn, popup) {
    if (!closeBtn || !popup) {
      return;
    }

    closeBtn.addEventListener("click", () => {
      popup.classList.remove("popup_opened");
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("popup_opened");
      }
    });
  }

  function setOpenCardHandler(cardImage, cardData) {
    const popup = document.querySelector(".image-popup");
    const popupImage = popup.querySelector(".image-popup__photo");
    const popupTitle = popup.querySelector(".image-popup__caption");

    cardImage.addEventListener("click", () => {
      popupImage.src = cardData.link;
      popupTitle.textContent = cardData.name;

      popup.classList.add("popup_opened");
    });
  }

  function setToggleReactionHandler(cardElement) {
    const cardReaction = cardElement.querySelector(".card__reaction-btn");
    cardReaction.addEventListener("click", () => {
      cardReaction.classList.toggle("card__reaction-btn_active");
    });
  }

  function setDeleteCardHandler(cardElement) {
    const deleteCard = cardElement.querySelector(".card__trash-btn");
    deleteCard.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  function renderCard(cardData) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardsSection = document.querySelector(".page__cards");

    cardImage.src = cardData.link;
    cardElement.querySelector(".card__title").textContent = cardData.name;

    setOpenCardHandler(cardImage, cardData);
    setToggleReactionHandler(cardElement);
    setDeleteCardHandler(cardElement);

    cardsSection.append(cardElement);
  }

  function setCreateCardHandler() {
    const addPhotoPopup = document.querySelector(".popup__add-photo");
    const form = addPhotoPopup.querySelector(".form");
    const createCardBtn = addPhotoPopup.querySelector(".form__save-btn");

    const photoUrlInput = form.elements["photo-url"];
    const photoTitleInput = form.elements["photo-title"];

    createCardBtn.addEventListener("click", (event) => {
      event.preventDefault();
      addPhotoPopup.classList.remove("popup_opened");

      renderCard({
        link: photoUrlInput.value,
        name: photoTitleInput.value,
      });

      photoUrlInput.value = "";
      photoTitleInput.value = "";
    });
  }

  function setEditUserHandler() {
    const editUserPopup = document.querySelector(".popup__edit-form");
    const form = editUserPopup.querySelector(".form");
    const saveUserDataBtn = editUserPopup.querySelector(".form__save-btn");

    const userName = document.querySelector(".profile__user-name");
    const userInfo = document.querySelector(".profile__about-user");

    const userNameInput = form.elements["user-name"];
    const userInfoInput = form.elements["about-user"];

    userNameInput.value = userName.textContent;
    userInfoInput.value = userInfo.textContent;

    saveUserDataBtn.addEventListener("click", (event) => {
      event.preventDefault();
      editUserPopup.classList.remove("popup_opened");

      userName.textContent = userNameInput.value;
      userInfo.textContent = userInfoInput.value;
    });
  }

  elements.forEach((item) => {
    setOpenPopupHandler(item.openBtn, item.popup);
    setClosePopupHandler(item.closeBtn, item.popup);
  });

  initialCards.forEach(renderCard);

  setCreateCardHandler();

  setEditUserHandler();
}

window.addEventListener("load", onLoad);
