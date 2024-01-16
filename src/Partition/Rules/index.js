import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import Rules from "./Rules";
function index() {
    return (<>
        <Header />
        <div className="p-7">
            <Rules />
        </div>
        <Footer />
    </>);
}

export default index;