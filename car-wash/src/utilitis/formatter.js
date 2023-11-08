const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

export function formatCurrency(value) {
  if (typeof value === "string") {
    // Intenta convertir el valor a número
    const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ""));

    if (!isNaN(numericValue)) {
      const formattedValue = formatter.format(numericValue);
      // Verifica si la cadena formateada termina en ",00" y, en ese caso, elimina esos dos ceros
      if (formattedValue.endsWith(",00")) {
        return formattedValue.slice(0, -3); // Elimina los dos últimos caracteres y la coma
      }
      return formattedValue;
    }
  } else if (typeof value === "number") {
    // Si el valor ya es un número, simplemente formátalo
    const formattedValue = formatter.format(value);
    if (formattedValue.endsWith(",00")) {
      return formattedValue.slice(0, -3); // Elimina los dos últimos caracteres y la coma
    }
    return formattedValue;
  }

  // Si el valor no es válido como número, puedes devolver un mensaje de error o lo que prefieras.
  return "Valor no válido";
}
