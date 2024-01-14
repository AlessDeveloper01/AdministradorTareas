import React, { useState } from "react";
import Swal from "sweetalert2";

type Tarea = {
    id?: string;
    nombreTarea: string;
    materia: string;
    fechaFomat: string;
    completado?: boolean;
};

interface Props {
    tareaUnica: Tarea;
    handleEliminar: (id: string) => void;
    setTarea: React.Dispatch<React.SetStateAction<Tarea>>;
    setFecha: React.Dispatch<React.SetStateAction<string>>;
    setCompletado: React.Dispatch<React.SetStateAction<boolean>>;
    completado?: boolean;
    handleCompletado: (id: string) => void;
}

export const Tarea = ({ tareaUnica, handleEliminar, setTarea, handleCompletado }: Props) => {
    const [modal, setmMdal] = useState<boolean>(false);
    const [completar, setCompletar] = useState<boolean>(false);

    const seguroEliminar = () => {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "No podras revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleEliminar(tareaUnica.id!);
                Swal.fire("Eliminado!", "Tu tarea ha sido eliminada.", "success");
            }
        });
    }

    return (
        <div className="p-6 border-b border-black-bean-800 relative">
            {modal && (
                <div className="absolute inset-0 bg-black-bean-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md">
                        <h3 className="text-center text-2xl font-black text-black-bean-800 uppercase mt-4 font-montserrat">
                            ¿Completaste la tarea?
                        </h3>
                        <div className="flex justify-center mt-5">
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-bold uppercase"
                                onClick={() => {
                                    setCompletar(false);
                                    setmMdal(false);
                                }}>
                                No
                            </button>

                            <button
                                type="button"
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-bold uppercase ml-4"
                                onClick={() => {
                                    setmMdal(false);
                                    setCompletar(true);
                                    handleCompletado(tareaUnica.id!);
                                }}>
                                Si
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {completar && (
                <div className="absolute inset-0 bg-black-bean-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md">
                        <h3 className="text-center text-2xl font-black text-black-bean-800 uppercase mt-4 font-montserrat">
                            ¡Felicidades!
                        </h3>
                        <p className="text-center text-black-bean-800 font-montserrat text-xl mt-5 uppercase">
                            Has completado la tarea:{" "}
                            <span className="font-bold block">
                                {tareaUnica.nombreTarea}
                            </span>
                        </p>
                        <div className="flex justify-center mt-5">
                            <button
                                type="button"
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-bold uppercase"
                                onClick={() => {
                                    setCompletar(false);
                                    setmMdal(false);
                                }}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <p className="text-black-bean-800 font-montserrat font-bold uppercase mb-5">
                Tarea:{" "}
                <span className={
                    tareaUnica.completado
                        ? 'line-through font-normal block'
                        : 'font-normal block'
                }>{tareaUnica.nombreTarea}</span>
            </p>
            <p className="text-black-bean-800 font-montserrat font-bold uppercase mb-5">
                Materia:{" "}
                <span className="font-normal block">{tareaUnica.materia}</span>
            </p>
            {!tareaUnica.completado ? (
                <p className="text-black-bean-800 font-montserrat font-bold uppercase mb-5">
                    Entregrar el dia:{" "}
                    <span className="font-normal block">
                        {tareaUnica.fechaFomat}
                    </span>
                </p>
            ) : (
                <p className="text-black-bean-800 font-montserrat font-bold uppercase mb-5">
                    Tarea completada el dia:{" "}
                        <span className="font-normal block">{
                            new Date().toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                    }</span>
                </p>
            )}

            <div className="flex justify-center">
                {!tareaUnica.completado ? (
                    <button
                        type="button"
                        className="bg-black-bean-500 hover:bg-black-bean-600 px-4 py-2 rounded-md text-white font-bold uppercase"
                        onClick={() => {
                            setmMdal(true);
                        }}>
                        Completar
                    </button>
                ) : (
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-bold uppercase"
                        onClick={() => seguroEliminar()}>
                        Eliminar
                    </button>
                )}

                {!tareaUnica.completado && (
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-bold uppercase ml-4"
                        onClick={() => {
                            setTarea(tareaUnica);
                        }}>
                        Editar
                    </button>
                )}
            </div>
        </div>
    );
};
