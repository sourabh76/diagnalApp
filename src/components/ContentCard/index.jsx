import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/contentCard.css";
import contentImage from "../../utils/contentImage";

const ContentCard = ({contentItems}) => {
    const getContentName = (title) => title.length > 12 ? title.substring(0, 12) + '...' : title;
    const notify = () => {
        toast("Content Clicked!!");
    }
    
    return (
        <div className="content-container">
            {contentItems && contentItems.map((item, index) => (
                <div key={index} className="content-item">
                    <ToastContainer 
                        position="bottom-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <img 
                        src={contentImage(item.posterImage)} 
                        alt={item.name}
                        onClick={notify}
                        loading="lazy"
                        onError={(e) => {
                            // Prevent infinite loop in case the placeholder image also fails to load
                            e.target.onerror = null;
                            // Set the source of the image to the placeholder image
                            e.target.src = contentImage("placeholder_for_missing_posters.png");
                          }}
                    />
                    <p className="content-name">{getContentName(item.name)}</p>
                </div>
            ))}
        </div>
    )
}
export default ContentCard;