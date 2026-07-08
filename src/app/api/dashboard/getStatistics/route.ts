import { DashboardService } from "@/services/backend/dashboard.service";
import { NextResponse } from "next/server";

const service = new DashboardService();

export async function GET() {

    try {

        const data = await service.getStatistics();

        return NextResponse.json(data);

    } catch {

        return NextResponse.json(
            { message: "Error al obtener las estadísticas." },
            { status: 500 }
        );
    }

}