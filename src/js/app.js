import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "position-right", // social media bar position (position-left or position-right)
        //for social media links, only update usernames
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  let nameLastName = getNameLastName();
  let cityCountry = getCityCountry();
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${nameLastName}</h1>
          <h2>${variables.role}</h2>
          <h3>${cityCountry}</h3>
          <ul class="${variables.socialMediaPosition}">
            <li><a href="${variables.twitter}" target="_blank"><i class="fab fa-twitter"></i></a></li>
            <li><a href="${variables.github}"target="_blank"><i class="fab fa-github"></i></a></li>
            <li><a href="${variables.linkedin}"target="_blank"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="${variables.instagram}"target="_blank"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

function getNameLastName() {
  return window.variables.name + " " + window.variables.lastName;
}

function getCityCountry() {
  return window.variables.city + ", " + window.variables.country;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background:
      "https://images.unsplash.com/photo-1549317336-206569e8475c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // this is the url for the profile avatar
    avatarURL: "https://imgur.com/KrLm4Pq.jpg",
    // social media bar position (position-left or position-right)
    socialMediaPosition: "position-right",
    // social media usernames
    twitter: "https://x.com/WolveshireS",
    github: "https://github.com/Sergidev",
    linkedin:
      "https://www.linkedin.com/in/sergi-villalobos-gasc%C3%B3n-791278192",
    instagram: "https://www.instagram.com",
    name: "Sergi",
    lastName: "Villalobos",
    role: "Code Destroyer",
    country: "Spain",
    city: "Barcelona"
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
