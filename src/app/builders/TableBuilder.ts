export interface TableColumn{
    name: string;   //Nombre de la columna
    sortable: boolean;  //Si la columna permite ordenamiento
}

export class TableBuilder{

    data!: any[];
    
    keys!: any[];
    columns!: TableColumn[];

    /**
     * 
     * @param data La lista de datos a mostrar en la tabla
     * @param columns La lista de columnas en orden a cada elemento
     */
    public constructor(data: any[], columns: TableColumn[]){
        this.data = data.map(item => {
            return Object.values(item);
        })
        this.keys = Object.keys(data[0]);
        this.columns = columns;
    }



    // Retorna los datos
    public getData(): any[]{
        return this.data;
    }

    // Retorna las columnas
    public getColumns(): TableColumn[]{
        return this.columns;
    }


    /**
     * Función para indicar que la columna "column" se mostrárá con íconos para representar el true o false
     * @param column Índice de la columna
     * @returns TableBuilder
     */
    public setTrueFalseColumn(column: number): TableBuilder{
        let type = typeof(this.data[0][column]);   // Obtiene el tipo de dato de la columna
        
        // Verifica que el índice esté dentro del rango permitido
        if (column >= this.data[0]["length"] || column < 0) {
            throw new Error(`No existe la columna ${column}`);
        }

        // Verifica que la columna sea de tipo boolean
        if (type !== "boolean") {
            throw new Error(`La columna ${column} no es de tipo booleano para aplicar la función`);
        }

        this.data = this.data.map(item => {
            item[column] = item[column] ? '<i class="fa-solid fa-circle-check true-icon"></i>' : `<i class="fa-solid fa-circle-xmark false-icon"></i>`
            return {...item}
        })
        
        return this;
    }


    /**
     * Crear una columna de botones de aceptar y rechazar
     * @param callbackYes La función que ejecutará el botón de aceptar, el valor de cada dato se llama "item"
     * @param callbackNo La función que ejecutará el botón de rechazar, el valor de cada dato se llama "item"
     * @param columnName El nombre de la columna a crear
     * @param position Número de columna en donde se insertarán los botones, por defecto es al final
     */
    public setYesNoButton(callbackYes: Function, callbackNo: Function, columnName: string, position: number = this.data["length"]): TableBuilder{

        // Para evitar problemas, aunque se puede, se prohíbe el uso de posiciones negativas
        if (position < 0) {
            throw new Error("La posición a incertar los botones debe ser un número mayor a 0");
        }

        let buttonYes: string = `<button (click)="${callbackYes}">Yes</button>`;
        let buttonNo: string = `<button (click)="${callbackNo}">Yes</button>`;
        this.columns.splice(position, 0, {name: columnName, sortable: false});   //Inserta la columna en la posición indicada
        this.keys.splice(position, 0, columnName.replace(" ", "_"));
        console.log(this.data);
        
        this.data = this.data.map(item => {
            console.log([item]); //TODO Aplanar los objetos a una lista para poder usar la función splice
            
            item.splice(position, 0, `${buttonYes}\n${buttonNo}`);
            return item;
        })
        // this.keys[position] = 
        // this.data = this.data.map(item => {
        //     item[]
        // })
        return this;
    }


}