import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuService } from "./../services/MenuService";
import { fetchMenuAction } from "./../actions/MenuAction";
import Category from "./category";

const DemoMenuFetch = () => {
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState([]);

  useEffect(async () => {
    dispatch(fetchMenuAction());
    const res = await fetchMenuService();
    console.log(res);
  }, []);

  const menu = useSelector((state) => state.menuReducer) || [];

  console.log("menu from DemoMenuFetch: ", menu);
  return (
    <>
      {menu.map((category) => {
        return (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <Category category={category} />
          </div>
        );
      })}
    </>
  );
};

export default DemoMenuFetch;
