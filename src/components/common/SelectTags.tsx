import React from "react";

const SelectTag = ({
  value,
  backColor,
  onClick,
  parent,
}: {
  value: string;
  backColor?: string;
  onClick: any;
  parent?: boolean;
}) => {
  return (
    <div
      className="d-flex align-items-center p-1"
      style={{
        backgroundColor: backColor,
        width: "max-content",
        border: "1px solid rgba(99,99,99,0.5)",
        borderRadius: "9px",
        marginRight: "10px",
        cursor: "default"
      }}
    >
      {value}
      <div className="ms-2 me-2" onClick={() => onClick(value, parent)} style={{ cursor: "pointer" }}>
        x
      </div>
    </div>
  );
};

export default SelectTag;
