// TODO: add code here
window.addEventListener("load", function () {
  const container = this.document.getElementById("container");
  const countContainer = this.document.getElementById("count");
  this.fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function (
    response
  ) {
    // sort JSON in descending order based on hoursInSpace
    response.json().then(function (json) {
      json.sort(function(a,b) {
        return parseFloat(b.hoursInSpace) - parseFloat(a.hoursInSpace);
      });
      console.log(json);

      let count = 0;
      
      for (let astronaut of json) {
        count += 1;

        let skills = ""
        for (let skill of astronaut.skills) {
          skills += `${skill}, `
        };
        skills = skills.substring(0, (skills.length - 2));

        let activeTag = "";
        if (astronaut.active === true) {
          activeTag = `<li class="activeAstronaut">Active: ${astronaut.active}</li>`
        } else {
          activeTag = `<li class="inactiveAstronaut">Active: ${astronaut.active}</li>`
        };

        container.innerHTML += `
        <div class="astronaut">
          <div class="bio">
            <h3>${astronaut.firstName} ${astronaut.lastName}</h3>
            <ul>
              <li>Hours in space: ${astronaut.hoursInSpace}</li>
              ${activeTag}
              <li>Skills: ${skills}</li>
            </ul>
          </div>
          <img class="avatar" src="${astronaut.picture}">
        </div>`;
      };
      countContainer.innerHTML = `<button>Astronaut Count: ${count}</button>`;
    });
  });
});
