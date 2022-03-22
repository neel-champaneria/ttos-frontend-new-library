import { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";

const popperDemo2 = () => {
  const [visible, setVisibility] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
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
    }
  );

  useEffect(() => {
    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  function handleDocumentClick(event) {
    if (referenceRef.current.contains(event.target)) {
      return;
    }
    setVisibility(false);
  }

  function handleButtonClick(event) {
    setVisibility(!visible);
  }

  return (
    <>
      <button ref={referenceRef} onClick={handleButtonClick}>
        Click Me
      </button>
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
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

export default popperDemo2;
