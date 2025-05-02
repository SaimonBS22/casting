import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

const ActorList = ({ actores, eliminarActor, editarActor }) => {
  const [editando, setEditando] = useState({ actorId: null, campo: null });
  const [campoEditado, setCampoEditado] = useState({});
  const [error, setError] = useState({});

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/actores/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        eliminarActor(id);
      } else {
        console.error('Error al eliminar actor: ', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar actor: ', error);
    }
  };

  const handleEdit = (actor, campo) => {
    setEditando({ actorId: actor._id, campo });
    setCampoEditado({ [campo]: actor[campo] });
    setError({}); // Limpiar errores previos
  };

  const handleChange = (e, campo) => {
    setCampoEditado((prev) => ({
      ...prev,
      [campo]: e.target.value,
    }));
  };

  const validateCampo = (campo, valor) => {
    let mensaje = "";

    switch (campo) {
      case "nombre":
        if (!valor) mensaje = "El nombre es obligatorio";
        break;
      case "edad":
        if (!valor || valor < 10 || valor > 100) mensaje = "Ingrese una edad válida";
        break;
      case "genero":
        if (!valor || !["mujer", "hombre", "no especificar"].includes(valor.toLowerCase()))
          mensaje = "El género es obligatorio";
        break;
      case "altura":
        if (!valor || valor <= 0 || valor >= 230) mensaje = "Ingrese una altura válida";
        break;
      case "descripcion":
        if (!valor) mensaje = "La descripción es obligatoria";
        break;
      case "email":
        if (!valor) mensaje = "El email es obligatorio";
        break;
      case "nacionalidad":
        if (!valor) mensaje = "La nacionalidad es obligatoria";
        break;
      case "cuit":
        if (!/^\d{2}-\d{8}-\d{1}$/.test(valor)) mensaje = "El formato de CUIT es xx-xxxxxxxx-x";
        break;
      case "dni":
        if (!/^\d{8}$/.test(valor)) mensaje = "El DNI debe tener 8 dígitos";
        break;
      case "celular":
        if (!/^\d{10}$/.test(valor)) mensaje = "El celular debe tener 10 dígitos";
        break;
      default:
        break;
    }

    if (mensaje) {
      setError({ [campo]: mensaje });
      return false;
    } else {
      setError({});
      return true;
    }
  };

  const handleSave = async (actorId, campo) => {
    const valor = campoEditado[campo];

    if (!validateCampo(campo, valor)) return;

    try {
      const actorActualizado = { [campo]: valor };

      const response = await fetch(`http://localhost:8080/api/actores/${actorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actorActualizado),
      });

      if (response.ok) {
        const updatedActor = await response.json();
        editarActor(updatedActor);
        setEditando({ actorId: null, campo: null });
        setCampoEditado({});
        setError({});
      } else {
        console.error('Error al guardar cambios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div>
      <ul>
        {actores.map((actor) => (
          <li key={actor._id}>
            <h3>{actor.nombre}</h3>
            {actor.fotoUrl && (
              <img
                src={actor.fotoUrl}
                alt={`Foto de ${actor.nombre}`}
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
            )}
            {["edad", "genero", "altura", "email", "cuit", "dni", "celular", "nacionalidad", "descripcion"].map((campo) => (
              <div key={campo}>
                <p>
                  {editando.actorId === actor._id && editando.campo === campo ? (
                    <>
                      <input
                        type="text"
                        value={campoEditado[campo] || ""}
                        onChange={(e) => handleChange(e, campo)}
                      />
                      {error[campo] && <span style={{ color: "red" }}>{error[campo]}</span>}
                    </>
                  ) : (
                    <span>{actor[campo]}</span>
                  )}
                  <button onClick={() => handleEdit(actor, campo)}>
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  {editando.actorId === actor._id && editando.campo === campo && (
                    <button onClick={() => handleSave(actor._id, campo)}>Guardar</button>
                  )}
                </p>
              </div>
            ))}
            <button onClick={() => handleDelete(actor._id)}>
              <i className="bi bi-trash-fill"></i> Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorList;
