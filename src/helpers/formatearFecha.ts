

const formatearFecha = (fecha: string) => {

    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return fechaFormateada

}
 
export default formatearFecha;