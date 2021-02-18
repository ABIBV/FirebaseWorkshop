var provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

// detect device
const detectDevice = () => {
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //     return true;
  // } else {
  //     return false;
  // }
  
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

$("#googleSignBtn").click(function(e) {
  e.preventDefault();
  console.log(detectDevice());
  if (detectDevice()) {
      auth.signInWithRedirect(provider);

  } else {
      auth.signInWithPopup(provider).then((result) => {
          var currentUser = result.additionalUserInfo;
          currentUser.uid = result.user.uid;
          localStorage.setItem("result",JSON.stringify(result));
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }).catch((error) => {
          console.log(error.message);
      });
  }
});

auth.onAuthStateChanged((user) => {
  if (user) {
    if (location.pathname === "/index.html" || location.pathname === '/') {
      location.replace('../feedback.html');
    }
  } else {
    localStorage.removeItem('currentUser');
    if (location.pathname !== "/index.html") {
      location.replace('../index.html');
    }
  }
});

$('#signOutBtn').click(function (e) { 
  e.preventDefault();
  auth.signOut();
});