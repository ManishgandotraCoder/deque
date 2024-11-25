import React from "react";
import "./styles.css";
import { CardInterface } from "./interface";

const CardComponent: React.FC<CardInterface> = ({ label, count }) => {
  return (
    <div className="card">
      <div className="card-header" data-testid="card-label">
        {label}
      </div>
      <div className="card-count" data-testid="card-count">
        {count}
      </div>
    </div>
  );
};
export default CardComponent;
