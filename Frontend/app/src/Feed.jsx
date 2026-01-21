import axios from "axios";
import { useEffect } from "react";
import CardFeed from "./CardFeed"
import{useSelector,useDispatch} from "react-redux"
import { addFeed } from "./utils/feedSlice";

function Feed() {

  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed)

  const feedUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res.data))
   
    } catch (err) {
      console.error("Feed fetch failed:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    feedUser();
  }, []);

if(!feed){
  return;
}
  if(feed.length<=0){
    return <h1 className="text-base text-white flex justify-center mt-5">No Feed Available Right Now !!!</h1>
  }

  return (
    (feed &&
    <div>
      <CardFeed user={feed[0]} />
    </div>)
  );
}

export default Feed;
