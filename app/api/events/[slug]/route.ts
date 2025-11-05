import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params:Promise<{
        slug:string,
    }>
};

export async function GET(req:NextRequest,{params}:RouteParams): Promise<NextResponse>{
    try {
        await connectDB();
        const {slug} = await params;
        
        if(!slug || slug.trim() === '' || typeof slug !== 'string'){
            return NextResponse.json({message:'Missing or invalid slug parameter'},{status:404})
        }

        //Sanitize slug
        const sanitizedSlug = slug.trim().toLowerCase()

        const event = await Event.findOne({slug:sanitizedSlug}).lean()

        if(!event){
            return NextResponse.json({message:`Event with slug ${sanitizedSlug} not found`},{status:404})
        }

        return NextResponse.json({message:'Event fetched successfully',event},{status:200})
    } catch (error) {
        console.error("Error fetching event by slug ",error)
        return NextResponse.json({message:'Error fetching event'},{status:500})
    }
}