export function validateIdentification(cedula: string): boolean {
    // Eliminar guiones y espacios
    cedula = cedula.replace(/-/g, "").trim();

    // Debe tener exactamente 11 dígitos
    if (!/^\d{11}$/.test(cedula)) {
        return false;
    }

    const pesos = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 10; i++) {
        let producto = Number(cedula[i]) * pesos[i];

        if (producto > 9) {
            producto = Math.floor(producto / 10) + (producto % 10);
        }

        suma += producto;
    }

    const digitoEsperado = (10 - (suma % 10)) % 10;
    const digitoReal = Number(cedula[10]);

    return digitoEsperado === digitoReal;
}