import React from "react";

const Navigation = ({ closeMenu }) => {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home" onClick={closeMenu}>
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about" onClick={closeMenu}>
          About
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work" onClick={closeMenu}>
          Work
        </a>
      </li>
      <li className="nav-li">
        <a
          className="nav-link"
          href="https://blog.ragibshahrier.com/"
          onClick={closeMenu}
        >
          Blog
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact" onClick={closeMenu}>
          Contact
        </a>
      </li>
    </ul>
  );
};

export default Navigation;
