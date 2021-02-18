const dayField = document.querySelector('#day');
const feedBackField = document.querySelector('#feedback');
const submitBtn = document.querySelector('#submitBtn');

const updateProfile = () => {
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  $('#profileImage').attr("src", userData.profile.picture);
  $('#profileImage').attr("alt", userData.profile.name);
};

const validateField = (value) => {
  return !(value === "" || value === null || value === undefined);
};

submitBtn.addEventListener('click', () => {
  const feedBackData = {
    day: dayField.value,
    feedback: feedBackField.value
  };
  if (validateField(day) && validateField(feedBack)) {
    console.log( day, feedBack);
  } else {
    console.error('Fill all the fields');
  }
});

$(document).ready(function () {
  updateProfile();
});