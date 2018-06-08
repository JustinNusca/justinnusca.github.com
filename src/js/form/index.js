export const formClassName = '.contact';
const feedbackMsgClassName = '.contact__feedback';

const feedbackMsgs = {
  fail: '😩 Sorry, that didn’t work. Try again?',
  loading: null,
  success: '😃 Message Sent! I’ll get back to you soon!',
};

const formStateClassNames = {
  fail: 'fail',
  loading: 'loading',
  success: 'success',
};

const readyStates = {
  loadingRange: [0, 3],
  successRange: [200, 299],
};

function resetForm(form = {}) {
  const feedbackMsgEl = form.querySelector(feedbackMsgClassName);
  const classNamesToRemove = Object
    .keys(formStateClassNames)
    .map(key => formStateClassNames[key]);

  form.classList.remove(...classNamesToRemove);
  feedbackMsgEl.innerHTML = null;
}

function isInRange(state = 0, range = []) {
  return state >= range[0] && state <= range[1];
}

function showFormFeedback(form = {}, message = '', className = '') {
  const feedbackMsgEl = form.querySelector(feedbackMsgClassName);
  const classNamesToRemove = Object
    .keys(formStateClassNames)
    .map(key => formStateClassNames[key])
    .filter(formStateClassName => formStateClassName !== className);

  if (className === formStateClassNames.loading) {
    feedbackMsgEl.removeAttribute('role');
  } else {
    feedbackMsgEl.setAttribute('role', 'alert');
  }

  form.classList.remove(...classNamesToRemove);
  form.classList.add(className);
  feedbackMsgEl.innerHTML = message;
}

function handleStateChange(form = {}, request = {}) {
  if (isInRange(request.readyState, readyStates.loadingRange)) {
    showFormFeedback(form, feedbackMsgs.loading, formStateClassNames.loading);
  } else if (isInRange(request.status, readyStates.successRange)) {
    showFormFeedback(form, feedbackMsgs.success, formStateClassNames.success);
    setTimeout(() => resetForm(form), 3000);
  } else {
    showFormFeedback(form, feedbackMsgs.fail, formStateClassNames.fail);
  }
}

function onFormSubmit(event = {}) {
  event.preventDefault();
  event.stopPropagation();

  const form = event.currentTarget;
  resetForm(form);

  if (form.checkValidity()) {
    const request = new XMLHttpRequest();
    const formData = new FormData(event.target);

    request.onreadystatechange = () => {
      handleStateChange(form, request);
    };

    request.open('POST', 'https://formspree.io/njustin@gmail.com', true);
    request.setRequestHeader('accept', 'application/json');
    request.send(formData);
  } else {
    showFormFeedback(form, feedbackMsgs.fail, formStateClassNames.fail);
  }

  return false;
}

export default onFormSubmit;
