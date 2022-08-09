function showInputError(formElement, inputElement, validationMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(errorClass);
  };
  
  function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  function isValid(formElement, inputElement, inputErrorClass, errorClass) {
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    }
  };
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  function toggleButtonState(inputList, buttonElement, inactiveButtonClass, opacityLargeClass) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.classList.remove(opacityLargeClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.classList.add(opacityLargeClass);
      buttonElement.disabled = false;
    }
  }; 
  
  function setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass, opacityLargeClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach(function(inputElement){
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass, opacityLargeClass);
      });
    });
  };
  
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass, config.errorClass, config.inactiveButtonClass, config.opacityLargeClass);
    });
  };
  enableValidation(config);