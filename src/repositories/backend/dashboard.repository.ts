import { prisma } from "@/lib/prisma";
import { DashboardDto } from "@/dtos/dashboard.dto";

export class DashboardRepository {

    async getStatistics(): Promise<DashboardDto> {

        const [
            employees,
            departments,
            accountingAccounts,
            fixedAssets
        ] = await Promise.all([
            prisma.employee.count({
                where: { status: true }
            }),
            prisma.department.count({
                where: { status: true }
            }),
            prisma.accountingAccount.count({
                where: { status: true }
            }),
            prisma.fixedAsset.count({
                where: { status: true }
            })
        ]);

        return {
            employees,
            departments,
            accountingAccounts,
            fixedAssets
        };
    }
}