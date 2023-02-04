import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeHandler, discriptionHandler } from "../_store/action/TreeAction";
import Alert from "react-bootstrap/Alert";
import { getPost } from "../_store/apis/user";

function Detail() {
  const { selectedData, sideBarTree, discriptionData } = useSelector(
    (store: any) => store.TreeReducer
  );
  const dispatch: any = useDispatch();
  const [title, setTitle] = useState();
  const [discription, setDiscription] = useState("");
  const [apiStatus, setApiStatus] = useState<any>("");
  let userData = async () => {
    if (selectedData.length === 0) return;
    let payload = selectedData[1] + 1;
    if (payload in discriptionData) {
      setDiscription(discriptionData[payload]);
    } else {
      let discriptionTemp = { ...discriptionData };
      try {
        const { status, body } = await getPost(payload);
        if (status === 200) {
          setDiscription(body.title);
          discriptionTemp[payload] = body.title;
          dispatch(discriptionHandler(discriptionTemp));
          setApiStatus("success");
          setTimeout(() => {
            setApiStatus("");
          }, 1000);
        } else {
          setApiStatus("danger");
          setTimeout(() => {
            setApiStatus("");
          }, 1000);
        }
      } catch (err) {}
    }
  };

  // title change handler
  const titleHandler = (e: any) => {
    setTitle(e);
    let tempData = JSON.parse(JSON.stringify(sideBarTree));
    if (selectedData.length === 2) {
      tempData[selectedData[1]].Level = e;
    } else if (selectedData.length === 3) {
      tempData[selectedData[1]].subLevel[selectedData[2]].Level = e;
    } else {
      tempData[selectedData[1]].subLevel[selectedData[2]].subLevel[
        selectedData[3]
      ].Level = e;
    }
    dispatch(changeHandler(tempData));
  };

  useEffect(() => {
    setTitle(selectedData[0]);
    userData();
  }, [selectedData]);

  return (
    <div className="DeetailContainer">
      {apiStatus !== "" && (
        <Alert variant={apiStatus}>
          {apiStatus === "success" ? "API Called successfully" : "API Failed"}
        </Alert>
      )}

      <div className="titleContainer d-flex gap-5">
        <Link to={"/item/0"}>Title 1</Link>
        <Link to={"/item/1"}>Title 2</Link>
        <Link to={"/item/3"}>Title 3</Link>
        <Link to={"/item/4"}>Title 4</Link>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => {
            titleHandler(e.target.value);
          }}
        />
        <textarea
          placeholder="discription"
          defaultValue={discription}
        ></textarea>
      </div>
    </div>
  );
}

export default Detail;
