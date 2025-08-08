import React, { useEffect, useState } from "react";
import { createProduto, getCategorias, getCategoriasByProdutoId, getProdutoById, updateProduto } from "../../services/api";
import type { Categoria, Produto } from "../../types";
import { Save, X } from 'lucide-react';
import { useAuthStore } from "../../store/auth";
import { usePage } from "../../store/page";

type Props =
  | { mode: "new"; id?: never }
  | { mode: "edit"; id: number };

type FormState = {
  Nome: string;
  Digital: boolean;
  Altura?: number | null;
  Largura?: number | null;
  Comprimento?: number | null;
  Peso?: number | null;
  Quantidade: number;
  Valor_Unitario: number;
  categoriasSelecionadas: number[];
};

const initialState: FormState = {
  Nome: "",
  Digital: false,
  Quantidade: 0,
  Valor_Unitario: 0,
  categoriasSelecionadas: []
};

export default function ProdutoForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : undefined;
  const user = useAuthStore((s) => s.user);
  const { setPage } = usePage();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<FormState>(initialState);

  useEffect(() => {
    (async () => {
      setCategorias(await getCategorias());
      if (isEdit && id != null) {
        const existing = await getProdutoById(id);
        if (existing) {
          const cats = await getCategoriasByProdutoId(existing.Id);
          setForm({
            Nome: existing.Nome,
            Digital: existing.Digital,
            Altura: existing.Altura ?? null,
            Largura: existing.Largura ?? null,
            Comprimento: existing.Comprimento ?? null,
            Peso: existing.Peso ?? null,
            Quantidade: existing.Quantidade,
            Valor_Unitario: existing.Valor_Unitario,
            categoriasSelecionadas: cats.map((c) => c.Id)
          });
        }
      }
    })();
  }, [isEdit, id]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    if (!form.Nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    if (form.Valor_Unitario < 0 || form.Quantidade < 0) {
      alert("Valores não podem ser negativos");
      return;
    }

    const now = new Date().toISOString();

    if (!isEdit) {
      const payload: Omit<Produto, "Id"> = {
        Nome: form.Nome.trim(),
        Digital: form.Digital,
        Altura: form.Altura ?? null,
        Largura: form.Largura ?? null,
        Peso: form.Peso ?? null,
        Quantidade: form.Quantidade,
        Valor_Unitario: form.Valor_Unitario,
        Comprimento: form.Comprimento ?? null,
        Data_Criacao: now,
        Data_Modificacao: null,
        Usuario_Criou_Id: user?.Id ?? null,
        Usuario_Modificou_Id: null
      };
      await createProduto(payload, form.categoriasSelecionadas);
    } else if (id != null) {
      const payload: Partial<Omit<Produto, "Id">> = {
        Nome: form.Nome.trim(),
        Digital: form.Digital,
        Altura: form.Altura ?? null,
        Largura: form.Largura ?? null,
        Peso: form.Peso ?? null,
        Quantidade: form.Quantidade,
        Valor_Unitario: form.Valor_Unitario,
        Comprimento: form.Comprimento ?? null,
        Usuario_Modificou_Id: user?.Id ?? null
      };
      await updateProduto(id, payload, form.categoriasSelecionadas);
    }

    setPage({ name: "produtos" });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{isEdit ? "Editar Produto" : "Novo Produto"}</h2>
        <div className="ml-auto flex gap-2">
          <button className="btn btn-outline" onClick={() => setPage({ name: "produtos" })}>
            <X size={16} /> Cancelar
          </button>
          <button className="btn btn-primary" onClick={() => onSubmit()}>
            <Save size={16} /> Salvar
          </button>
        </div>
      </div>

      <form className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onSubmit}>
        <div className="md:col-span-2">
          <label className="label" htmlFor="nome">Nome</label>
          <input id="nome" className="input" value={form.Nome} onChange={(e) => updateField("Nome", e.target.value)} />
        </div>

        <div>
          <label className="label">Tipo</label>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="tipo"
                checked={!form.Digital}
                onChange={() => updateField("Digital", false)}
              />
              <span>Físico</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="tipo"
                checked={form.Digital}
                onChange={() => updateField("Digital", true)}
              />
              <span>Digital</span>
            </label>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="quant">Quantidade</label>
          <input
            id="quant"
            type="number"
            className="input"
            value={form.Quantidade}
            onChange={(e) => updateField("Quantidade", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="label" htmlFor="valor">Valor Unitário (R$)</label>
          <input
            id="valor"
            type="number"
            step="0.01"
            className="input"
            value={form.Valor_Unitario}
            onChange={(e) => updateField("Valor_Unitario", Number(e.target.value))}
          />
        </div>

        {!form.Digital && (
          <>
            <div>
              <label className="label" htmlFor="comp">Comprimento</label>
              <input id="comp" type="number" step="0.01" className="input" value={form.Comprimento ?? ""} onChange={(e) => updateField("Comprimento", e.target.value ? Number(e.target.value) : null)} />
            </div>
            <div>
              <label className="label" htmlFor="larg">Largura</label>
              <input id="larg" type="number" step="0.01" className="input" value={form.Largura ?? ""} onChange={(e) => updateField("Largura", e.target.value ? Number(e.target.value) : null)} />
            </div>
            <div>
              <label className="label" htmlFor="alt">Altura</label>
              <input id="alt" type="number" step="0.01" className="input" value={form.Altura ?? ""} onChange={(e) => updateField("Altura", e.target.value ? Number(e.target.value) : null)} />
            </div>
            <div>
              <label className="label" htmlFor="peso">Peso</label>
              <input id="peso" type="number" step="0.001" className="input" value={form.Peso ?? ""} onChange={(e) => updateField("Peso", e.target.value ? Number(e.target.value) : null)} />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="label">Categorias</label>
          <div className="flex flex-wrap gap-3">
            {categorias.map((c) => {
              const checked = form.categoriasSelecionadas.includes(c.Id);
              return (
                <label key={c.Id} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const next = new Set(form.categoriasSelecionadas);
                      if (e.target.checked) next.add(c.Id);
                      else next.delete(c.Id);
                      updateField("categoriasSelecionadas", Array.from(next));
                    }}
                  />
                  <span>{c.Nome}</span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}