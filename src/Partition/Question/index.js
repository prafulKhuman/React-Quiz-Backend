import Header from "../../Component/Header";
// import Table from "./Table";
import Footer from "../../Component/Footer";
import QuestionModal from "./QuestionModal";
function index() {
    return (<>

        <Header />
        <div className="p-7">
            {/* <Table /> */}
            <QuestionModal/>
        </div>
        <Footer />


    </>);
}

export default index;