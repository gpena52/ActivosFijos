import { DepreciationRecordDto, JournalEntry } from "@/dtos";
import { DepreciationRecordRepository } from "@/repositories/backend/depreciation-record.repository";

const repository = new DepreciationRecordRepository();

export class DepreciationRecordService {
    async getAllByDateRange(startDate: Date, endDate: Date): Promise<DepreciationRecordDto[]> {
        return repository.getAllByDateRange(startDate, endDate);
    }

    async update(request: JournalEntry[]) {
        return repository.update(request);
    }
}