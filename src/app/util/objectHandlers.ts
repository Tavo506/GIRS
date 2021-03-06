
/**
 * Función para comparar si dos objetos son iguales
 * @param object1 Primer objeto a comparar
 * @param object2 Segundo objeto a comparar
 * @returns Si los objetos son iguales
 * Código: https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
 */
export function compareObjects(object1: any, object2: any) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !compareObjects(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}

function isObject(object: any) {
  return object != null && typeof object === 'object';
}