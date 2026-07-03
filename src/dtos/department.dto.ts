export interface DepartmentDto {
    id: number;
    name: string;
    description: string | null;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}
