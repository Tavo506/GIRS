export interface Reporte{
    $key?: string;
    estado?: "Completado" | "Sin completar";
    anno: number;
    provincia: string;
    canton: string;
    datosGenerales: datosGenerales;
    caracteristicasServicio: caracteristicasServicio;
    aspectosFinancieros: aspectosFinancieros;
    fechaModificacion: Date;
    disposicion: disposicion;
    informacionCalculada: informacionCalculada;
}

interface datosGenerales {
    nombreGestor: string;
    telefono: string;
    cantidadViviendas: number;
    poblacionAtendida: number;
    email: string;
    fecha: string;
    municipalidad: string;
}

interface caracteristicasServicio {
    cantidadMensualRecolectados: number;
    barridoCalles: string; //Sí o No
    porcentajeRecoleccion: string;
    rutasRecoleccion: string; //Sí o No
    cantidadSemanaRecoleccionNoValorizables: number;
    cantidadSemanaRecoleccionValorizables: number;
    cantidadCamiones: number;
    recoleccionSeparada: string; //Sí o No
    recoleccionBiodegradables: string; //Sí o No
    cantidadMensualDisposicion: number;
    mapasRutas: string; //Sí o No
}

interface aspectosFinancieros {
    presupuestoInvertidoGirs: number;
    presupuestoInvertidoLimpieza: number;
    porcentajeMorosidad: number;
    inversionCampanasEducacion: number;
}

interface disposicion{
    indiceGeneracion: number;
    quemadoresActivosSitio: string;
    cargoUtilCamionViaje: number;
    distanciaPromedioSitio: number;
    lugarDisposicion: string;
    tipoLugarDisposicion: string;
    sitioVertido: string;
    estudioComposicion: string; //Sí o No
    cantidadViajesMes: number;
    consumoCombustibleCamion: number;
    cantidadVolumetricaCamiones: number;
    quemadoresPasivosSitio: string; //Sí o No
}

interface informacionCalculada{
    gastoPorAseo: number;
    gastoPorVivienda: number;
    indiceGeneracion: number;
    presupuestoInvertido?: number; //TODO Esto hay que revisarlo porque solo viente en un reporte
}

export function newReporte(){
    
}