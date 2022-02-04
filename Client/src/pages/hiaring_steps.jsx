/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import _1 from "./../img/logo.png";
import _2 from "./../img/sign-in.png";
import _3 from "./../img/map-step-2.svg";
import _4 from "./../img/service-step-4.svg";
import _5 from "./../img/notebook-step-5.svg";
import _6 from "./../img/mastercard.svg";
import _7 from "./../img/calendar.svg";
import _8 from "./../img/payment-process.svg";
import Nav from "./../pages/nav"
const hiaring_steps = (props) => {
  return (
    <div className="auth pay payment">
      <header >
        <Nav></Nav>
      </header>

      <main className="payment-main auth-main sign-up-main">
        <div className="container">
          <div className="row">
            <div className="col-1 mr-5">
              <div className="progress-line">
                <div className="progress-line__block circle-1 blue active">
                  <div className="progress-line__block-number">1</div>
                  <div className="progress-line__block-bottom"></div>
                </div>
                <div className="progress-line__block circle-2 ">
                  <div className="progress-line__block-number">2</div>
                  <div className="progress-line__block-bottom"></div>
                </div>
                <div className="progress-line__block circle-3">
                  <div className="progress-line__block-number">3</div>
                  <div className="progress-line__block-bottom"></div>
                </div>
                <div className="progress-line__block circle-4">
                  <div className="progress-line__block-number">4</div>
                </div>
              </div>
            </div>

            <div className="col-10 pl-5 flex-row w-100 pr-0 pr-md-5 d-flex">
              <div className="sign-up__start-section w-100 sign-up__individual-section step-1 active">
                <p className="sign-up__section-label">
                  Please fill out those fields to complete your Subscribe
                  Process
                </p>
                <span className="sign-up__section-span pt-5 mt-5">Step 1</span>
                <span className="sign-up__section-select">
                  Choose Your Location
                </span>
                <div className="custom-theme-select">
                  <select>
                    <option value="Eg" selected name="search-default">
                      Egypt
                    </option>
                    <option> value='Ex'Egypt</option>
                    <option value="us">USA</option>
                  </select>
                </div>
                <span
                  className=""
                  style={{
                    fontSize: "4rem",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  Address
                </span>
                <div className="">
                  <input
                    type="text"
                    className="input-text"
                    style={{
                      width: "40%",
                      fontFamily: "Roboto, sans-serif",
                      height: "40px",
                      fontSize: "3rem",
                    }}
                  />
                </div>
                <div className="d-flex save-btn__container">
                  <button className="save-btn main-btn mr-4 previous-btn">
                    Previous
                  </button>
                  <button className="save-btn main-btn choose-account-btn">
                    Nexts
                  </button>
                </div>
                <div
                  className="d-flex flex-column justify-content-center w-50 right-step-img__container align-items-end"
                  id="first-img"
                >
                  <img src={_3} className="right-step-img" alt="" />
                </div>
              </div>
              {/* step 2 */}

              <div className="sign-up__start-section void flex-row w-100 d-flex sign-up__individual-section step-2">
                <div className="d-flex flex-column w-100 pt-4">
                  <span className="sign-up__section-span pt-5 mt-5">
                    Step 2
                  </span>
                  <span className="sign-up__section-select">
                    Choose Kin55d of Service
                  </span>
                  <div className="custom-theme-select">
                    <select>
                      <option selected name="search-default">
                        Full MEP
                      </option>
                      <option>Full MEP</option>
                      <option>MEP</option>
                    </select>
                  </div>
                  <div className="d-flex save-btn__container">
                    <button className="save-btn main-btn mr-4 previous-btn">
                      Previous
                    </button>
                    <button className="save-btn main-btn choose-account-btn">
                      Next
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center w-50 right-step-img__container align-items-end">
                  <img src={_4} className="right-step-img" alt="" />
                </div>
              </div>

              {/* step 3 */}

              <div className="sign-up__start-section void flex-row w-100 d-flex sign-up__individual-section step-3">
                <div className="d-flex flex-column w-100 pt-4">
                  <span className="sign-up__section-span pt-5 mt-5">
                    Step 3
                  </span>
                  <span className="sign-up__section-select">
                    Choose the Requirement
                  </span>
                  <div className="custom-theme-select">
                    <select>
                      <option selected name="search-default">
                        New System Design
                      </option>
                      <option>New System Design</option>
                      <option>Old System Design</option>
                    </select>
                  </div>
                  <div className="d-flex save-btn__container">
                    <button className="save-btn main-btn mr-4 previous-btn">
                      Previous
                    </button>
                    <button className="save-btn main-btn choose-account-btn">
                      Next
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center w-50 right-step-img__container align-items-end">
                  <img src={_5} className="right-step-img" alt="" />
                </div>
              </div>

              {/* step 4 */}

              <div className="sign-up__start-section void flex-row w-100 d-flex sign-up__individual-section step-4">
                <div className="d-flex flex-column w-100 pt-4">
                  <span className="sign-up__section-span pt-5 mt-5">
                    Step 4
                  </span>
                  <span className="sign-up__section-select">
                    Payment process
                  </span>
                  <label>
                    Card Holder Name
                    <input type="text" placeholder="AHMED MAHMOUD" />
                  </label>
                  <label className="card-number__label mt-4">
                    Card Number
                    <input
                      type="text"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="card-number-input"
                    />
                    src={_6}
                  </label>
                  <div className="d-flex security-data__container mt-4">
                    <label className="exp-date__label">
                      Expiration Date
                      <input
                        type="text"
                        placeholder="08/24"
                        className="card-number-date"
                      />
                      src={_7}
                    </label>
                    <label>
                      CVV Code
                      <input
                        type="password"
                        className="password-input cvv-code"
                        placeholder="XXX"
                      />
                    </label>
                  </div>
                  <div className="d-flex save-btn__container">
                    <button className="save-btn main-btn mr-4 previous-btn">
                      Previous
                    </button>
                    <button
                      disabled
                      className="save-btn main-btn choose-account-btn"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center w-50 right-step-img__container align-items-end">
                  <img src={_8} className="right-step-img" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default hiaring_steps;
