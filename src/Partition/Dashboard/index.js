import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import Home from "./Home"
function index() {
    return (
        <>
            <Header />
            <Home />
            <div className="f-home">
                <Footer />
            </div>

        </>
    );
}

export default index;