import { useState,useEffect, useContext } from "react"
import { OnyourMind } from "./OnyourMInd";
import { Toprest } from "./Toprest";
import { OnlineFoodDel } from "./OnlineFoodDel";
import { Coordinate } from "../context/sideOpen";
import { FrontPage } from "./FrontPage";

export const MainPage = () =>{
    const {coord:{lat,lng}} = useContext(Coordinate)
  
    const [topres,settopRes] = useState([])
    const [head,setHead] = useState()
    const [onlineDel,setOnlineDel] = useState()
    const [onyourmind,setonyourMind]  = useState([])

    const fetchData = async () => {
                                   
       const data =await fetch(`${import.meta.env.VITE_FETCH_DATA_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
       const rData =await data.json()

        setHead(rData?.data?.cards[1]?.card?.card?.header?.title)
        setOnlineDel(rData?.data?.cards[2]?.card?.card?.title)

        let mainData2 = rData?.data?.cards.find(
            (data) => data?.card?.card?.id == "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        settopRes( mainData2)

        let onminddata = rData?.data?.cards.find(
            (data) => data?.card?.card?.id == "whats_on_your_mind"
        ).card?.card?.imageGridCards?.info;
        setonyourMind(onminddata)
    }
  
    useEffect(()=>{
        fetchData()
    },[lat,lng])

    return(
        <div className="w-full">
            
      
        <div className="w-[75%] relative lD:w-[89%] mx-auto mt-5 overflow-hidden">

 {
    onyourmind.length>0 ? <OnyourMind favdish={onyourmind}/> :<FrontPage/>
 }
  
     <Toprest heading={head} favdish={topres}/>
     <OnlineFoodDel heading={onlineDel} toprest={topres} />

        </div>
      
        </div>
    )
}