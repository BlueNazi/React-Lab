import { AiOutlineStar as StartIconEmpty } from "react-icons/ai";
import { AiFillStar as StartIconFull } from "react-icons/ai";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Rate() {
  const [star, setStar] = useState([
    { id: 1, hover: false, clicked: false },
    { id: 2, hover: false, clicked: false },
    { id: 3, hover: false, clicked: false },
    { id: 4, hover: false, clicked: false },
    { id: 5, hover: false, clicked: false },
  ]);

  const hoverHandler = (id) => {
    let hoverData = star.map((item) => {
      return item.id <= id
        ? { ...item, hover: true }
        : { ...item, hover: false };
    });
    setStar(hoverData);
  };

  const blurHandler = () => {
    const blurData = star.map((item) => {
      return { ...item, hover: false };
    });
    setStar(blurData);
  };

  const stepBackward = (rate) => {
    const updatedStars = star.map((item) => {
      if (item.id <= rate) {
        return { ...item, clicked: true, hover: false };
      }
      return { ...item, clicked: false, hover: false };
    });
    setStar(updatedStars);
  };

  const submitRateHandler = (id) => {
    const updatedStars = star.map((item) => {
      return item.id <= id ? { ...item, clicked: true } : { ...item, clicked: false };
    });
    setStar(updatedStars);

    fetch(`http://127.0.0.1:8000/posts/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Rating submitted successfully!", { position: "top-left" });
        } else {
          toast.error("Failed to submit rating.", { position: "top-left" });
          stepBackward(id); // برگرداندن وضعیت ستاره‌ها در صورت خطا
        }
      })
      .catch(() => {
        toast.error("Failed to submit rating.", { position: "top-left" });
        stepBackward(id); // برگرداندن وضعیت ستاره‌ها در صورت خطا
      });
  };

  return (
    <>
      <div className="rate-box">
        <h1>Rate : </h1>
        <div className="rate-container">
          {star.map((item) => (
            <div
              className="rate"
              key={item.id}
              onMouseEnter={() => hoverHandler(item.id)}
              onMouseLeave={blurHandler}
              onClick={() => submitRateHandler(item.id)}
            >
              {item.clicked || item.hover ? (
                <StartIconFull />
              ) : (
                <StartIconEmpty />
              )}
            </div>
          ))}
        </div>
      </div>
      <hr />
      <ToastContainer />
    </>
  );
}

export default Rate;
