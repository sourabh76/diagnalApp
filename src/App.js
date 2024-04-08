import { useState, useEffect, useCallback } from "react";
import transformData from "./utils/transformData";
import { BASE_API } from "./constants";
import ContentCard from "./components/ContentCard";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import contentImage from "./utils/contentImage";
import { setPage } from "./redux/Actions/pageActions";
import { toast } from "react-toastify";
import SearchResults from "./components/SearchResults";

function App() {
  const [details, setDetails] = useState({});
  const [contentData, setContentData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const page = useSelector(state => state.page);

  const handleScroll = useCallback(() => {
  setIsScrolled(!!(window.scrollY));

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Check if the user reached at the bottom of screen
  // If yes, dispatch next page
  if (scrollY + windowHeight >= documentHeight - 2 && page < 3) {
    dispatch(setPage(Math.min(page + 1, 3)));
  }
}, [dispatch, page]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleImageClick = useCallback(() => {
    if (!isSearchEnabled) {
      setIsSearchEnabled(true);
    }
  }, [isSearchEnabled]);

  const handleBackClick = useCallback(() => {
    if (isSearchEnabled) {
      setIsSearchEnabled(false);
      setInputValue("");
    } else {
      toast("Back Button Clicked!!");
    }
  }, [isSearchEnabled]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_API}/data/page${page}.json`);
        const data = await response.json();

        if(response.status === 200) {
          setDetails(transformData(data));
          setContentData(prev => [...prev, ...transformData(data).contentItems])
        } else {
          throw new Error("Failed to fetch the data");
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }

    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="app">
      {isScrolled && 
        <img
          className="nav-bar-img"
          src={contentImage("nav_bar.png")}
          alt="nav-bar"
          loading="lazy"
        />
      }
      <div className={`nav-bar ${isSearchEnabled ? "full" : ""}`}>
        <div className="nav-bar-back">
          <img
            src={contentImage("Back.png")}
            alt="back-button"
            onClick={handleBackClick}
          />
        </div>
        <p className="title">{details.title}</p>
        <div className="nav-bar-search">
          {isSearchEnabled ?
            <input
              id="input-box"
              className="input-box"
              placeholder="Search for content..."
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            /> : 
            <img
              src={contentImage("search.png")}
              alt="search-button"
              onClick={handleImageClick}
            />
        }
        </div>
      </div>

      <ContentCard contentItems={SearchResults(contentData, inputValue)} />
    </div>
  );
}

export default App;