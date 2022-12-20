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

  const previewPopup = document.querySelector(".image-popup");
  const popupImage = previewPopup.querySelector(".image-popup__photo");
  const popupTitle = previewPopup.querySelector(".image-popup__caption");

  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardsSection = document.querySelector(".page__cards");

  const addPhotoPopup = document.querySelector(".popup__add-photo");
  const cardForm = addPhotoPopup.querySelector(".form");

  const photoUrlInput = cardForm.elements["photo-url"];
  const photoTitleInput = cardForm.elements["photo-title"];

  const editUserPopup = document.querySelector(".popup__edit-form");
  const editUserForm = editUserPopup.querySelector(".form");

  const userName = document.querySelector(".profile__user-name");
  const userInfo = document.querySelector(".profile__about-user");

  const userNameInput = editUserForm.elements["user-name"];
  const userInfoInput = editUserForm.elements["about-user"];

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

  function openPopup(popup) {
    popup.classList.add("popup_opened");
  }

  function closePopup(popup) {
    popup.classList.remove("popup_opened");
  }

  function setOpenPopupHandler(openBtn, popup) {
    if (!openBtn || !popup) {
      return;
    }

    openBtn.addEventListener("click", () => openPopup(popup));
  }

  function setClosePopupHandler(closeBtn, popup) {
    if (!closeBtn || !popup) {
      return;
    }

    closeBtn.addEventListener("click", () => closePopup(popup));

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopup(popup);
      }
    });
  }

  function setOpenCardHandler(cardImage, cardData) {
    cardImage.addEventListener("click", () => {
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupTitle.textContent = cardData.name;

      openPopup(previewPopup);
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
    deleteCard.addEventListener("click", () => cardElement.remove());
  }

  function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector(".card__title").textContent = cardData.name;

    setOpenCardHandler(cardImage, cardData);
    setToggleReactionHandler(cardElement);
    setDeleteCardHandler(cardElement);

    return cardElement;
  }

  function renderCard(cardElement) {
    cardsSection.prepend(cardElement);
  }

  function setSaveCardHandler() {
    cardForm.addEventListener("submit", (event) => {
      event.preventDefault();
      closePopup(addPhotoPopup);

      const createdCard = createCard({
        link: photoUrlInput.value,
        name: photoTitleInput.value,
      });

      renderCard(createdCard);

      cardForm.reset();
    });
  }

  function setEditUserHandler() {
    userNameInput.value = userName.textContent;
    userInfoInput.value = userInfo.textContent;

    editUserForm.addEventListener("submit", (event) => {
      event.preventDefault();
      closePopup(editUserPopup);

      userName.textContent = userNameInput.value;
      userInfo.textContent = userInfoInput.value;

      editUserForm.reset();
    });
  }

  elements.forEach((item) => {
    setOpenPopupHandler(item.openBtn, item.popup);
    setClosePopupHandler(item.closeBtn, item.popup);
  });

  initialCards.map(createCard).forEach(renderCard);

  setSaveCardHandler();

  setEditUserHandler();
}

window.addEventListener("load", onLoad);
