/*
 * Funciones sobre el ordenamiento de la tabla
 */

/**
 * 
 * @param elem 
 * @returns 
 */
export function isSelected(elem: HTMLElement){
    const selected = elem.getAttribute("selected");
    return selected === "true"
}


/**
 * 
 * @param elem 
 * @returns 
 */
export function isDesc(elem: HTMLElement){
    const selected = elem.getAttribute("data-order");
    return selected === "desc"
}


/**
 * Función que retorna la clase para mostrar el ícono respectivo según el ordenamiento de la columna
 * @param elem 
 * @returns 
 */
export function getSortIcon(elem: HTMLElement): string{
    const esDescendiente = isDesc(elem);
    const estaSeleccionado = isSelected(elem);

    if (!estaSeleccionado) {
        return "fa-sort"
    } else {
        return esDescendiente ? 'fa-sort-down' : 'fa-sort-up'
    }
}
