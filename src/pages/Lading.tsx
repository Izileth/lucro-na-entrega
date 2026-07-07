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
    { value: "+R$ 1.500", label: "de lucro médio extra ao mês" },
    { value: "40%", label: "menos custos de manutenção" },
    { value: "+1.200", label: "entregadores faturando" },
    { value: "2X", label: "mais lucro por Km rodado" },
];

const benefits: TimelineItem[] = [
    {
        index: "[B-01]",
        title: "BENEFÍCIO EMOCIONAL: PARAR DE RODAR NO ESCURO",
        description:
            "Pare de rodar desesperado para bater metas diárias. Trabalhe com segurança e tranquilidade, sabendo exatamente onde e quando as corridas de alto valor acontecem.",
    },
    {
        index: "[B-02]",
        title: "BENEFÍCIO DIMENSIONAL: GANHO EXTRA DE R$ 1.500",
        description:
            "Aumente seu faturamento líquido mensal de forma mensurável e imediata aplicando técnicas de logística inteligente no asfalto.",
    },
    {
        index: "[B-03]",
        title: "BENEFÍCIO FUNCIONAL: CUSTO DE RODAGEM CONTROLADO",
        description:
            "Otimize suas rotas diárias, reduza o desgaste da sua moto e tenha acesso a uma ferramenta que calcula seu custo por quilômetro rodado de forma simples.",
    },
];

const audience: TimelineItem[] = [
    {
        index: "[A-01]",
        title: "MOTOBOYS EM TEMPO INTEGRAL",
        description: "Para quem vive do asfalto de segunda a sábado e quer otimizar suas horas de trabalho para aumentar a margem de lucro real.",
    },
    {
        index: "[A-02]",
        title: "ENTREGADORES DE FIM DE SEMANA",
        description: "Para quem busca uma renda extra eficiente nas horas de folga, aproveitando as taxas dinâmicas sem desperdiçar combustível.",
    },
    {
        index: "[A-03]",
        title: "INICIANTES NO DELIVERY",
        description: "Para quem está começando nas entregas e quer aprender as estratégias corretas desde o primeiro dia, evitando banimentos.",
    },
];

