export interface Municipalidad{
    anno: number;
    canton: string;
    formaDisposicion: string;
    gastoServicioRecoleccionResiduos: number;
    gastosServicioAseoDeVias:number;
    ingresoServicioRecoleccionRSM:number;
    lugarDisposicion: string;
    personasHabitacion: number;
    ppc: number;
    programaDeReciclaje: string | boolean;
    provincia: string;
    recoleccionDeResiduosSolidosValorizables: string | boolean;
    totalIngresoServicioAseoDeVias: number;
    unidadesHabitacionalesAtendidas: number;
    unidadesHabitacionalesCanton: number;
}