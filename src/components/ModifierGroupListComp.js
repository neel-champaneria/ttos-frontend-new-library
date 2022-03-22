import { useEffect, useState } from "react";
import { sortModifierGroupItems, sortModifiers } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setModifierAction } from "../actions/OrderingItemAction";
import { Money } from "./../utils/money";

const ModifierGroupListComp = ({
  food,
  isAddtoCartDialogOpen,
  priceFromModId,
  priceFromModifierGroupItem,
  priceFromModifier,
  modifierGroupItems,
  requiredModifierFocus,
  validate_modifierWithMinQty_isRequired,
  handleCheckModifierWithMinQty_isRequired,
}) => {
  const [modifierIds, setModifierIds] = useState([]);
  const [currentModSeq, setCurrentModSeq] = useState(0);
  const [modifiers, setModifiers] = useState([]);
  const [
    modifierGroupIdWithMinQty_isRequired,
    setModifierGroupIdWithMinQty_isRequired,
  ] = useState([]);
  const [
    modifierGroupObjectWithMinQty_isRequired,
    setModifierGroupObjectWithMinQty_isRequired,
  ] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("first useEffect");
    let isRequired = false;
    console.log(
      "first useEffect: modifierGroupIdWithMinQty_isRequired: ",
      modifierGroupIdWithMinQty_isRequired
    );
    if (modifierGroupIdWithMinQty_isRequired.length > 0) {
      isRequired = true;
      console.log(
        "first useEffect: modifierGroupIdWithMinQty_isRequired condition:"
      );
      if (currentModSeq > 0) {
        console.log(
          "first useEffect: modifierGroupIdWithMinQty_isRequired condition: currentModSeq condition"
        );
        requiredModifierFocus(modifierGroupObjectWithMinQty_isRequired);
      }
    }
    handleCheckModifierWithMinQty_isRequired(
      isRequired,
      modifierGroupObjectWithMinQty_isRequired
    );
  }, [modifierGroupIdWithMinQty_isRequired]);

  useEffect(() => {
    console.log("second useEffect");
    setCurrentModSeq(0);
    if (isAddtoCartDialogOpen) {
      console.log("second useEffect: isAddtoCartDialogOpen condition:");
      if (priceFromModId != 0) {
        console.log(
          "second useEffect: isAddtoCartDialogOpen condition: priceFromModId condition"
        );
        onIncreaseModifierQuantity(
          null,
          priceFromModifier,
          priceFromModifierGroupItem.minQty,
          priceFromModifierGroupItem.maxQty,
          priceFromModifierGroupItem.modifierGroup
        );
      }
    }
  }, [isAddtoCartDialogOpen]);

  useEffect(() => {
    if (isAddtoCartDialogOpen) {
      console.log("ModifierGroupListComp_1: priceFromModId: ", priceFromModId);
      console.log(
        "ModifierGroupListComp_1: priceFromModifierGroupItem: ",
        priceFromModifierGroupItem
      );
      console.log(
        "ModifierGroupListComp_1: priceFromModifier: ",
        priceFromModifier
      );
    }
  }, [isAddtoCartDialogOpen]);

  const onIncreaseModifierQuantity = (
    event,
    modifier,
    minQty,
    maxQty,
    modGroup
  ) => {
    if (event) {
      event.stopPropagation();
    }

    setCurrentModSeq(currentModSeq + 1);
    const tempModifier = {
      ...modifier,
      seq: currentModSeq,
    };

    const tempModifierIds = [...modifierIds];
    const tempModifiers = [...modifiers];

    tempModifierIds.push(tempModifier.id);
    tempModifiers.push(tempModifier);

    // calc total selected modifier quantity of a mod group
    const totalModifierQty = modGroup.modifiers
      .map((itm) => {
        return tempModifierIds.filter((id) => id === itm.id).length;
      })
      .reduce((a, b) => a + b);

    // prevent add more modifiers if maxQty > 0 && exceed maximum allow
    if (maxQty > 0 && totalModifierQty > maxQty) return;

    setModifierIds(tempModifierIds);
    setModifiers(tempModifiers);
    dispatch(setModifierAction(tempModifiers));
  };

  const onDecreaseModifierQuantity = (
    event,
    modifier,
    minQty,
    maxQty,
    modGroup
  ) => {
    event.stopPropagation();
    const tempModifierIds = [...modifierIds];
    const tempModifiers = [...modifiers];
    const index = tempModifierIds.indexOf(modifier.id);
    if (index > -1) {
      tempModifierIds.splice(index, 1);
      tempModifiers.splice(index, 1);
    }
    setModifierIds(tempModifierIds);
    setModifiers(tempModifiers);

    dispatch(setModifierAction(tempModifiers));
  };

  const checkModifierGroupWithMinQty_isRequired = (
    minQty,
    modGroup,
    modifierIds
  ) => {
    console.log("checkModifierGroupWithMinQty_isRequired: ");
    console.log("checkModifierGroupWithMinQty_isRequired: minQty: ", minQty);
    console.log(
      "checkModifierGroupWithMinQty_isRequired: modGroup: ",
      modGroup
    );
    console.log(
      "checkModifierGroupWithMinQty_isRequired: modifierIds: ",
      modifierIds
    );
    const tempModifierGroupIdWithMinQty_isRequired = [
      ...modifierGroupIdWithMinQty_isRequired,
    ];
    const tempModifierGroupObjectWithMinQty_isRequired = [
      ...modifierGroupObjectWithMinQty_isRequired,
    ];
    const currentModGroupIdWithMinQtyIndex =
      tempModifierGroupIdWithMinQty_isRequired.indexOf(modGroup.id);

    if (minQty > 0) {
      // const foundSomeSelectedModifierWithMinQty = modGroup.modifiers.some(mod => modifierIds.includes(mod.id));
      const foundAllSelectedModifierWithMinQty = modifierIds
        .map((selectedModId) => {
          let tempId;
          modGroup.modifiers.map((mod) => {
            if (selectedModId === mod.id) {
              tempId = selectedModId;
            }
          });
          return tempId;
        })
        .filter(Boolean);

      if (foundAllSelectedModifierWithMinQty.length >= minQty) {
        if (currentModGroupIdWithMinQtyIndex > -1) {
          tempModifierGroupIdWithMinQty_isRequired.splice(
            currentModGroupIdWithMinQtyIndex,
            1
          );
          tempModifierGroupObjectWithMinQty_isRequired.splice(
            currentModGroupIdWithMinQtyIndex,
            1
          );
          setModifierGroupIdWithMinQty_isRequired(
            tempModifierGroupIdWithMinQty_isRequired
          );
          setModifierGroupObjectWithMinQty_isRequired(
            tempModifierGroupObjectWithMinQty_isRequired
          );
        }
      } else {
        if (currentModGroupIdWithMinQtyIndex === -1) {
          tempModifierGroupIdWithMinQty_isRequired.push(modGroup.id);
          tempModifierGroupObjectWithMinQty_isRequired.push(modGroup);
          setModifierGroupIdWithMinQty_isRequired(
            tempModifierGroupIdWithMinQty_isRequired
          );
          setModifierGroupObjectWithMinQty_isRequired(
            tempModifierGroupObjectWithMinQty_isRequired
          );
        }
      }
    }
  };

  const countSelectedModifierId = (modifierId) => {
    let count;
    const filterArr = modifierIds.filter((itm) => itm === modifierId);
    count = filterArr.length;
    return count;
  };

  return (
    <>
      {sortModifierGroupItems(food?.modifierGroupItems, "asc", "sequence")?.map(
        (modifierGroupItem) => {
          const {
            minQty,
            maxQty = 0,
            modifierGroup: modGroup,
          } = modifierGroupItem;
          let modifierConditionText = "";
          let isModGroupEnable = false;

          for (let i = 0; i < modGroup.modifiers.length; i++) {
            const disableItemList =
              modGroup.modifiers[i]?.disableItemList || "";
            if (!disableItemList.includes(food.id + ",")) {
              isModGroupEnable = true;
              break;
            }
          }

          if (minQty > 0) {
            if (maxQty > 0) {
              modifierConditionText = `(At least ${minQty} and allow max ${maxQty})`;
            } else {
              modifierConditionText = `(At least ${minQty})`;
            }
          }

          if (isModGroupEnable) {
            checkModifierGroupWithMinQty_isRequired(
              minQty,
              modGroup,
              modifierIds
            );

            return (
              <div>
                <div key={modGroup.id}>{modGroup.name}</div>
                <hr />
                <ul>
                  {sortModifiers(modGroup.modifiers, "asc", "price").map(
                    (modifier) => {
                      const disableItemList = modifier?.disableItemList || "";
                      if (disableItemList.includes(food.id + ",")) return;
                      return (
                        <li key={modifier.id}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div>
                              <div>{modifier.name}</div>
                              <div>{modifier.price}</div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <button
                                onClick={() => {
                                  console.log("- clicked");
                                }}
                              >
                                -
                              </button>
                              <p>{countSelectedModifierId(modifier.id)}</p>
                              <button>+</button>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            );
          }
        }
      )}
    </>
  );
};

export default ModifierGroupListComp;
