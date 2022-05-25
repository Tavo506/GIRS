export class Sort {

    private sortOrder = 1;
    private collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });


    constructor() { }

    public startSort(property: any, order: any, type: any = "") {
        if (order === "desc") {
            this.sortOrder = -1
        }
        return (a: any, b: any) => {
            if (type === "date") {
                return this.sortData(new Date(a[property]), new Date(b[property]));
            } else {
                return this.collator.compare(a[property], b[property]) * this.sortOrder;
            }
        }
    }



    private sortData(a: any, b: any) {
        if (a < b) {
            return -1 * this.sortOrder;
        } else if (a > b) {
            return 1 * this.sortOrder;
        } else {
            return 0 * this.sortOrder;
        }
    }
}

/**
 * 
 * @param data Lista de datos
 * @param campo Nombre del campo por el cual se quiere ordenar
 * @param order 1 para ascendente, -1 para descendente
 * @returns La lista ordenada
 */
export function sortJson(data: any[], campo : string, order : 1 | -1 = 1): any[] {
    return data.sort((a: any, b: any): number => {
        let res;
        if (a[campo] > b[campo]) res = -1;
        else if (a[campo] < b[campo]) res = 1;
        else res = 0;
        return res * order;
    });
}

export function sortJsonByMuni(data: any[], order : 1 | -1 = -1): any[] {
    return data.sort((a: any, b: any): number => {
        let res;
        if (a.datosGenerales.municipalidad > b.datosGenerales.municipalidad) res = -1;
        else if (a.datosGenerales.municipalidad < b.datosGenerales.municipalidad) res = 1;
        else res = 0;
        return res * order;
    });
}


