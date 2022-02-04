import React, { useState } from "react";

function Test() {
  let [skill, setSkill] = useState([]);
  let [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    setSkill([...skill, newSkill]);
    console.log(skill);
  };
  const addNewSkill = (data) => {
    setNewSkill(data);
  };

  const deleteSkill = (removeItem) => {
    let updatedSkill = skill.filter((item) =>
      item !== removeItem ? item : null
    );
    setSkill(updatedSkill);
  };
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
            {skill.map((item, index) => (
              <div key={index} class="skill-card">
                <p class="skill">{item}</p>
                <button
                  onClick={() => deleteSkill(item)}
                  class="close-btn"
                  onclick=""
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <label>
            Skill
            <input onChange={(e) => addNewSkill(e.target.value)} type="text" />
          </label>

          <div class="splited-col">
            <button
              onClick={() => addSkill()}
              class="save-btn main-btn"
              onclick=""
            >
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

export default Test;
