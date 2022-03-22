import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Sort } from '../util/sort';

@Directive({
  selector: '[appSort]'
})

// Funcionalidad de ordenamiento obtenida de:
// https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140
export class SortDirective {

  @Input() appSort: Array<any> = [];
  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener("click")
  sortData() {
    //Crea el objeto de la clase Sort
    const sort: Sort = new Sort();
    
    // Obtiene la referencia en elemento clickeado
    const elem: HTMLElement = this.targetElem.nativeElement;

    // Obtiene las demás columnas
    const brothers = elem.parentElement!.children;    
    
    // Marca la columna seleccionada como marcada
    elem.setAttribute("selected", "true");

    // Obtiene en qué orden debería ordenarse la lista, por defecto debería ser descendente
    const order = elem.getAttribute("data-order");

    // Obtiene el tipo de dato
    const type = elem.getAttribute("data-type");

    // Obtiene el nombre de la propiedad
    const property = elem.getAttribute("data-name");

    this.appSort.sort(sort.startSort(property, order, type));


    // Marca todas las columnas como no seleccionadas y ordenamiento ascendente
    for (let i = 0; i < brothers!.length; i++) {
      const e = brothers![i];

      // si el elemento es el que fue clickeado lo ignora
      if (e === elem) {
        continue;
      }
      e.setAttribute("selected", "false");
      e.setAttribute("data-order", "asc");
    }


    if (order === "desc") {
      elem.setAttribute("data-order", "asc");
    }else{
      elem.setAttribute("data-order", "desc");
    }
  }

}
