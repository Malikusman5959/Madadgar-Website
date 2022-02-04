import React from "react";

function SkillsForm() {
  return (
    <>
      <form action="#">
        <div class="sign-up__individual-section section-step sign-up-individual active">
          <p class="sign-up__section-label">
            Enter your educational background.
          </p>

          {/* skill cards */}
          <div class="skills-container">
            <div class="skill-card">
              <p class="skill">Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>
            <div class="skill-card">
              <p class="skill">Driving Driving Driving </p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>
            <div class="skill-card">
              <p class="skill">Driving Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>
            <div class="skill-card">
              <p class="skill">Driving Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>{" "}
            <div class="skill-card">
              <p class="skill">Driving Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>{" "}
            <div class="skill-card">
              <p class="skill">Driving Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>{" "}
            <div class="skill-card">
              <p class="skill">Driving Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>
            <div class="skill-card">
              <p class="skill">Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>
            <div class="skill-card">
              <p class="skill">Driving</p>
              <button class="close-btn" onclick="">
                x
              </button>
            </div>
          </div>
          <label>
            Skill
            <input type="text" />
          </label>

          <div class="splited-col">
            <button class="save-btn main-btn" onclick="">
              Add
            </button>
            <button
              class="save-btn main-btn"
              onclick=""
              style={{ maxWidth: "35%", marginLeft: "5%" }}
            >
              Submit
            </button>
          </div>

          <p class="auth-copyright">
            Copy Rights Madadgar 2021, All Rights Reserved
          </p>
        </div>
      </form>
    </>
  );
}

export default SkillsForm;
