export interface JournalEntryRequest {
    auxiliarId: number;
    cuentaDebitoId: number;
    cuentaCreditoId: number;
    descripcion: string;
    monto: number;
}