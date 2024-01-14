import React, { useEffect, useState } from "react";
import { Alerta } from "..";
import { v4 as uuidv4 } from "uuid";
import formatearFecha from "../../helpers/formatearFecha";

type Tarea = {
    id?: string;
    nombreTarea: string;
    materia: string;
    fechaFomat: string;
    completado?: boolean;
};

interface Props {
    setTareas: React.Dispatch<React.SetStateAction<Tarea[]>>;
    tareas: Tarea[];
    tarea: Tarea;
    fecha: string;
    setFecha: React.Dispatch<React.SetStateAction<string>>;
    completado?: boolean;
    setCompletado?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Formulario = ({ setTareas, tareas, tarea, fecha, setFecha, completado, setCompletado }: Props) => {
    const [nombreTarea, setNombrwTarea] = useState<string>("");
    const [materia, setMateria] = useState<string>("");

    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (tarea.id) {
            setNombrwTarea(tarea.nombreTarea);
            setMateria(tarea.materia);
            setFecha(tarea.fechaFomat);
        }
    }, [setFecha, tarea]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ([nombreTarea, materia, fecha].includes("")) {
            setError(true);
            return;
        }

        const fechaFomat = formatearFecha(fecha);

        const nuevaTarea: Tarea = {
            nombreTarea,
            materia,
            fechaFomat,
            completado
        };

        if (tarea.id) {
            nuevaTarea.id = tarea.id;
            if (tarea.completado) {
                nuevaTarea.completado = tarea.completado;
            }
            const tareasActualizadas: Tarea[] = tareas.map((tareaState) =>
                tareaState.id === tarea.id ? nuevaTarea : tareaState
            );

            setTareas(tareasActualizadas);
        } else {
            nuevaTarea.id = uuidv4();
            setTareas([...tareas, nuevaTarea]);
        }

        setError(false);
        setNombrwTarea("");
        setMateria("");
        setFecha("");
        setCompletado!(false);
    };
    return (
        <div className="w-full md:w-1/2 bg-black-bean-100 md:h-fit">
            <h2 className="text-center text-2xl font-black text-black-bean-800 uppercase mt-4 font-montserrat">
                ¿Que Tarea agregaras?
            </h2>

            <form className="p-6" onSubmit={handleSubmit}>
                {error && (
                    <Alerta
                        mensaje="Todos los campos son obligatorios"
                        tipo="error"
                    />
                )}
                <div className="mb-4">
                    <p className="mb-4 text-black-bean-400 uppercase font-montserrat font-black">
                        Nombre De La Tarea:
                    </p>
                    <input
                        type="text"
                        className="w-full border border-black-bean-200 rounded-lg p-3 focus:outline-none focus:border-black-bean-500"
                        placeholder="Nombre De La Tarea"
                        onChange={(e) => setNombrwTarea(e.target.value)}
                        value={nombreTarea}
                    />
                </div>
                <div className="mb-4">
                    <p className="mb-4 text-black-bean-400 uppercase font-montserrat font-black">
                        Materia:
                    </p>
                    <select
                        className="w-full border border-black-bean-200 rounded-lg p-3 focus:outline-none focus:border-black-bean-500"
                        name="materia"
                        onChange={(e) => setMateria(e.target.value)}
                        value={materia}>
                        <option value="">-- Seleccione --</option>
                        <option value="ecuaciones diferenciales">
                            Ecuaciones Diferenciales
                        </option>
                        <option value="taller de base de datos">
                            Taller de bases de datos
                        </option>
                        <option value="programacion">Programacion</option>
                        <option value="matematicas discretas">
                            Matematicas Discretas
                        </option>
                        <option value="dibujo">Dibujo</option>
                        <option value="software">Software de aplicación</option>
                        <option value="topografia">Topografía</option>
                        <option value="materiales y procesos constructivos">
                            Materiales y procesos constructivos
                        </option>
                    </select>
                </div>
                <div className="mb-4">
                    <p className="mb-4 text-black-bean-400 uppercase font-montserrat font-black">
                        Fecha De Entrega:
                    </p>
                    <input
                        type="date"
                        className="w-full border border-black-bean-200 rounded-lg p-3 focus:outline-none focus:border-black-bean-500"
                        placeholder="Nombre De La Tarea"
                        onChange={(e) => setFecha(e.target.value)}
                        value={fecha}
                    />
                </div>
                <div className="mb-4">
                    {!tarea.id ? (
                        <button
                            type="submit"
                            className="w-full bg-black-bean-500 hover:bg-black-bean-600 text-white uppercase font-montserrat font-black text-xl p-3 rounded-lg">
                            Agregar Tarea
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-black-bean-500 hover:bg-black-bean-600 text-white uppercase font-montserrat font-black text-xl p-3 rounded-lg">
                            Editar Tarea
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
