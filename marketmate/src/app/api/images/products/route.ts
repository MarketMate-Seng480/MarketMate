import { supabase } from "../../../lib/supabase";
import { NextResponse, NextRequest } from "next/server";

// Upload
export async function POST(request: NextRequest) {
    const json = await request.json();
    const file = json.file;
    const productId = json.productId;
    const { data, error } = await supabase
    .storage
    .from('productImage')
    .upload(`${productId}`, file)
    if (error) {
        return NextResponse.json({
            error: error.message,
            status: 500,
          });
    } //else {
        // Handle success
    // }
    return NextResponse.json({ message: "ok", status: 200, data: data });
}


// Download
export async function GET(request: NextRequest) {
    const json = await request.json();
    const file = json.file;
    const productId = json.productId;
    const { data, error } = await supabase
    .storage
    .from('productImage')
    .download(`${productId}`)
    //if (error) {
      // Handle error
   // } else {
      // Handle success
   // }
   return NextResponse.json({ message: "ok", status: 200, data: data });
}


