const Firestore = firebase.firestore();

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
    feedback: feedBackField.value,
    time: new Date().toLocaleString()
  };
  if (validateField(feedBackData.day) && validateField(feedBackData.feedback)) {
    submitFeedback({ [dayField.value] : feedBackData});
  } else {
    console.error('Fill all the fields');
  }
});

const submitFeedback = (feedbackData) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const uid = user.uid;
  Firestore.collection("feedbacks").doc(uid).set(feedbackData, {merge: true})
    .then(() => {
      feedBackField.value = "";
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const readFeedback = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const uid = user.uid;
  let feedbackString;
  Firestore.collection("feedbacks").doc(uid).onSnapshot((doc) => {
    feedbackString = '';
    if (doc.data()) {
      Object.keys(doc.data()).forEach(data => {
        feedbackString += `<li>
        <div class="feedback-container p-3 rounded shadow-sm bg-secondary text-white">
          <div class="d-flex align-items-end">
            <div><h4 class="mb-0 mr-2">${doc.data()[data].day}</h4></div>
            <div><small>${doc.data()[data].time}</small></div>
          </div>
          <p class="mb-0">${doc.data()[data].feedback}</p>
        </div>
      </li>`;
      });
      $('.feedBackList ul').html(feedbackString);
      $('.feedBackList').removeClass('d-none');
    } else{
      $('.feedBackList').addClass('d-none');
    }
  })
}

$(document).ready(function () {
  updateProfile();
  readFeedback();
});