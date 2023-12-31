// import './src/assets/font/fontawesome-free-6.4.0-web/css/all.css'
import './GlobalStyle.css'

function GlobalStyle({ children }) {
    return (
        <div className="container">
            {children}
        </div>
    )
}

export default GlobalStyle