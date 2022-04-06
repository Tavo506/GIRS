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
 * @param data Lista de datos con un campo de fecha
 * @param campo Nombre del campo con la fecha por el cual se quiere ordenar
 * @returns La lista ordenada por la fecha
 */
export function sortDate(data: any[], campo : string = "anno"): any[] {
    return data.sort((a: any, b: any): number => {
        if (a[campo] > b[campo]) return -1;
        else if (a[campo] < b[campo]) return 1;
        else return 0;
    });
}