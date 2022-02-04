import React from 'react'

function EducationForm() {
    return (
        <>
            <form action="#">
                <div class="sign-up__individual-section section-step sign-up-individual active">
                    <p class="sign-up__section-label">
                        Enter your educational background.
                                    </p>

                    {/* education cards */}

                    <div class="edu-card">
                        <p class='institute'> National University of Science and Technology </p>
                        <p class='degree'> Masters in Computer Science</p>
                        <p class='year '> 2016 - 2018 </p>

                        <button class="close-btn" onclick='' >
                            x
                                        </button>
                    </div>
                    <div class="edu-card" >
                        <div>
                            <p class='institute'> Comsats University Islamabad </p>
                            <p class='degree'> Bachelor of Computer Science</p>
                            <p class='year'> 2012 - 2016</p>
                        </div>

                        <button class="close-btn" onclick='' >
                            x
                        </button>

                    </div>
                    <div class='splited-col' style={{ marginTop: '5px' }}>
                        <label>
                            Institute
                                    <input type="text" />
                        </label>
                        <label>
                            Degree
                                    <input type="text" />
                        </label>
                    </div>
                    <div class='splited-col'>
                        <label>
                            From
                                <input type="Number" value='2021' style={{ maxWidth: '40%' }} />
                        </label>
                        <label>
                            Till
                                <input type="Number" style={{ maxWidth: '40%' }} />
                        </label>
                    </div>
                    <div class='splited-col'>
                        <button class="save-btn main-btn" onclick=''>
                            Add
                                    </button>
                        <button class="save-btn main-btn" onclick='' style={{ maxWidth: '35%', marginLeft: '5%' }}>
                            Next
                                    </button>
                    </div>

                    <p class="auth-copyright">
                        Copy Rights Madadgar 2021, All Rights Reserved
                            </p>
                </div>
            </form>
        </>
    )
}

export default EducationForm
