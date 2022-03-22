import { useRef, createRef } from "react";
import { sortModifierGroupItems, sortModifiers } from "./../utils/utils";
import AddToCartPopper from "./AddToCartPopper";

const Category = ({ category }) => {
  const arrLength = category.items.length;
  const popperCompRefs = useRef([]);

  if (popperCompRefs.current.length !== arrLength) {
    popperCompRefs.current = Array(arrLength)
      .fill()
      .map((_, i) => popperCompRefs.current[i] || createRef());
  }

  const onAddToCart = (food, category, idx, e) => {
    popperCompRefs.current[idx].current.onAddToCartDialogClickOpen(
      food,
      category
    );
  };

  return (
    <>
      <ul>
        {category.items.map((food, idx) => {
          let itemPrice = food.price;
          let priceFromModId = 0;
          let priceFromModifier = null;
          let priceFromModifierGroupItem = null;
          if (parseFloat(itemPrice, 10) == 0) {
            console.log("food name: ", food.name, " parseFloat condition");
            let modifiersGroupItems = food?.modifierGroupItems || [];
            if (modifiersGroupItems.length > 0) {
              console.log(
                "food name: ",
                food.name,
                " modifierGroupItems condition"
              );

              sortModifierGroupItems(modifiersGroupItems, "asc", "sequence");
              let modifiersGroupItem = modifiersGroupItems[0];
              let temp = sortModifiers(
                modifiersGroupItem.modifierGroup.modifiers,
                "asc",
                "price"
              );
              for (let i = 0; i < temp.length; i++) {
                if (
                  temp[i].enable &&
                  !(temp[i]?.disableItemList || "").includes(food.id + ",") &&
                  temp[i].price > 0
                ) {
                  itemPrice = temp[i].price;
                  priceFromModId = temp[i].id;
                  priceFromModifier = temp[i];
                  priceFromModifierGroupItem = modifiersGroupItem;
                  console.log(
                    "food: ",
                    food.name,
                    " itemPrice: ",
                    itemPrice,
                    " priceFromModId: ",
                    priceFromModId,
                    " priceFromModifier: ",
                    priceFromModifier,
                    " priceFromModifierGroupItem: ",
                    priceFromModifierGroupItem
                  );
                  break;
                }
              }
            }
          }
          return (
            <>
              <AddToCartPopper
                key={food.id}
                id={food.id}
                priceFromModId={priceFromModId}
                priceFromModifier={priceFromModifier}
                priceFromModifierGroupItem={priceFromModifierGroupItem}
                itemPrice={itemPrice}
                ref={popperCompRefs.current[idx]}
              >
                <div>
                  <li
                    key={food.id}
                    onClick={(e) => onAddToCart(food, category, idx, e)}
                  >
                    {/* <table>
                    <tbody>
                      <tr>
                        <td style={{ width: "400px" }}> */}
                    {food.name}
                    {/* </td>
                        <td style={{ width: "200px" }}> */}
                    {itemPrice}
                    {/* </td>
                      </tr>
                    </tbody>
                  </table> */}
                  </li>
                </div>
              </AddToCartPopper>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default Category;
