import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAnalytics, useLeadCapture } from "../hooks";

interface StatItem {
    value: string;
    label: string;
}

interface TimelineItem {
    index: string;
    title: string;
    description: string;
}

const stats: StatItem[] = [
    { value: "+R$ 1.500", label: "ganho extra médio mensal" },
    { value: "15 MIN", label: "para aprender a rota" },
    { value: "+1.200", label: "entregadores parceiros" },
    { value: "2X", label: "mais lucro por corrida" },
];

const timeline: TimelineItem[] = [
    {
        index: "[01]",
        title: "ROTAS DE PRECISÃO",
        description:
            "Pare de rodar no escuro. Aprenda a identificar as melhores regiões de alta demanda em tempo real e pare de aceitar corridas baratas.",
    },
    {
        index: "[02]",
        title: "CUSTO DO KM",
        description:
            "Entenda exatamente quanto você gasta por quilômetro rodado e reduza os custos de combustível e manutenção da moto.",
    },
    {
        index: "[03]",
        title: "MÚLTIPLOS APLICATIVOS",
        description:
            "Como conciliar diferentes plataformas de entrega ao mesmo tempo sem risco de bloqueio ou suspensão da sua conta.",
    },
    {
        index: "[04]",
        title: "NEGÓCIO PRÓPRIO",
        description:
            "Aprenda a tratar suas corridas como uma empresa, definindo metas diárias e tendo total previsibilidade financeira.",
    },
];

const diagonalBuildingUrl =
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80";
const libraryBuildingUrl =
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80";

