export const openFormsMenuAction = {
  type: "OPEN_FORMS_MENU",
  payload: {
    formsMenu: true,
  },
};
export const closeFormsMenuAction = {
  type: "CLOSE_FORMS_MENU",
  payload: {
    formsMenu: false,
  },
};

export const openEditFormAction = {
  type: "OPEN_EDIT_FORM",
  payload: {
    editForm: true,
  },
};
export const closeEditFormAction = {
  type: "CLOSE_EDIT_FORM",
  payload: {
    editForm: false,
  },
};

export const openNewDishFormAction = {
  type: "OPEN_NEW_DISH_FORM",
  payload: {
    newDishForm: true,
    formsMenu: false,
  },
};
export const closeNewDishFormAction = {
  type: "CLOSE_NEW_DISH_FORM",
  payload: {
    newDishForm: false,
  },
};

export const openPhotosFormAction = {
  type: "OPEN_PHOTOS_FORM",
  payload: {
    photosForm: true,
    formsMenu: false,
  },
};
export const closePhotosFormAction = {
  type: "CLOSE_PHOTOS_FORM",
  payload: {
    photosForm: false,
  },
};
