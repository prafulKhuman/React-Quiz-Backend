/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import Spodomeetar from "./Spodomeetar";
import { GET_USER } from "../../ApolloClient/Authentication/LogonApollo";
import { GET_RESULT_CONDITION } from "../../ApolloClient/ResultApollo/ResultApollo";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

function ScoreCard() {
    const [data, setData] = useState([]);
    const [quiz, setQuiz] = useState([]);

    const response = useQuery(GET_USER);
    const quiz_response = useQuery(GET_RESULT_CONDITION ,{
        variables:{ id : "" , userId : "" }
    });

    useEffect(()=>{
        setData(response?.data?.User)
    },[response?.data?.User])

    useEffect(()=>{
        setQuiz(quiz_response?.data?.Result)
    },[quiz_response?.data?.Result])

    const passedQuiz = quiz?.filter((result)=> result.status === "PASS").length ;

    return (<>
        <section className="featured-section">
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-lg-4 col-12 mb-4 mb-lg-0">
                        <div className="custom-block bg-white shadow-lg">

                            <div className="d-flex">
                                <div>
                                    <h5 className="mb-2">Last Quiz Score</h5>
                                    <div>
                                        <Spodomeetar users={data?.length}/>
                                    </div>
                                    <div className="mt-3">
                                        <p>Total Users :: <span> { data?.length }</span></p>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>

                    <div className="col-lg-6 col-12">
                        <div className="custom-block custom-block-overlay">
                            <div className="d-flex flex-column h-100">
                                <img src="/public/assest/images/businesswoman-using-tablet-analysis.jpg" className="custom-block-image img-fluid" alt="" />


                                <div className="custom-block-overlay-text d-flex">
                                    <div className="w-100 ">
                                        <h5 className="text-white mb-2">Quiz Summary</h5>
                                        <div className="d-lg-flex flex-wrap container card-height-m pt-3">
                                            <div className="d-flex flex-wrap justify-content-around mt-3  w-100 ">
                                                <div class="card w-80 bg-transparent mt-4 border-0">
                                                    <div class="card-body">
                                                        <h5 class="card-title text-center ">{quiz?.length}</h5>
                                                        <p class="card-text text-center font-color-contain" >Complated Quiz</p>

                                                    </div>
                                                </div>
                                                <div class="card w-80 bg-transparent mt-4 border-0">
                                                    <div class="card-body">
                                                        <h5 class="card-title text-center">{passedQuiz}</h5>
                                                        <p class="card-text text-center font-color-contain">Passed Quiz</p>

                                                    </div>
                                                </div>
                                            </div>

                                            

                                        </div>



                                    </div>

                                    <span className="badge bg-finance rounded-pill ms-auto"><i class="bi bi-activity"></i></span>
                                </div>

                                <div className="social-share d-flex">
                                    <p className="text-white me-4">Share:</p>

                                    <ul className="social-icon">
                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link  bi bi-instagram"></a>
                                        </li>

                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link bi-facebook"></a>
                                        </li>

                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link bi bi-whatsapp"></a>
                                        </li>
                                    </ul>

                                    <a href="#" className="custom-icon bi-bookmark ms-auto"></a>
                                </div>

                                <div className="section-overlay"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>);
}

export default ScoreCard;