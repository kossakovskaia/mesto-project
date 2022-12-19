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

const cardsSection = document.querySelector(".page__cards");

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
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      popup.classList.add("popup_opened");
    });
  }
}

function setClosePopupHandler(closeBtn, popup) {
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("popup_opened");
    }
  });
}

elements.forEach((item) => {
  setOpenPopupHandler(item.openBtn, item.popup);
  setClosePopupHandler(item.closeBtn, item.popup);
});

function addCard(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  openCard(cardImage, cardData);
  toggleReaction(cardElement);
  deleteCardHandler(cardElement);

  cardsSection.append(cardElement);
}

initialCards.forEach(addCard);

function openCard(cardImage, cardData) {
  const popup = document.querySelector(".image-popup");
  const popupImage = popup.querySelector(".image-popup__photo");
  const popupTitle = popup.querySelector(".image-popup__caption");

  cardImage.addEventListener("click", () => {
    popup.classList.add("popup_opened");
    popupImage.src = cardData.link;
    popupTitle.textContent = cardData.name;
  });
}

function toggleReaction(cardElement) {
  const cardReaction = cardElement.querySelector(".card__reaction-btn");
  cardReaction.addEventListener("click", () => {
    cardReaction.classList.toggle("card__reaction-btn_active");
  });
}

function deleteCardHandler(cardElement) {
  const deleteCard = cardElement.querySelector(".card__trash-btn");
  deleteCard.addEventListener("click", () => {
    cardElement.remove();
  });
}

function setCreateCardEventListener() {
  const addPhotoPopup = document.querySelector(".popup__add-photo");
  const form = addPhotoPopup.querySelector(".form");
  const createCardBtn = addPhotoPopup.querySelector(".form__save-btn");

  createCardBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const cardTitle = form.elements["photo-title"].value;
    const imageSrc = form.elements["photo-url"].value;

    addCard({ link: imageSrc, name: cardTitle });

    addPhotoPopup.classList.remove("popup_opened");

    cardTitle.value = "";
    imageSrc.value = "";
  });
}

setCreateCardEventListener();

function setEditUserHandler() {
  const editUserPopup = document.querySelector(".popup__edit-form");
  const form = editUserPopup.querySelector(".form");
  const saveUserDataBtn = editUserPopup.querySelector(".form__save-btn");

  saveUserDataBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const userName = form.elements["user-name"].value;
    const userInfo = form.elements["about-user"].value;

    updateUserData(userName, userInfo);

    editUserPopup.classList.remove("popup_opened");

    userName.value = "";
    userInfo.value = "";
  });
}

setEditUserHandler();

function updateUserData(name, info) {
  const userName = document.querySelector(".profile__user-name");
  const userInfo = document.querySelector(".profile__about-user");

  userName.textContent = name;
  userInfo.textContent = info;
}
