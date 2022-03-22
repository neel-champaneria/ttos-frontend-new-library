import {
  forwardRef,
  cloneElement,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { usePopper } from "react-popper";
import { useDispatch, useSelector } from "react-redux";
import { sortModifierGroupItems, sortModifiers } from "./../utils/utils";
import ModifierGroupListComp from "./ModifierGroupListComp";
import { createOrderingItemAction } from "./../actions/OrderingItemAction";
import { addToCartAction } from "./../actions/OrderingCartAction";

const AddToCartPopper = forwardRef(
  (
    {
      id,
      priceFromModId,
      priceFromModifier,
      priceFromModifierGroupItem,
      itemPrice,
      children,
    },
    ref
  ) => {
    const [childNode, setChildNode] = useState(null);
    const [food, setFood] = useState(null);
    const [
      validate_modifierWithMinQty_isRequired,
      setValidate_modifierWithMinQty_isRequired,
    ] = useState(false);
    const [
      modifierGroupObjectWithMinQty_isRequired,
      setModifierGroupObjectWithMinQty_isRequired,
    ] = useState([]);

    const [visible, setVisible] = useState(false);
    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { styles, attributes } = usePopper(
      referenceRef.current,
      popperRef.current
    );

    const dispatch = useDispatch();
    const orderingItem = useSelector((state) => state.orderingItemReducer);

    useImperativeHandle(
      ref,
      () => ({
        onAddToCartDialogClickOpen,
      }),
      []
    );

    useEffect(() => {
      // listen for clicks and close dropdown on body
      document.addEventListener("mousedown", handleDocumentClick);
      return () => {
        document.removeEventListener("mousedown", handleDocumentClick);
      };
    }, []);

    useEffect(() => {
      if (visible) {
        console.log("AddToCartPopper: priceFromModId: ", priceFromModId);
        console.log(
          "AddToCartPopper: priceFromModifierGroupItem: ",
          priceFromModifierGroupItem
        );
        console.log("AddToCartPopper: priceFromModifier: ", priceFromModifier);
      }
    });

    /* useEffect(() => {
      if (visible) {
        childNode?.style.zIndex = 30;
      } else {
        childNode?.style.zIndex = 0;
      }
    }, [visible]); */

    function handleDocumentClick(event) {
      if (referenceRef.current.contains(event.target)) {
        return;
      }
      if (popperRef.current.contains(event.target)) {
        return;
      }
      setVisible(false);
    }

    function handleButtonClick(event) {
      setVisible(!visible);
    }

    const onAddToCartDialogClickOpen = (food, category, idx, e) => {
      const tempOrderingItem = {
        name: food.name,
        image: food.image,
        itemId: food.id,
        priceSum: food.price,
        price: food.price,
        tax1Id: food.tax1Id,
        tax2Id: food.tax2Id,
        tax3Id: food.tax3Id,
        qty: 1,
        sequence: 1,
        catName: category.name,
        modifiers: [],
      };
      console.log("clicked");
      console.log(food);
      setFood(food);
      dispatch(createOrderingItemAction(tempOrderingItem));
    };

    const onAddToCart = (e) => {
      dispatch(addToCartAction(orderingItem));
      dispatch(createOrderingItemAction({}));
      handleButtonClick(e);
    };

    const onIncreaseQuantity = () => {
      console.log("onIncreaseQuantity");
      dispatch(increaseQuantityAction());
    };

    const onDecreaseQuantity = () => {
      console.log("onDecreaseQuantity");
      dispatch(decreaseQuantityAction());
    };

    const onCheckModifierWithMinQty_isRequired = (
      isRequired,
      modifierGroupObjectWithMinQty_isRequired
    ) => {
      console.log("onCheckModifierWithMinQty_isRequired: ");
      console.log(
        "onCheckModifierWithMinQty_isRequired: isRequired",
        isRequired
      );
      console.log(
        "onCheckModifierWithMinQty_isRequired: modifierGroupObjectWithMinQty_isRequired",
        modifierGroupObjectWithMinQty_isRequired
      );
      setValidate_modifierWithMinQty_isRequired(isRequired);
      setModifierGroupObjectWithMinQty_isRequired(
        modifierGroupObjectWithMinQty_isRequired
      );
      const modifierGroupNameArr = modifierGroupObjectWithMinQty_isRequired.map(
        (modGroup) => modGroup.name
      );
      /* setShowErrorSnack({ ...showErrorSnack, messages: modifierGroupNameArr });
      if (modifierGroupNameArr.length === 0)
        setShowErrorSnack({ ...showErrorSnack, status: false }); */
    };

    const requiredModifierFocus = (modGroups) => {
      const modGroupEls =
        modGroups?.map((modGroup) =>
          document.getElementById(`modGroup_${modGroup.id}`)
        ) || [];
      modGroupEls?.map((el) => {
        popoverRootRef?.current?.scrollTo({
          top: el.offsetTop + 100,
          behavior: "smooth",
        });
      });
    };

    return (
      <>
        <div ref={referenceRef} onClick={handleButtonClick}>
          {cloneElement(children, {
            ...children.props,
            ref: setChildNode,
            style: {
              border: visible ? "1px solid red" : "",
              zIndex: visible ? 2 : "0",
            },
          })}
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            position: "fixed",
            top: 0,
            left: 0,
            visibility: visible ? "visible" : "hidden",
            zIndex: 1,
          }}
        ></div>
        <div
          ref={popperRef}
          style={{ ...styles.popper, zIndex: 3 }}
          {...attributes.popper}
        >
          <div
            style={{
              display: visible ? "block" : "none",
              zIndex: 3,
              backgroundColor: "#c8c8c8",
              width: 610,
              overflow: "auto",
            }}
          >
            <div>
              <button
                onClick={() => {
                  handleButtonClick();
                }}
              >
                X
              </button>
            </div>
            <ModifierGroupListComp
              food={food}
              isAddtoCartDialogOpen={visible}
              priceFromModId={priceFromModId}
              priceFromModifierGroupItem={priceFromModifierGroupItem}
              priceFromModifier={priceFromModifier}
              modifierGroupItems={food?.modifierGroupItems}
              requiredModifierFocus={requiredModifierFocus}
              validate_modifierWithMinQty_isRequired={
                validate_modifierWithMinQty_isRequired
              }
              handleCheckModifierWithMinQty_isRequired={
                onCheckModifierWithMinQty_isRequired
              }
            />
          </div>
        </div>
      </>
    );
  }
);

export default AddToCartPopper;
