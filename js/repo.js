const repos = document.querySelector(".repos");

function getRepoName() {
  const querySTR = document.location.search;
  const repoName = querySTR.split("=")[1];

  //   console.log(repoName);
  if (repoName) {
    getIssues(repoName);
  }
}

function getIssues(repoName) {
  const apiURL = "https://api.github.com/repos/" + repoName + "/issues";

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => displayIssues(data))
    .catch((err) => console.log(err));
}

function displayIssues(issues) {
  if (issues.length == 0) {
    repos.innerHTML = "No issues!";
    return;
  }

  issues.forEach((issue) => {
    repos.innerHTML += `
        <a href="${issue.html_url}" class="repo-item">
            <span>${issue.title}</span>
        </a>
        `;
  });
}

getRepoName();
