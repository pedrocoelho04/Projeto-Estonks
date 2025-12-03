import React, { useEffect, useState } from "react";
import { createUsuario, getUsuarioById, updateUsuario } from "../../services/api";
import { Save, X } from 'lucide-react';
import { usePage } from "../../store/page";

type Props =
  | { mode: "new"; id?: never }
  | { mode: "edit"; id: number };

export default function UsuarioForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : undefined;
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const { setPage } = usePage();

  useEffect(() => {
    (async () => {
      if (isEdit && id != null) {
        const u = await getUsuarioById(id);
        if (u) setNome(u.nome);
      }
    })();
  }, [isEdit, id]);

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!nome.trim() || (!isEdit && !senha.trim())) {
      alert("Preencha os campos obrigatórios");
      return;
    }
    if (!isEdit) await createUsuario({ nome: nome.trim(), senha: senha.trim() });
    else if (id != null) await updateUsuario(id, { nome: nome.trim(), ...(senha ? { senha: senha.trim() } : {}) });
    setPage({ name: "usuarios" });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{isEdit ? "Editar Usuário" : "Novo Usuário"}</h2>
        <div className="ml-auto flex gap-2">
          <button className="btn btn-outline" onClick={() => setPage({ name: "usuarios" })}>
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
        <div>
          <label className="label" htmlFor="senha">Senha {isEdit && <span className="text-xs text-gray-500">(deixe em branco para manter)</span>}</label>
          <input id="senha" type="password" className="input" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
      </form>
    </div>
  );
}