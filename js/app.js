// alert("Hi");
let userForm = document.querySelector("#user-form");
let userName = document.querySelector("#user-name");
let languages = document.querySelector(".languages");
let searchTerm = document.querySelector("#search-term");
let repos = document.querySelector(".repos");

userForm.addEventListener("submit", submitHandler);

function submitHandler(e) {
  e.preventDefault();

  let user = userName.value.trim();

  if (user) {
    getUserRepos(user);
  } else {
    alert("Enter username");
  }
}

function getUserRepos(reposUser) {
  const apiURL = "https://api.github.com/users/" + reposUser + "/repos";
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => displayUserRepos(data, reposUser))
    .catch((err) => console.log(err));
}

function displayUserRepos(reposData, repoTerm) {
  searchTerm.innerHTML = repoTerm + " repo";
  repos.innerHTML = "";

  reposData.forEach((reposItem) => {
    const icon =
      reposItem.open_issues_count > 0
        ? "<i class='fa-solid fa-xmark'></i>"
        : "<i class='fa-solid fa-check'></i>";

    repos.innerHTML += ` <a href="#" class="repo-item">
            <span>${reposItem.owner.login}/${reposItem.name}</span>
            <div>${icon}</div>
          </a>`;
  });
}

// Get the button element
const toggle = document.querySelector(".theme-toggle");

// Add a click listener to the button
toggle.addEventListener("click", () => {
  // Check the current theme attribute value
  let theme = document.documentElement.getAttribute("data-theme");

  // Toggle the value between 'light' and 'dark'
  if (theme === "light") {
    theme = "dark";
  } else {
    theme = "light";
  }

  // Update the HTML attribute
  document.documentElement.setAttribute("data-theme", theme);

  // Optional: Save the user's preference in their browser
  localStorage.setItem("theme", theme);
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
