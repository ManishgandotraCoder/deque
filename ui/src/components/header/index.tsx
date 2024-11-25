import React from "react";
import "./styles.css";

const HeaderComponent: React.FC = () => {
  return (
    <header
      className="header-component"
      data-testid="HeaderComponent"
      role="banner"
    >
      <p className="header-title">📚 Deque - Booklist</p>
    </header>
  );
};

export default HeaderComponent;
