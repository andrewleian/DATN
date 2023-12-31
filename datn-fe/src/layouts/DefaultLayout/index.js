import Header1 from "../components/Header1/Header1";
import Header from "../components/Header/Header";
import Header3 from "../components/Header3/Header3"
import Footer from "../components/Footer/Footer";

function DefaultLayout({ children }) {
    return (
        <div>
            <div className="header">
                <Header1 />
                <Header />
                <Header3 />
            </div>

            <div className="content">
                {children}
            </div>

            <div className="footer">
                <Footer />
            </div>

        </div>
    )
}

export default DefaultLayout