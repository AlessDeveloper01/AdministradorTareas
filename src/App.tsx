import { useState, useEffect } from "react";
import { Footer, Formulario, Header, Hero, Tareas } from "./components";

type Tarea = {
    id?: string;
    nombreTarea: string;
    materia: string;
    fecha: string;
    completado?: boolean;
};

function App() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [tarea, setTarea] = useState<Tarea>({} as Tarea);
    const [fecha, setFecha] = useState<string>("");
    const [completado, setCompletado] = useState<boolean>(false);

    useEffect(() => {
        const totalTareas = JSON.parse(localStorage.getItem("tareas")!) ?? [];

        if (totalTareas) {
            setTareas(totalTareas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }, [tareas]);

    const handleEliminar = (id: string) => {
        const tareasActualizadas = tareas.filter(
            (tareaState) => tareaState.id !== id
        );
        setTareas(tareasActualizadas);
    };

    const handleCompletado = (id: string) => {
        const tareasActualizadas = tareas.map((tareaState) =>
            tareaState.id === id
                ? {
                      ...tareaState,
                      completado: !tareaState.completado,
                  }
                : tareaState
        );
        setTareas(tareasActualizadas);
     };

    return (
        <>
            <div className="container mx-auto mt-10">
                <Header />
            </div>
            <Hero />
            <div className="container mx-auto my-10">
                <div className="md:flex md:gap-8 pb-10">
                    <Formulario
                        setTareas={setTareas}
                        tareas={tareas}
                        tarea={tarea}
                        fecha={fecha}
                        setFecha={setFecha}
                        completado={completado}
                        setCompletado={setCompletado}
                    />
                    <Tareas
                        tareas={tareas}
                        handleEliminar={handleEliminar}
                        setTarea={setTarea}
                        setFecha={setFecha}
                        setCompletado={setCompletado}
                        completado={completado}
                        handleCompletado={handleCompletado}
                    />
                </div>

            </div>
                <Footer />
        </>
    );
}

export default App;
