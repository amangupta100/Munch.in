import { RestCard } from "./RestCard"

export const OnlineFoodDel = ({heading,toprest}) =>{
    return(
        <div className="mt-9">
        <h1 className="text-2xl font-extrabold"> Restaurants with online food delivery near you </h1>
        <div className="grid vlm:pr-0 pr-10 mb-4 gap-12 grid-cols-4 lD:grid-cols-3 vlm:grid-cols-1 vlm:flex vlm:flex-col tb:grid-cols-2 mt-8">
        {
            toprest.map((elem,i)=>{
                return(
                    <div key={i}>
                        <RestCard rest={elem}/>
                    </div>
                )
            })
        }
        </div>
        </div>
    )
}