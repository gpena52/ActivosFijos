import { DashboardRepository } from "@/repositories/backend/dashboard.repository";

const repository = new DashboardRepository();

export class DashboardService {

    async getStatistics() {
        return repository.getStatistics();
    }

}