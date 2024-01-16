import QuizForm from "./QuizForm";
import "./../../app.css"
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
function index() {
    return ( <>
    <Header/>
    <div className="p-7">
        <QuizForm/>
    </div>
    <Footer/>
        
    </> );
}

export default index;