const Page: React.FC = () => {
    const { logPageView, logEvent } = useAnalytics();
    const leadCapture = useLeadCapture();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        logPageView(window.location.pathname);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            setErrorMsg("Por favor, preencha os campos obrigatórios.");
            return;
        }
        try {
            await leadCapture.mutateAsync({
                name,
                email,
                phone,
                source: "landing_page_fastmotors",
            });
            setSuccess(true);
            setErrorMsg("");
            logEvent("lead_capture_success", { name, email });
        } catch (err: any) {
            setErrorMsg(err.message || "Erro ao cadastrar lead. Tente novamente.");
        }
    };

    return (
        <>
            {/* Fonte de display usada no headline. */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap"
            />

            <div className="min-h-screen w-full bg-white text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                    {/* ============ HEADER ============ */}
                    <header className="flex items-center justify-between py-6 sm:py-8">
                        <span className="text-xl font-extrabold tracking-tight sm:text-2xl">FM</span>

                        <div className="hidden flex-col items-center gap-[3px] sm:flex">
                            <span className="block h-[2px] w-8 bg-black" />
                            <span className="block h-[2px] w-8 bg-black" />
                            <span className="block h-[2px] w-8 bg-black" />
                        </div>

                        <Link 
                            to="/login"
                            className="bg-black px-4 py-2 text-[11px] font-semibold tracking-wider text-white sm:px-5 sm:text-xs hover:bg-neutral-800 transition-colors uppercase"
                        >
                            ENTRAR
                        </Link>
                    </header>

                    {/* ============ HERO ============ */}
                    <section className="relative mt-2 sm:mt-4">
                        <h1
                            className="select-none text-center leading-[0.78] tracking-tight text-black"
                            style={{
                                fontFamily: "'Anton', sans-serif",
                                fontSize: "clamp(3.2rem, 15vw, 11rem)",
                            }}
                        >
                            FAST
                        </h1>

                        {/* Overlay central: título/subtítulo + estatísticas, sobrepostos entre as duas linhas */}
                        <div className="relative z-10 mx-auto my-6 sm:-mt-4 sm:mb-[-0.6em] flex max-w-5xl flex-col items-center gap-6 px-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <div className="max-w-xs text-center sm:pt-2 sm:text-left">
                                <p className="text-[13px] font-bold leading-snug tracking-tight sm:text-sm">
                                    FAST MOTORS — MÉTODO CÉLERES
                                </p>
                                <p className="mt-2 text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                                    Multiplique seus ganhos, domine suas rotas e transforme cada corrida de entrega em lucro de verdade.
                                </p>
                            </div>

                            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-center sm:flex sm:flex-col sm:gap-2 sm:pt-1 sm:text-right">
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <dt className="text-base font-extrabold leading-none sm:text-lg">
                                            {stat.value}
                                        </dt>
                                        <dd className="mt-1 text-[10px] leading-tight text-neutral-500 sm:text-[11px]">
                                            {stat.label}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <h1
                            className="select-none text-center leading-[0.78] tracking-tight text-black"
                            style={{
                                fontFamily: "'Anton', sans-serif",
                                fontSize: "clamp(3.2rem, 15vw, 11rem)",
                            }}
                        >
                            MOTORS
                        </h1>
                    </section>

                    {/* ============ ABOUT ============ */}
                    <section className="mt-16 sm:mt-24">
                        <p className="text-[11px] tracking-wide text-neutral-400">[sobre o método]</p>

                        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
                            <p className="max-w-md text-lg font-medium leading-snug sm:text-xl">
                                Nossa missão é tirar o entregador da corrida dos ratos nos aplicativos de entrega, dando controle total sobre as rotas e multiplicando seus lucros reais no asfalto.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 bg-[#2b2b2b] p-5 sm:p-8 text-white">
                                <img
                                    src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=300&q=80"
                                    alt="Fundador do Fast Motors"
                                    className="h-16 w-16 flex-shrink-0 rounded-sm object-cover sm:h-20 sm:w-20"
                                />
                                <div>
                                    <p className="text-lg font-bold sm:text-xl">Acelere seus Resultados!</p>
                                    <p className="mt-1 text-xs leading-relaxed text-neutral-300 sm:text-sm">
                                        Um treinamento de logística e performance urbana, criado por especialistas que entendem a realidade das ruas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="mt-14 divide-y divide-neutral-200 border-t border-neutral-200 sm:mt-16">
                            {timeline.map((item) => (
                                <div
                                    key={item.index}
                                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[60px_180px_1fr] sm:items-baseline sm:gap-6 sm:py-6"
                                >
                                    <span className="text-xs text-neutral-400">{item.index}</span>
                                    <h3 className="text-sm font-extrabold tracking-tight sm:text-base">
                                        {item.title}
                                    </h3>
                                    <p className="max-w-md text-xs leading-relaxed text-neutral-500 sm:text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ============ FEATURED PROJECTS ============ */}
                    <section className="mt-20 pb-20 sm:mt-28">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start sm:gap-8">
                            <p className="text-[11px] tracking-wide text-neutral-400">
                                [conteúdo & bônus]
                            </p>
                            <p className="text-lg font-medium leading-snug sm:text-xl">
                                Entregamos todas as ferramentas que você precisa para gerenciar seus custos, dominar as ruas e maximizar seu faturamento diário.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                            {/* Formulário de Lead Capture */}
                            <div className="relative min-h-[340px] w-full bg-neutral-50 p-6 sm:row-span-2 sm:min-h-[560px] flex flex-col justify-center border border-neutral-100">
                                {success ? (
                                    <div className="text-center space-y-4">
                                        <div className="text-4xl animate-bounce">🚀</div>
                                        <h3 className="text-lg font-bold text-black uppercase tracking-wider">Cadastro Confirmado!</h3>
                                        <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                                            Seus dados foram salvos com sucesso. Em breve entraremos em contato com as instruções de acesso ao método Fast Motors.
                                        </p>
                                        <button 
                                            onClick={() => setSuccess(false)}
                                            className="mt-4 text-xs font-semibold text-neutral-400 hover:text-black transition-colors underline"
                                        >
                                            Cadastrar outro contato
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold uppercase tracking-wider text-black">Aproveite a oportunidade</h3>
                                            <p className="text-xs text-neutral-500 mt-1">Preencha seus dados para receber o conteúdo exclusivo do método.</p>
                                        </div>

                                        {errorMsg && (
                                            <p className="text-xs font-medium text-red-600 bg-red-50 p-3 border-l-2 border-red-600">
                                                {errorMsg}
                                            </p>
                                        )}

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Nome Completo</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Digite seu nome"
                                                    className="mt-1 w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">E-mail</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="seu@email.com"
                                                    className="mt-1 w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Telefone / Celular</label>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="(11) 99999-9999"
                                                    className="mt-1 w-full border-b border-black py-2 text-sm bg-transparent outline-none placeholder-neutral-300 focus:border-neutral-500 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={leadCapture.isPending}
                                            className="w-full bg-black py-3 text-xs font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase disabled:opacity-50"
                                        >
                                            {leadCapture.isPending ? "Cadastrando..." : "Quero faturar mais"}
                                        </button>
                                    </form>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:gap-5">
                                {/* Bônus: Planilha */}
                                <div className="relative min-h-[220px] w-full overflow-hidden bg-neutral-200 sm:min-h-[260px]">
                                    <img
                                        src={diagonalBuildingUrl}
                                        alt="Planilha de Lucro Real"
                                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 right-3 bg-[#2b2b2b]/90 px-4 py-3 text-white sm:bottom-4 sm:left-4 sm:right-4">
                                        <div className="flex items-center justify-between text-[11px] sm:text-xs">
                                            <span>Planilha de Custo Rodado inclusa</span>
                                            <span className="text-base leading-none">↗</span>
                                        </div>
                                        <p className="mt-1 text-sm font-bold sm:text-base">GRATUITO</p>
                                    </div>
                                </div>

                                {/* Bônus: Comunidade */}
                                <div className="relative w-full min-h-[160px] overflow-hidden bg-neutral-200 sm:ml-auto sm:max-w-[260px] sm:min-h-[190px]">
                                    <img
                                        src={libraryBuildingUrl}
                                        alt="Comunidade VIP no Telegram"
                                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-2 left-2 right-2 bg-[#2b2b2b]/90 px-3 py-2 text-white">
                                        <p className="text-[10px] leading-tight sm:text-[11px]">
                                            Acesso à Comunidade <br /> VIP de Entregadores
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Page;