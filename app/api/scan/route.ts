import { NextRequest, NextResponse } from "next/server";
import { scanCode } from "@/lib/scanner";

export async function POST(req: NextRequest)
{
    const {code} = await req.json();

    if(!code)
    {
        return NextResponse.json(
            {error: "No code provided"},
            {status: 400},
        )
    }

    const findings = scanCode(code);

    return NextResponse.json({findings});

}