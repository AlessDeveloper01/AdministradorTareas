import { Tarea } from "../../components";

type Tarea = {
    id?: string;
    nombreTarea: string;
    materia: string;
    fechaFomat: string;
};

interface Props {
    tareas: Tarea[];
    setTarea: React.Dispatch<React.SetStateAction<Tarea>>;
    handleEliminar: (id: string) => void;
    setFecha: React.Dispatch<React.SetStateAction<string>>;
    setCompletado: React.Dispatch<React.SetStateAction<boolean>>;
    completado?: boolean;
    handleCompletado: (id: string) => void;
}

export const Tareas = ({ tareas, handleEliminar, setTarea, setFecha, setCompletado, completado, handleCompletado }: Props) => {
    return (
        <section className="w-full md:w-1/2 mx-auto bg-black-bean-100 md:overflow-y-scroll md:h-[483px]">
            <h2 className="text-center text-2xl font-black text-black-bean-800 uppercase mt-4 font-montserrat">
                Tareas
            </h2>
            {tareas.length === 0 ? (
                <h3 className="text-center text-black-bean-800 font-montserrat text-xl mt-5 uppercase">
                    No hay tareas{" "}
                    <span className="font-bold text-black-bean-950 block">
                        comienza agregando tus tareas y administralas
                    </span>
                </h3>
            ) : (
                tareas.map((tareaUnica) => (
                    <Tarea
                        key={tareaUnica.id}
                        tareaUnica={tareaUnica}
                        handleEliminar={handleEliminar}
                        setTarea={setTarea}
                        setFecha={setFecha}
                        setCompletado={setCompletado}
                        completado={completado}
                        handleCompletado={handleCompletado}
                    />
                ))
            )}
        </section>
    );
};
