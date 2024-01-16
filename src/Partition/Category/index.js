import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import AddCategory from "./AddCategory";

function index() {
    return ( <>
        <Header/>
         <div className="p-7">
            <AddCategory/>
         </div>
        <Footer/>
    </> );
}

export default index;