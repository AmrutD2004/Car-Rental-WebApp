import { bookCarAPI } from "@/app/api/endpoints/endpoints"

export const bookCar = async(formData : FormData, prizeperday : string, carId : number)=>{
    const startdate = formData.get('startdate') as string
    const enddate = formData.get('enddate') as  string

    if(!startdate || !enddate){
        return {
            success : false,
            message : "Both date should be present!"
        }
    }

    const start = new Date(startdate)
    const end = new Date(enddate)

    const difference = end.getDate() - start.getDate()
    const totalCost =  Number(prizeperday) * difference
    
    try{

        const payload = {
            startdate : startdate,
            enddate : enddate,
            carId : carId,
            totalprize : totalCost
        }

        const data = await bookCarAPI(payload)
        return {
            success : true,
            data : data.data
        }

    }catch(err){
        return {
            success : false,
            message : err
        }
    }
}