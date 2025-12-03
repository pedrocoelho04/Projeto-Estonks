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
  nome: string;
  digital: boolean;
  altura?: number | null;
  largura?: number | null;
  comprimento?: number | null;
  peso?: number | null;
  quantidade: number;
  valor_Unitario: number;
  categoriasSelecionadas: number[];
};

const initialState: FormState = {
  nome: "",
  digital: false,
  quantidade: 0,
  valor_Unitario: 0,
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
        try {
          const existing = await getProdutoById(id);
          if (existing) {
            setForm({
              nome: existing.nome,
              digital: existing.digital,
              altura: existing.altura ?? null,
              largura: existing.largura ?? null,
              comprimento: existing.comprimento ?? null,
              peso: existing.peso ?? null,
              quantidade: existing.quantidade,
              valor_Unitario: existing.valor_Unitario,
              categoriasSelecionadas: existing.categorias?.map((c) => c.id) || []
            });
          } else {
            console.error("Produto não encontrado para edição. ID:", id);
          }
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      }
    })();
  }, [isEdit, id]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    if (!form.nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    if (form.valor_Unitario < 0 || form.quantidade < 0) {
      alert("Valores não podem ser negativos");
      return;
    }

    const now = new Date().toISOString();

    if (!isEdit) {
      const payload: Omit<Produto, "id"> = {
        nome: form.nome.trim(),
        digital: form.digital,
        altura: form.altura ?? null,
        largura: form.largura ?? null,
        peso: form.peso ?? null,
        quantidade: form.quantidade,
        valor_Unitario: form.valor_Unitario,
        comprimento: form.comprimento ?? null,
        data_criacao: now,
        data_modificacao: null,
        usuario_Criou_Id: user ?? null,
        usuario_Modificou_id: null
      };
      await createProduto(payload, form.categoriasSelecionadas);
    } else if (id != null) {
      const payload: Partial<Omit<Produto, "id">> = {
        nome: form.nome.trim(),
        digital: form.digital,
        altura: form.altura ?? null,
        largura: form.largura ?? null,
        peso: form.peso ?? null,
        quantidade: form.quantidade,
        valor_Unitario: form.valor_Unitario,
        comprimento: form.comprimento ?? null,
        usuario_Modificou_id: user ?? null
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
          <input id="nome" className="input" value={form.nome} onChange={(e) => updateField("nome", e.target.value)} />
        </div>

        <div>
          <label className="label">Tipo</label>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="tipo"
                checked={!form.digital}
                onChange={() => updateField("digital", false)}
              />
              <span>Físico</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="tipo"
                checked={form.digital}
                onChange={() => updateField("digital", true)}
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
            value={form.quantidade}
            onChange={(e) => updateField("quantidade", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="label" htmlFor="valor">Valor Unitário (R$)</label>
          <input
            id="valor"
            type="number"
            step="0.01"
            className="input"
            value={form.valor_Unitario}
            onChange={(e) => updateField("valor_Unitario", Number(e.target.value))}
          />
        </div>

        {!form.digital && (
          <>
            <div>
              <label className="label" htmlFor="comp">Comprimento</label>
              <input id="comp" type="number" step="0.01" className="input" value={form.comprimento ?? ""} onChange={(e) => updateField("comprimento", e.target.value ? Number(e.target.value) : null)} />
            </div>
            <div>
              <label className="label" htmlFor="larg">Largura</label>
              <input id="larg" type="number" step="0.01" className="input" value={form.largura ?? ""} onChange={(e) => updateField("largura", e.target.value ? Number(e.target.value) : null)} />
            </div>
            <div>
              <label className="label" htmlFor="alt">Altura</label>
              <input id="alt" type="number" step="0.01" className="input" value={form.altura ?? ""} onChange={(e) => updateField("altura", e.target.value ? Number(e.target.value) : null)} />
            </div>
            <div>
              <label className="label" htmlFor="peso">Peso</label>
              <input id="peso" type="number" step="0.001" className="input" value={form.peso ?? ""} onChange={(e) => updateField("peso", e.target.value ? Number(e.target.value) : null)} />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="label">Categorias</label>
          <div className="flex flex-wrap gap-3">
            {categorias.map((c) => {
              const checked = form.categoriasSelecionadas.includes(c.id);
              return (
                <label key={c.id} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const next = new Set(form.categoriasSelecionadas);
                      if (e.target.checked) next.add(c.id);
                      else next.delete(c.id);
                      updateField("categoriasSelecionadas", Array.from(next));
                    }}
                  />
                  <span>{c.nome}</span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}