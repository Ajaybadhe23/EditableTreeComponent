
import { useDispatch, useSelector } from "react-redux";
import { changeHandler, setSelectedData } from "../_store/action/TreeAction";
import { useContext ,Fragment} from "react";
import { ThemeContext } from "../context";
function Sidebar() {
  const { sideBarTree, selectedData } = useSelector(
    (store: any) => store.TreeReducer
  );

  const { setTheme } = useContext(ThemeContext);

  const dispatch: any = useDispatch();
  const selectMenuHandler = (value: any) => {
    dispatch(setSelectedData(value));
    if (value[1] == 0) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Add Handler change handler
  const AddHandler = () => {
    if (!selectedData) return;
    let tempData = JSON.parse(JSON.stringify(sideBarTree));
    // this is parent main level
    if (selectedData.length === 2) {
      tempData.push({
        Level: `level ${sideBarTree.length + 1}`,
        subLevel: [
          {
            Level: `Level ${sideBarTree.length + 1}.1`,
            subLevel: [{ Level: `Level  ${sideBarTree.length + 1}.1.1` }],
          },
        ],
      });

      // this is add child level
    } else if (selectedData.length === 3) {
      tempData[selectedData[1]]?.subLevel.push({
        Level: `level ${selectedData[1] + 1}.${
          sideBarTree[selectedData[1]]?.subLevel.length + 1
        }`,
        subLevel: [],
      });
    }
    // this is add grand child level
    else {
      tempData[selectedData[1]]?.subLevel[selectedData[2]]?.subLevel.push({
        Level: `level ${selectedData[1] + 1}.${selectedData[2] + 1}.${
          sideBarTree[selectedData[1]]?.subLevel[selectedData[2]]?.subLevel
            .length + 1
        }
        `,
        subLevel: [],
      });
    }

    dispatch(changeHandler(tempData));
  };

  // remove Handler
  const removeHandler = () => {
    if (!selectedData) return;
    let tempData = JSON.parse(JSON.stringify(sideBarTree));
    // this is parent main level
    if (selectedData.length === 2) {
      tempData.splice(selectedData[1], 1);

      // this is add child level
    } else if (selectedData.length === 3) {
      tempData[selectedData[1]]?.subLevel.splice(selectedData[2], 1);
    }
    // this is add grand child level
    else {
      tempData[selectedData[1]]?.subLevel[selectedData[2]]?.subLevel.splice(
        selectedData[2],
        1
      );
    }
    dispatch(setSelectedData([]));
    dispatch(changeHandler(tempData));
  };

  const PreHandler = () => {
    if (selectedData.length === 2) {
      moveHandler(selectedData[1] - 1);
    } else if (selectedData.length === 3) {
      moveHandler(selectedData[2] - 1);
    } else {
      moveHandler(selectedData[3] - 1);
    }
  };
  const NextHandler = () => {
    if (selectedData.length === 2) {
      moveHandler(selectedData[1] + 1);
    } else if (selectedData.length === 3) {
      moveHandler(selectedData[2] + 1);
    } else {
      moveHandler(selectedData[3] + 1);
    }
  };

  // move handler
  const moveHandler = (opration: any) => {
    if (!selectedData) return;
    let temp: any;
    let index: any;
    if (selectedData.length === 2) {
      index = opration;
      temp = sideBarTree[index].Level;
      dispatch(setSelectedData([temp, index]));
    } else if (selectedData.length === 3) {
      index = opration;
      temp = sideBarTree[selectedData[1]]?.subLevel[index].Level;
      console.log(index, temp, "sfasdfs");
      dispatch(setSelectedData([temp, selectedData[1], index]));
    } else {
      index = opration;
      temp =
        sideBarTree[selectedData[1]]?.subLevel[selectedData[2]]?.subLevel[index]
          .Level;
      dispatch(
        setSelectedData([temp, selectedData[1], selectedData[2], index])
      );
    }
  };

  return (
    <div className="sidebar">
      <ul>
        {sideBarTree.map((main: any, mainIndex: number) => (
          <Fragment key={mainIndex}>
            <li
              style={{
                fontWeight: 900,
                background: selectedData[0] === main.Level ? "#fff" : "",
              }}
              onClick={() => {
                selectMenuHandler([main.Level, mainIndex]);
              }}
            >
              {main.Level}
            </li>
            <ul>
              {main?.subLevel.map((subLevel: any, childIndex: number) => (
                <Fragment key={childIndex}>
                  <li
                    style={{
                      fontWeight: 500,
                      paddingLeft: "15px",
                      background:
                        selectedData[0] === subLevel.Level ? "#fff" : "",
                    }}
                    onClick={() => {
                      selectMenuHandler([
                        subLevel.Level,
                        mainIndex,
                        childIndex,
                      ]);
                    }}
                  >
                    {subLevel.Level}
                  </li>
                  <ul>
                    {subLevel?.subLevel.map(
                      (subLevel: any, grandChildIndex: number) => (
                        <li key={grandChildIndex}
                          style={{
                            paddingLeft: "25px",
                            background:
                              selectedData[0] === subLevel.Level ? "#fff" : "",
                          }}
                          onClick={() => {
                            selectMenuHandler([
                              subLevel.Level,
                              mainIndex,
                              childIndex,
                              grandChildIndex,
                            ]);
                          }}
                        >
                          {subLevel.Level}
                        </li>
                      )
                    )}
                  </ul>
                </Fragment>
              ))}
            </ul>
          </Fragment>
        ))}
      </ul>
      <div className="buttonContainer">
        <div className="leftBtn">
          <button onClick={AddHandler}>+</button>
          <button onClick={removeHandler}>-</button>
        </div>
        <div className="rightBtn">
          <button onClick={PreHandler}>&#8592;</button>
          <button onClick={NextHandler}>&#8594; </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
