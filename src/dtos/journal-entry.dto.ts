export interface JournalEntryDto {
    depreciationId?: number;
    numeroAsiento: number;
    fecha: string;
    descripcion: string;
    auxiliar: string;
    cuentaDebito: string;
    cuentaCredito: string;
    monto: number;
    estado: "ACTIVO" | "INACTIVO";
    mensaje: string;
}
