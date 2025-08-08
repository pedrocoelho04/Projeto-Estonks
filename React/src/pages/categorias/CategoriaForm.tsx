import React, { useEffect, useState } from "react";
import { createCategoria, getCategoriaById, updateCategoria } from "../../services/api";
import { Save, X } from 'lucide-react';
import { usePage } from "../../store/page";

type Props =
  | { mode: "new"; id?: never }
  | { mode: "edit"; id: number };

export default function CategoriaForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : undefined;
  const [nome, setNome] = useState("");
  const { setPage } = usePage();

  useEffect(() => {
    (async () => {
      if (isEdit && id != null) {
        const cat = await getCategoriaById(id);
        if (cat) setNome(cat.Nome);
      }
    })();
  }, [isEdit, id]);

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    if (!isEdit) await createCategoria({ Nome: nome.trim() });
    else if (id != null) await updateCategoria(id, { Nome: nome.trim() });
    setPage({ name: "categorias" });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{isEdit ? "Editar Categoria" : "Nova Categoria"}</h2>
        <div className="ml-auto flex gap-2">
          <button className="btn btn-outline" onClick={() => setPage({ name: "categorias" })}>
            <X size={16} /> Cancelar
          </button>
          <button className="btn btn-primary" onClick={() => onSubmit()}>
            <Save size={16} /> Salvar
          </button>
        </div>
      </div>

      <form className="card p-4 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="label" htmlFor="nome">Nome</label>
          <input id="nome" className="input" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
      </form>
    </div>
  );
}