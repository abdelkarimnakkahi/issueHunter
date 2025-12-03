// alert("Hi");
const userForm = document.querySelector("#user-form");
const userName = document.querySelector("#user-name");
const languages = document.querySelector(".languages");
const searchTerm = document.querySelector("#search-term");
const repos = document.querySelector(".repos");
const themeToggle = document.querySelector(".theme-toggle");
const darkIcon = "<i class='fa-solid fa-moon'></i>";
const lightIcon = "<i class='fa-solid fa-sun'></i>";

themeToggle.innerHTML = darkIcon;

userForm.addEventListener("submit", submitHandler);
languages.addEventListener("click", languageHandler);

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
  console.log(reposData);
  if (!Array.isArray(reposData)) {
    searchTerm.textContent = "User not found!";
    repos.innerHTML = "";
    return;
  }

  if (reposData.length === 0) {
    searchTerm.textContent = "No repo found!";
    repos.innerHTML = "";
    return;
  }

  searchTerm.innerHTML = repoTerm + " repo";
  repos.innerHTML = "";

  reposData.forEach((reposItem) => {
    const icon =
      reposItem.open_issues_count > 0
        ? "<i class='fa-solid fa-xmark'></i>"
        : "<i class='fa-solid fa-check'></i>";

    repos.innerHTML += ` <a href="./repo.html?repo=${reposItem.owner.login}/${reposItem.name}" class="repo-item">
            <span>${reposItem.owner.login}/${reposItem.name}</span>
            <div>${icon}</div>
          </a>`;
  });
}

function languageHandler(e) {
  let language = e.target.getAttribute("data-language");
  console.log(language);
  if (language) {
    repos.innerHTML = "";
    getLanguageRepos(language);
  }
}

function getLanguageRepos(languageItem) {
  const apiURL = "https://api.github.com/search/repositories?q=" + languageItem;
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => displayUserRepos(data.items, languageItem))
    .catch((err) => console.log(err));
}

/**
 * Dark mode
 */

// Get the button element
const toggle = document.querySelector(".theme-toggle");

// Add a click listener to the button
toggle.addEventListener("click", () => {
  // Check the current theme attribute value
  let theme = document.documentElement.getAttribute("data-theme");

  // Toggle the value between 'light' and 'dark'
  if (theme === "light") {
    theme = "dark";
    themeToggle.innerHTML = lightIcon;
  } else {
    theme = "light";
    themeToggle.innerHTML = darkIcon;
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
