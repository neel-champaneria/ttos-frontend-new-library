import { usePopper } from "react-popper";
import { useState } from "react";

const popperDemo = () => {
  const [visible, setVisibility] = useState(false);

  const [referenceRef, setReferenceRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  function handleDropdownClick(event) {
    setVisibility(!visible);
    console.log(visible);
  }

  return (
    <>
      <button ref={setReferenceRef} onClick={handleDropdownClick}>
        Click Me
      </button>
      <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
        <h1
          style={{
            display: visible ? "block" : "none",
            zIndex: 1,
            backgroundColor: "black",
            color: "white",
          }}
        >
          Hello
        </h1>
      </div>
    </>
  );
};

export default popperDemo;
