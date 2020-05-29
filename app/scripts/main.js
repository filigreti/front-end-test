/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function () {
  "use strict";

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if (
    "serviceWorker" in navigator &&
    (window.location.protocol === "https:" || isLocalhost)
  ) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function (registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function () {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case "installed":
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case "redundant":
                  throw new Error(
                    "The installing " + "service worker became redundant."
                  );

                default:
                // Ignore
              }
            };
          }
        };
      })
      .catch(function (e) {
        console.error("Error during service worker registration:", e);
      });
  }
})();

let baconImage = document.getElementById("bacon-image");
let baconImageContainer = document.getElementById("bacon-image-container");
let form = document.getElementById("form");
let firstName = document.getElementById("user-firstname");
let lastName = document.getElementById("user-lastname");
let email = document.getElementById("user-email");
let post = document.getElementById("user-post");
let phone = document.getElementById("user-phone");
let card = document.getElementById("user-card");
let code = document.getElementById("user-code");
let date = document.getElementById("user-date");

document.getElementById("user-card").addEventListener("input", function (e) {
  let foo = this.value.split("-").join("");
  if (foo.length > 0) {
    foo = foo.match(new RegExp(".{1,4}", "g")).join("-");
  }
  this.value = foo;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});

function validate() {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const postValue = post.value.trim();
  const phoneValue = phone.value.trim();
  const cardValue = card.value.trim();
  const codeValue = code.value.trim();
  const dateValue = date.value.trim();

  if (firstNameValue === "" || firstNameValue === null) {
    setError(firstName, "First name must not be empty");
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "" || lastNameValue === null) {
    setError(lastName, "Last name must not be empty");
  } else {
    setSuccess(lastName);
  }

  if (postValue === "" || postValue === null) {
    setError(post, "Postal Code must not be empty");
  } else if (postValue.length <= 2) {
    setError(post, "Enter a valid post");
  } else {
    setSuccess(post);
  }

  if (phoneValue === "" || phoneValue === null) {
    setError(phone, "Phone Number must not be empty");
  } else if (phoneValue.length < 5) {
    setError(phone, "Phone Number can not be less than 5");
  } else {
    setSuccess(phone);
  }

  if (cardValue === "" || cardValue === null) {
    setError(card, "Credit Card  must not be empty");
  } else if (cardValue.length < 12) {
    setError(card, "Credit Card Number can not be less than 12");
  } else {
    setSuccess(card);
  }

  if (codeValue === "" || codeValue === null) {
    setError(code, "Pin must not be empty");
  } else if (codeValue.length < 3) {
    setError(code, "Pin can not be less than 3");
  } else {
    setSuccess(code);
  }

  if (dateValue === "" || dateValue === null) {
    setError(date, "Date must not be empty");
  } else {
    setSuccess(date);
  }

  if (emailValue === "" || emailValue === null) {
    setError(email, "Email cannot be empty");
  } else if (!isEmail(emailValue)) {
    setError(email, "Not a valid email");
  } else {
    setSuccess(email);
  }

  if (
    firstNameValue &&
    lastNameValue &&
    emailValue &&
    phoneValue &&
    postValue &&
    cardValue &&
    codeValue &&
    dateValue
  ) {
    alert("Form Submitted Successfully");
  }
}

function cloneBaconImage() {
  let clone = baconImage.cloneNode(true);
  baconImageContainer.appendChild(clone);
}

function setError(input, message) {
  const inputContainer = input.parentElement;
  const small = inputContainer.querySelector("small");
  inputContainer.className = "input-container error";
  small.innerText = message;
}

function setSuccess(input) {
  console.log(input.id);
  if (input.id == "user-card") {
    const inputContainer = input.parentElement;
    inputContainer.className = "overall";
  } else {
    const inputContainer = input.parentElement;
    inputContainer.className = "input-container";
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
