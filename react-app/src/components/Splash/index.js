import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import polygon_1 from "../../images/Polygon_1.png";
import polygon_2 from "../../images/Polygon_2.png";
import polygon_3 from "../../images/Polygon_3.png";
import polygon_4 from "../../images/Polygon_4.png";
import polygon_5 from "../../images/Polygon_5.png";
import polygon_6 from "../../images/Polygon_6.png";
import "./Splash.css";

const Splash = () => {
   return (
      <div id="splash">
         <div id="splash__intro">
            <div id="splash__intro__text">
               <h1>Welcome to my app Journey</h1>
               <h3>Here users can create their own journals and entries.</h3>
               <h3 id="main__site__link"><NavLink to="/login">Enter the main site here!</NavLink></h3>
            </div>
            <div id="splash__intro__graphic">
               <img src={polygon_1} id="polygon__1" className="polygon"></img>
               <img src={polygon_2} id="polygon__2" className="polygon"></img>
               <img src={polygon_3} id="polygon__3" className="polygon"></img>
               <img src={polygon_4} id="polygon__4" className="polygon"></img>
               <img src={polygon_5} id="polygon__5" className="polygon"></img>
               <img src={polygon_6} id="polygon__6" className="polygon"></img>
            </div>
         </div>
         <div id="splash__intro__borders">
            <div id="black__border"></div>
            <div id="grey__border"></div>
         </div>
         <div id="technologies">
            <div id="html">Html5</div>
            <div id="css">Css</div>
            <div id="js">Js</div>
            <div id="react">React</div>
            <div id="python">Python</div>
         </div>
      </div>
   )
}

export default Splash;