const steps: TimelineItem[] = [
    {
        index: "[S-01]",
        title: "1. CADASTRO & DIAGNÓSTICO",
        description: "Você faz seu cadastro e recebe nossa ferramenta exclusiva para calcular o custo real de rodagem da sua moto.",
    },
    {
        index: "[S-02]",
        title: "2. MAPEAMENTO DE ROTAS",
        description: "Aprenda a analisar os mapas das plataformas de entrega e prever as áreas de maior demanda e tarifas dinâmicas.",
    },
    {
        index: "[S-03]",
        title: "3. MULTIPLICAÇÃO DE GANHOS",
        description: "Aplique a estratégia de múltiplos aplicativos com segurança e multiplique seu lucro líquido por corrida.",
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

                    {/* ============ HERO (Pergunta 1) ============ */}
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
                                <a 
                                    href="#conversao"
                                    className="mt-4 inline-block bg-black px-4 py-2 text-[10px] font-bold tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase sm:text-[11px]"
                                >
                                    Quero Garantir Meu Acesso
                                </a>
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

                    {/* ============ WHAT IS IT (Pergunta 2) ============ */}
                    <section className="mt-16 sm:mt-24">
                        <p className="text-[11px] tracking-wide text-neutral-400">[o que é o método]</p>

                        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
                            <div className="max-w-md space-y-4">
                                <p className="text-lg font-medium leading-snug sm:text-xl">
                                    O Fast Motors é o único método passo a passo de logística e performance urbana projetado para motoboys e entregadores de aplicativos dominarem as rotas e multiplicarem seus lucros reais.
                                </p>
                                <p className="text-xs leading-relaxed text-neutral-500 sm:text-sm">
                                    Não se trata de trabalhar mais horas, mas sim de trabalhar de forma inteligente. Nós ensinamos as estratégias exatas para faturar mais rodando menos quilômetros.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 bg-[#2b2b2b] p-5 sm:p-8 text-white">
                                <img
                                    src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=300&q=80"
                                    alt="Fundador do Fast Motors"
                                    className="h-16 w-16 flex-shrink-0 rounded-sm object-cover sm:h-20 sm:w-20"
                                />
                                <div>
                                    <p className="text-lg font-bold sm:text-xl">Autoridade das Ruas</p>
                                    <p className="mt-1 text-xs leading-relaxed text-neutral-300 sm:text-sm">
                                        Desenvolvido por quem vive o dia a dia do asfalto, combinando logística urbana e testes de rua validados na prática.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ============ BENEFITS (Pergunta 3) ============ */}
                    <section className="mt-16 sm:mt-24">
                        <p className="text-[11px] tracking-wide text-neutral-400">[por que participar - benefícios]</p>
                        
                        <div className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
                            {benefits.map((item) => (
                                <div
                                    key={item.index}
                                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[60px_220px_1fr] sm:items-baseline sm:gap-6 sm:py-6"
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

                    {/* ============ AUDIENCE (Pergunta 4) ============ */}
                    <section className="mt-16 sm:mt-24">
                        <p className="text-[11px] tracking-wide text-neutral-400">[para quem é o método]</p>
                        
                        <div className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
                            {audience.map((item) => (
                                <div
                                    key={item.index}
                                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[60px_220px_1fr] sm:items-baseline sm:gap-6 sm:py-6"
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

                    {/* ============ HOW IT WORKS (Pergunta 5) ============ */}
                    <section className="mt-16 sm:mt-24">
                        <p className="text-[11px] tracking-wide text-neutral-400">[como funciona o método]</p>
                        
                        <div className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
                            {steps.map((item) => (
                                <div
                                    key={item.index}
                                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[60px_220px_1fr] sm:items-baseline sm:gap-6 sm:py-6"
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

                    {/* ============ WHY TRUST / CREDIBILITY (Pergunta 6) ============ */}
                    <section className="mt-16 sm:mt-24">
                        <p className="text-[11px] tracking-wide text-neutral-400">[por que você deve confiar]</p>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Prova */}
                            <div className="flex flex-col gap-4 bg-[#2b2b2b] p-6 text-white sm:p-8">
                                <p className="text-sm italic leading-relaxed text-neutral-300">
                                    "O método mudou meu jogo. Eu rodava 12 horas por dia pra fazer o que hoje faço em 6 horas rodando apenas nas áreas estratégicas. Valeu cada segundo."
                                </p>
                                <p className="text-xs font-bold uppercase tracking-wider">— Carlos S., Entregador em São Paulo (+R$ 1.800/mês de lucro extra)</p>
                            </div>

                            {/* Garantia */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 bg-neutral-50 p-5 sm:p-8 text-black border border-neutral-200">
                                <div className="text-3xl sm:text-4xl">🛡️</div>
                                <div>
                                    <p className="text-base font-bold uppercase tracking-wider">Garantia Incondicional de 7 Dias</p>
                                    <p className="mt-1 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                                        Risco zero. Experimente o método Fast Motors por 7 dias. Se você não notar diferença nos seus ganhos diários ou não ficar satisfeito, devolvemos todo o seu dinheiro.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ============ FINAL CTA / CONVERSION (Pergunta 7) ============ */}
                    <section id="conversao" className="mt-20 pb-20 sm:mt-28">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start sm:gap-8">
                            <p className="text-[11px] tracking-wide text-neutral-400">
                                [próximo passo - cadastro]
                            </p>
                            <p className="text-lg font-medium leading-snug sm:text-xl">
                                Preencha seus dados abaixo para receber acesso imediato às aulas práticas e começar a multiplicar seus ganhos hoje mesmo.
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