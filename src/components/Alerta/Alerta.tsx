interface Props {
    mensaje: string;
    tipo: "error" | "exito";
}

export const Alerta = ({ mensaje, tipo }: Props) => {
    return (
        <div
            className={`${
                tipo === "error"
                    ? "bg-red-500"
                    : tipo === "exito"
                    ? "bg-green-500"
                    : ""
            } p-3 rounded-md text-white font-montserrat font-black text-center mb-8 uppercase`}
        >
            {mensaje}
        </div>
    );
};
