(()=>{
  const listenOnElemDomChanged = (elem, callback) => {
    const observer = new MutationObserver(callback);
    observer.observe(elem, { attributes: false, childList: true, subtree: true });
  };

  const checkChanges = () => {
    const questionWordElem = document.querySelector('.repetition__test__title-wrapper');
    const aswersElem = document.querySelector('.variants.repetition__test__answers');
    const continueBtnElem = document.querySelector('.repetitions__examples-continued-button');
    const recordBtnElem = document.querySelector('.repetition_desc__speak-icon-wrapper-start');

    if (questionWordElem && !questionWordElem.withFix) {
      const showButton = document.createElement('button');
      showButton.setAttribute('class', 'pe-wtf-show-answers-btn');
      showButton.innerHTML = 'Показать';
      showButton.addEventListener('click',() => {
        aswersElem.style.visibility = 'visible';
        showButton.style.visibility = 'hidden'
      });
      questionWordElem.appendChild(showButton);
      questionWordElem.withFix = true;
    }

    if (continueBtnElem && !continueBtnElem.withFix) {
      continueBtnElem.withFix = true;
      continueBtnElem.addEventListener('click', () => {
        aswersElem.style.visibility = 'hidden';
      });

      if (!document.querySelector('#repetition-input')) {
        const cancelButton = document.createElement('button');
        cancelButton.setAttribute('class', 'pe-wtf-cancel-answers-btn');
        cancelButton.innerHTML = 'Отменить';
        const width = continueBtnElem.getBoundingClientRect().width;
        cancelButton.style.width = `${width}px`;
        cancelButton.addEventListener('click',() => {
          recordBtnElem.click();
          recordBtnElem.click();
        });
        continueBtnElem.parentNode.prepend(cancelButton);
      }
    }
  }

  const mainElem = document.querySelector('.repetition-of-words');
  listenOnElemDomChanged(mainElem, () => {
    checkChanges();
  });

  checkChanges();
})()