import React from "react";

const Header = () => {
    return (
        <header className="pb-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            <img src="/logo-estg.svg" alt="ESTG" className="mw-100" />
          </a>
        </header>
    );
};

export default Header;