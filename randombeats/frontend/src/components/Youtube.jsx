import { useEffect, useState } from "react";
import axios from "axios";
import { res } from "../utility/items";

function Youtube() {
  const [arr, setArr] = useState();
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState();
  const [voted, setVoted] = useState(false);
  useEffect(() => {
    const response = async () =>
      await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=type%20beat&type=video&key=${process.env.REACT_APP_KEY}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
    response()
      .then((res) => {
        setArr(res.data.items);
      })
      .catch((err) => {
        // Use preloaded videoIds when api is over
        console.log(err);
        setArr(res.items);
      });
    //setArr(res.items);
  }, []);
  useEffect(() => {
    const add = async () => {
      if (arr === undefined) return;
      await axios
        .post("/add", null, {
          params: {
            videoId: arr[count].id.videoId,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getLikes = async () => {
      if (arr === undefined) return;
      await axios
        .get("/getvideo", {
          params: {
            videoId: arr[count].id.videoId,
          },
        })
        .then((response) => {
          console.log(response.data);
          setLikes({
            likes: response.data.likes,
            dislikes: response.data.dislikes,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    add();
    getLikes();
    setLoaded(true);
  }, [arr, count]);

  const handleNext = () => {
    if (count === 24) setCount(0);
    else setCount(count + 1);
    setVoted(false);
  };
  const handleBack = () => {
    if (count === 0) setCount(24);
    else setCount(count - 1);
    setVoted(false);
  };
  const handleLike = async () => {
    await axios
      .post("/like", null, {
        params: {
          videoId: arr[count].id.videoId,
        },
      })
      .then((response) => {
        console.log(response);
        setLikes({
          likes: likes.likes + 1,
          dislikes: likes.dislikes,
        });
        setVoted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDislike = async () => {
    await axios
      .post("/dislike", null, {
        params: {
          videoId: arr[count].id.videoId,
        },
      })
      .then((response) => {
        console.log(response);
        setLikes({
          likes: likes.likes,
          dislikes: likes.dislikes + 1,
        });
        setVoted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-center">
      <div className="flex">
        {loaded && arr && likes ? (
          <div>
            <div>
              <iframe
                title="Video"
                width="420"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/${arr[count].id.videoId}?autoplay=1`}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-evenly">
                <div>Likes: {likes.likes}</div>
                <div>Dislikes: {likes.dislikes}</div>
              </div>
              <div>
                {voted ? (
                  <div className="text-center p-2">Voted!</div>
                ) : (
                  <div className="flex justify-evenly">
                    <button
                      onClick={handleLike}
                      className="border-2 p-2 rounded hover:bg-pink-200 hover:text-black"
                    >
                      Like
                    </button>
                    <button
                      onClick={handleDislike}
                      className="border-2 p-2 rounded hover:bg-pink-200 hover:text-black"
                    >
                      Dislike
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>Loading...</div>
            <div>Or API quota reached</div>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={handleNext}
          className="border-2 m-4 rounded p-2 hover:bg-pink-200 hover:text-black"
        >
          Skip
        </button>
        <button
          onClick={handleBack}
          className="border-2 m-4 rounded p-2 hover:bg-pink-200 hover:text-black"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Youtube;
