import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Play, Pause, Search, BookOpen, Cpu, Activity, Headphones, Menu, X, Clock, 
  Share2, MoreVertical, Lock, Plus, Save, LogOut, Trash2, FolderPlus,
  Calculator, FlaskConical, Globe, Palette, Code, Gavel, Microscope, Music, Atom, Briefcase,
  ChevronLeft, SkipBack, SkipForward, List,
  FileText, Video, Link as LinkIcon, Layers, ExternalLink, XCircle, BrainCircuit, GraduationCap, ChevronRight, ChevronDown, RotateCw,
  ZoomIn, ZoomOut, Move, Maximize, Image as ImageIcon, Eye, EyeOff, Shuffle, PlayCircle,
  Sparkles, Wand2, MessageSquare, Bot, Send, HelpCircle, FileLock, Grip, CheckCircle
} from 'lucide-react';

// --- CONFIGURAÇÃO ADMIN ---
const ADMIN_PIN = "1234"; 

// --- DADOS MOCK (BASE DE DADOS JSON) ---
const INITIAL_PODCASTS = [
  {
    "id": 407230011,
    "title": "Episódio 11: Arquitetura da Mente",
    "description": "Neste episódio, mergulhamos na arquitetura fascinante da mente humana. Exploramos como os neurónios comunicam e o papel das sinapses.",
    "sourceContent": `DOCUMENTO FONTE CONFIDENCIAL (SIMULAÇÃO)...`,
    "category": "anatomia",
    "duration": "13:13",
    "audioUrl": "https://ilopes18.github.io/UniCast/audios/Anatomia/Episódio_11__Arquitetura_da_Mente_Neurónios_e_Sinapses.m4a",
    "date": "27/11/2025",
    "mindmap": "# Sistema Nervoso (Estrutura e Funções)\n## Funções do Sistema Nervoso\n- Informação Sensorial (Receção de estímulos)\n- Integração (Processamento e decisão)\n- Homeostase (Equilíbrio interno)\n- Atividade Mental (Consciência, memória, pensamento)\n- Controlo de Músculos e Glândulas\n## Divisões do Sistema Nervoso\n### Sistema Nervoso Central (SNC)\n- Encéfalo\n- Medula Espinhal\n### Sistema Nervoso Periférico (SNP)\n- Divisão Sensorial (Aferente)\n  - Sentidos Somáticos\n  - Sentidos Especiais\n- Divisão Motora (Eferente)\n  - Sistema Nervoso Somático (Voluntário - Músculo Esquelético)\n  - Sistema Nervoso Autónomo (Involuntário)\n    - Simpático (Luta ou Fuga)\n    - Parassimpático (Repouso e Digestão)\n    - Entérico (Trato Gastrointestinal)\n## Células do Sistema Nervoso\n### Neurónios\n- Estrutura\n  - Corpo Celular (Soma)\n  - Dendritos (Receção)\n  - Axónio (Transmissão)\n- Classificação Funcional\n  - Sensoriais (Aferentes)\n  - Motores (Eferentes)\n  - Interneurónios (Associação)\n- Classificação Estrutural\n  - Multipolares\n  - Bipolares\n  - Pseudo-unipolares\n### Neuroglia (Células da Glia)\n- No SNC\n  - Astrócitos (Suporte e barreira)\n  - Oligodendrócitos (Formação de mielina)\n  - Microglia (Defesa imunitária)\n  - Células Ependimárias (Produção de LCR)\n- No SNP\n  - Células de Schwann (Mielina no SNP)\n  - Células Satélite (Suporte em gânglios)\n### Mielinização\n- Bainha de Mielina (Isolamento elétrico)\n- Nódulos de Ranvier (Condução rápida)\n## Sinais Elétricos\n### Canais Iónicos\n- Passivos (Vazamento)\n- Dependentes de Ligando (Químicos)\n- Dependentes de Voltagem (Elétricos)\n- Mecânicos\n### Potenciais de Membrana\n- Potencial de Repouso (-70 mV, Bomba Na+/K+)\n- Potencial Graduado (Local, variável)\n- Potencial de Ação (Impulso nervoso)\n  - Fases: Despolarização, Repolarização, Hiperpolarização\n  - Lei do \"Tudo ou Nada\"\n  - Períodos Refratários (Absoluto e Relativo)\n### Propagação do Impulso\n- Contínua (Axónios não mielinizados)\n- Saltatória (Axónios mielinizados - mais rápida)\n## Sinapses\n### Tipos de Sinapse\n- Elétricas (Gap junctions, bidirecional)\n- Químicas (Neurotransmissores, unidirecional)\n### Transmissão Sináptica\n- Libertação de Neurotransmissor (Entrada de Ca2+)\n- Ligação aos Recetores Pós-sinápticos\n- Remoção do Neurotransmissor\n  - Difusão\n  - Degradação Enzimática\n  - Recaptação\n### Integração Sináptica\n- PEPS (Potencial Excitatório Pós-Sináptico)\n- PIPS (Potencial Inibitório Pós-Sináptico)\n- Somação\n  - Espacial (Vários locais simultâneos)\n  - Temporal (Estímulos repetidos no tempo)\n## Reflexos\n### Características\n- Resposta rápida\n- Involuntária\n- Previsível\n### Arco Reflexo\n- Recetor Sensorial\n- Neurónio Sensorial (Aferente)\n- Centro de Integração (SNC)\n- Neurónio Motor (Eferente)\n- Efetor (Músculo ou Glândula)",
    "flashcards": [
       { "q": "Qual a função dos dendritos?", "a": "Receber estímulos." },
       { "q": "O que é uma sinapse?", "a": "Zona de comunicação entre neurónios." }
    ],
    // QUIZZES MÚLTIPLOS PARA TESTAR NAVEGAÇÃO
    "imageQuizzes": [
      {
        "id": "qz1",
        "title": "Neurónio Motor",
        "imageUrl": "https://ilopes18.github.io/UniCast/images/anatomia/cap11/neuroniomultipolar.png",
        "items": [
           { "label": "1", "hidden": "Dendrito", "x": 20, "y": 20 },
           { "label": "2", "hidden": "Corpo Celular", "x": 50, "y": 50 },
           { "label": "3", "hidden": "Axónio", "x": 80, "y": 80 }
        ]
      },
      {
        "id": "qz2",
        "title": "Sinapse Química",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chemical_synapse_schema_cropped.jpg/600px-Chemical_synapse_schema_cropped.jpg", // Imagem placeholder
        "items": [
           { "label": "1", "hidden": "Vesícula Sináptica", "x": 30, "y": 20 },
           { "label": "2", "hidden": "Fenda Sináptica", "x": 50, "y": 50 },
           { "label": "3", "hidden": "Receptor", "x": 50, "y": 80 }
        ]
      }
    ]
  }
];

const INITIAL_CATEGORIES = [
  { "id": "all", "name": "Todas as Cadeiras", "iconKey": null, "color": "gray" },
  { "id": "anatomia", "name": "Anatomia", "iconKey": "activity", "color": "green" },
  { "id": "circuitos2", "name": "Circuitos II", "iconKey": "cpu", "color": "blue" },
  { "id": "arqcomp", "name": "Arq. Computadores", "iconKey": "book", "color": "purple" }
];

const ICON_MAP = {
  'activity': <Activity size={18} />, 'cpu': <Cpu size={18} />, 'book': <BookOpen size={18} />,
  'calculator': <Calculator size={18} />, 'flask': <FlaskConical size={18} />, 'globe': <Globe size={18} />,
  'palette': <Palette size={18} />, 'code': <Code size={18} />, 'gavel': <Gavel size={18} />,
  'microscope': <Microscope size={18} />, 'music': <Music size={18} />, 'atom': <Atom size={18} />,
  'briefcase': <Briefcase size={18} />
};

const COLOR_VARIANTS = {
  red: { bg: 'bg-red-100', text: 'text-red-600', solid: 'bg-red-600', ring: 'ring-red-500', hover: 'hover:bg-red-50' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', solid: 'bg-blue-600', ring: 'ring-blue-500', hover: 'hover:bg-blue-50' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600', solid: 'bg-emerald-600', ring: 'ring-emerald-500', hover: 'hover:bg-emerald-50' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', solid: 'bg-purple-600', ring: 'ring-purple-500', hover: 'hover:bg-purple-50' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-600', solid: 'bg-gray-600', ring: 'ring-gray-500', hover: 'hover:bg-gray-50' },
};

// --- SIMULADOR DE IA ---
const mockAIResponse = async (context, query) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`[RESPOSTA IA GERADA COM BASE NO DOCUMENTO FONTE OCULTO]\n\nAnalisei o texto fonte privado. Sobre "${query}", o documento refere que a condução saltatória ocorre devido à bainha de mielina.`);
    }, 1500);
  });
};

const mockAutoDetectText = async (imageUrl) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { label: "Auto A", hidden: "Núcleo", x: 45, y: 45 },
        { label: "Auto B", hidden: "Membrana", x: 70, y: 20 },
      ]);
    }, 1500);
  });
};

// --- COMPONENTES PÚBLICOS (SEM API KEY) ---

// 1. VISUALIZADOR DE QUIZ (Com Drag & Drop para Admin e Navegação)
const ImageQuizViewer = ({ quizData, onClose, onNext, hasNext, isAdmin, onSaveUpdates }) => {
  const [revealed, setRevealed] = useState({});
  const [items, setItems] = useState(quizData.items || []);
  const [isDetecting, setIsDetecting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState(null);
  const containerRef = useRef(null);

  // Reset state when quizData changes (navigation)
  useEffect(() => { 
    setItems(quizData.items || []); 
    setRevealed({}); 
    setEditMode(false);
  }, [quizData]);

  const toggleReveal = (index) => { 
    if (editMode) return;
    setRevealed(prev => ({ ...prev, [index]: !prev[index] })); 
  };

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    const newItems = await mockAutoDetectText(quizData.imageUrl);
    setItems([...items, ...newItems]);
    setIsDetecting(false);
    alert("IA (Simulação): Detetei áreas de texto e adicionei ao JSON.");
  };

  const handleImageClick = (e) => {
    if (!editMode || !isAdmin || draggingIdx !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const text = prompt("Texto a esconder:");
    if (text) setItems([...items, { label: `${items.length + 1}`, hidden: text, x, y }]);
  };

  const handleMouseDown = (e, idx) => {
    if (!editMode) return;
    e.stopPropagation(); e.preventDefault();
    setDraggingIdx(idx);
  };

  const handleMouseMove = (e) => {
    if (draggingIdx === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    const newItems = [...items];
    newItems[draggingIdx] = { ...newItems[draggingIdx], x, y };
    setItems(newItems);
  };

  const handleMouseUp = () => setDraggingIdx(null);

  const handleSave = () => {
    if (onSaveUpdates) onSaveUpdates({ ...quizData, items });
    setEditMode(false);
    setDraggingIdx(null);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl flex flex-col md:flex-row overflow-hidden relative">
        {isAdmin && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur shadow-lg rounded-full px-4 py-2 flex gap-2">
            <button onClick={() => setEditMode(!editMode)} className={`px-3 py-1 rounded-full text-xs font-bold transition ${editMode ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{editMode ? 'Modo Editor' : 'Editar Quiz'}</button>
            {editMode && (
              <>
                <button onClick={handleAutoDetect} disabled={isDetecting} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 hover:bg-purple-200">{isDetecting ? <RotateCw className="animate-spin" size={12}/> : <Sparkles size={12}/>} Auto-Gerar</button>
                <button onClick={handleSave} className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 hover:bg-green-200">Guardar</button>
              </>
            )}
          </div>
        )}
        <div className="flex-1 bg-gray-100 relative overflow-hidden flex items-center justify-center cursor-crosshair" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          <div ref={containerRef} className="relative inline-block max-w-full max-h-full" onClick={handleImageClick}>
            <img src={quizData.imageUrl || "https://placehold.co/600x400/png?text=Imagem+Anatomia"} alt="Quiz" className="max-w-full max-h-[85vh] object-contain select-none pointer-events-none"/>
            {items.map((item, idx) => {
              if (item.x === undefined) return null;
              const isRevealed = revealed[idx];
              return (
                <div key={idx} onMouseDown={(e) => handleMouseDown(e, idx)} onClick={(e) => { e.stopPropagation(); toggleReveal(idx); }}
                  className={`absolute flex items-center justify-center transition-all duration-75 border-2 shadow-sm ${editMode ? 'bg-red-500/30 border-red-500 cursor-move' : (isRevealed ? 'bg-transparent border-green-400 cursor-pointer hover:scale-105' : 'bg-slate-900 border-white cursor-pointer hover:scale-105')} ${draggingIdx === idx ? 'scale-110 shadow-xl border-white z-50' : 'z-10'}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%`, width: 'clamp(80px, 15%, 150px)', height: 'clamp(30px, 8%, 60px)', transform: 'translate(-50%, -50%)' }}>
                  {editMode && <Grip size={12} className="text-white absolute top-1 left-1 opacity-50"/>}
                  {editMode && <span className="text-white text-xs font-bold drop-shadow-md select-none">{item.hidden}</span>}
                  {!editMode && !isRevealed && <span className="text-white font-bold text-sm select-none">?</span>}
                  {!editMode && isRevealed && <span className="text-green-600 bg-white/90 px-2 rounded text-xs font-bold shadow-sm select-none">{item.hidden}</span>}
                  {editMode && <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => {e.stopPropagation(); setItems(items.filter((_, i) => i !== idx))}} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-[10px] hover:bg-red-700 z-50">X</button>}
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-full md:w-80 bg-white border-l border-gray-200 flex flex-col z-10 shadow-xl">
           <div className="p-4 border-b flex justify-between items-center bg-gray-50"><h3 className="font-bold flex items-center text-sm"><ImageIcon className="mr-2 text-indigo-600" size={16}/> {quizData.title}</h3><button onClick={onClose}><X size={20} className="text-gray-400 hover:text-red-500"/></button></div>
           <div className="bg-blue-50 p-3 text-xs text-blue-700 border-b border-blue-100">{editMode ? "Modo Editor: Arrasta para mover." : "Modo Aluno: Clica para revelar."}</div>
           <div className="flex-1 overflow-y-auto p-4 space-y-2">{items.map((item, idx) => (<div key={idx} onClick={() => toggleReveal(idx)} className={`p-3 rounded-lg border text-sm cursor-pointer transition flex justify-between items-center ${revealed[idx] ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50 border-gray-200'}`}><div className="flex items-center gap-3"><span className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">{item.label}</span><span className={`font-medium ${revealed[idx] ? 'text-green-700' : 'text-gray-400 blur-sm select-none'}`}>{item.hidden}</span></div>{revealed[idx] ? <Eye size={14} className="text-green-500"/> : <EyeOff size={14} className="text-gray-400"/>}</div>))}</div>
           <div className="p-4 border-t bg-gray-50">
              {hasNext ? (
                <button onClick={onNext} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 flex items-center justify-center shadow-lg transform active:scale-95 transition-all">
                  Próxima Imagem <ChevronRight size={16} className="ml-1"/>
                </button>
              ) : (
                <div className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-bold text-sm text-center border border-green-200 flex items-center justify-center">
                  <CheckCircle size={16} className="mr-2"/> Chegaste ao Fim!
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

// 2. FLASHCARD VIEWER
const FlashcardViewer = ({ cards, onClose }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  
  const nextCard = () => { 
    setFlipped(false); 
    setTimeout(() => setIndex((prev) => (prev + 1) % cards.length), 150); 
  };

  const prevCard = () => { 
    setFlipped(false); 
    setTimeout(() => setIndex((prev) => (prev - 1 + cards.length) % cards.length), 150); 
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
       <div className="w-full max-w-xl h-80 relative perspective-1000 cursor-pointer group" onClick={() => setFlipped(!flipped)}>
          <button onClick={(e) => {e.stopPropagation(); onClose()}} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"><X size={24}/></button>
          
          <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
             {/* FRENTE DO CARTÃO */}
             <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Pergunta {index + 1}</span>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{cards[index].q}</h3>
                <p className="text-xs text-gray-400 font-medium">clica para ver a resposta</p>
             </div>
             
             {/* VERSO DO CARTÃO */}
             <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl rotate-y-180 text-white">
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-4">Resposta</span>
                <h3 className="text-xl font-medium leading-relaxed">{cards[index].a}</h3>
             </div>
          </div>

          {/* BARRA DE NAVEGAÇÃO */}
          <div className="absolute -bottom-20 w-full flex justify-between items-center text-white px-4" onClick={(e) => e.stopPropagation()}>
             <button onClick={prevCard} className="p-2 hover:bg-white/10 rounded-full transition">
                <ChevronLeft size={32}/>
             </button>
             
             <div className="font-bold text-lg tracking-widest bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
                {index + 1} de {cards.length}
             </div>
             
             <button onClick={nextCard} className="p-2 hover:bg-white/10 rounded-full transition">
                <ChevronRight size={32}/>
             </button>
          </div>
       </div>
       <style>{` .preserve-3d { transform-style: preserve-3d; } .rotate-y-180 { transform: rotateY(180deg); } .backface-hidden { backface-visibility: hidden; } `}</style>
    </div>
  );
};

// 3. MIND MAP SYSTEM (Restaurado)
const BRANCH_COLORS = [
  'border-blue-500 text-blue-700 bg-blue-50',
  'border-emerald-500 text-emerald-700 bg-emerald-50',
  'border-purple-500 text-purple-700 bg-purple-50',
  'border-orange-500 text-orange-700 bg-orange-50',
  'border-pink-500 text-pink-700 bg-pink-50',
  'border-cyan-500 text-cyan-700 bg-cyan-50',
];

const MindMapNode = ({ node, depth = 0, index = 0, colorClass = '' }) => {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  let myColorClass = colorClass;
  if (depth === 1) myColorClass = BRANCH_COLORS[index % BRANCH_COLORS.length];
  const baseStyle = depth === 0 
    ? "bg-gray-900 text-white border-gray-900 text-lg py-3 px-6 shadow-lg"
    : depth === 1
      ? `text-base font-bold py-2 px-4 border-l-4 shadow-sm ${myColorClass} bg-white`
      : "text-sm text-gray-700 border border-gray-200 bg-white py-1.5 px-3 hover:border-gray-400 shadow-sm";

  return (
    <div className="flex flex-col items-start relative select-none">
      <div className="flex items-center group py-1">
        {depth > 0 && <div className="w-6 h-px bg-gray-300 mr-1"></div>}
        <div onClick={() => hasChildren && setIsOpen(!isOpen)} className={`rounded-lg transition-all duration-200 flex items-center cursor-pointer relative z-10 ${baseStyle} ${hasChildren ? 'hover:scale-105' : ''}`}>
          {node.label}
          {hasChildren && <span className={`ml-2 p-0.5 rounded-full ${isOpen ? 'bg-black/10' : 'bg-transparent'}`}>{isOpen ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}</span>}
        </div>
        {hasChildren && isOpen && <div className="w-4 h-px bg-gray-300"></div>}
      </div>
      {hasChildren && isOpen && (
        <div className="flex flex-col ml-[calc(100%+2rem)] border-l border-gray-300 relative top-[-1.5rem]">
           <div className="absolute top-0 bottom-0 -left-px bg-gray-300 w-px"></div>
           <div className="flex flex-col space-y-1 py-1 pl-0">
             {node.children.map((child, idx) => (
               <div key={idx} className="relative flex items-center"><MindMapNode node={child} depth={depth + 1} index={idx} colorClass={myColorClass} /></div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

const parseMindMapText = (text) => {
  if (!text) return { label: "Vazio", children: [] };
  const lines = text.split('\n').filter(l => l.trim());
  const rootLine = lines.find(l => l.startsWith('# '));
  const root = { label: rootLine ? rootLine.replace('# ', '') : "Mapa Mental", children: [] };
  const stack = [{ node: root, level: 0 }];
  
  lines.forEach(line => {
    if (line === rootLine) return;
    let level = 0, label = '';
    
    // Suporte para Markdown (#, ##, ###) e Listas indentadas (- , -)
    if (line.startsWith('## ')) { level = 1; label = line.replace('## ', ''); } 
    else if (line.startsWith('### ')) { level = 2; label = line.replace('### ', ''); } 
    else if (line.trim().startsWith('-')) { 
        // Calcula nível baseado na indentação (2 espaços = +1 nível)
        const indentMatch = line.match(/^\s*/);
        const indentLen = indentMatch ? indentMatch[0].length : 0;
        level = 3 + Math.floor(indentLen / 2);
        label = line.trim().replace(/^-\s*/, '');
    } else { return; }
    
    if (level > 0) {
        while (stack.length > 1 && stack[stack.length - 1].level >= level) stack.pop();
        const newNode = { label, children: [] };
        if (stack.length > 0) { 
            stack[stack.length - 1].node.children.push(newNode); 
            stack.push({ node: newNode, level }); 
        }
    }
  });
  return root;
};

const MindMapViewer = ({ data, onClose }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => { isDragging.current = true; startPos.current = { x: e.clientX - transform.x, y: e.clientY - transform.y }; containerRef.current.style.cursor = 'grabbing'; };
  const handleMouseMove = (e) => { if (!isDragging.current) return; e.preventDefault(); setTransform(prev => ({ ...prev, x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y })); };
  const handleMouseUp = () => { isDragging.current = false; if(containerRef.current) containerRef.current.style.cursor = 'grab'; };
  const zoomIn = () => setTransform(prev => ({ ...prev, scale: Math.min(prev.scale + 0.2, 3) }));
  const zoomOut = () => setTransform(prev => ({ ...prev, scale: Math.max(prev.scale - 0.2, 0.2) }));
  const centerMap = () => setTransform({ x: 0, y: 0, scale: 1 });

  return (
    <div className="fixed inset-0 bg-slate-100 z-50 flex flex-col animate-in fade-in duration-300">
      <div className="bg-white p-4 shadow-md flex justify-between items-center z-50 relative">
         <h3 className="font-bold text-gray-800 flex items-center"><BrainCircuit className="mr-2 text-indigo-600"/> Mapa Mental Interativo</h3>
         <button onClick={onClose} className="bg-gray-100 hover:bg-red-100 hover:text-red-600 p-2 rounded-full transition"><X size={20}/></button>
      </div>
      <div ref={containerRef} className="flex-1 overflow-hidden cursor-grab bg-slate-50 relative flex items-center justify-center touch-none" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`, transformOrigin: 'center center', transition: isDragging.current ? 'none' : 'transform 0.2s ease-out', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}><MindMapNode node={data} /></div>
        <div className="absolute bottom-8 right-8 flex flex-col space-y-2 bg-white p-2 rounded-xl shadow-xl border border-gray-100"><button onClick={zoomIn} className="p-2 hover:bg-gray-100 rounded text-gray-600"><ZoomIn size={20}/></button><button onClick={centerMap} className="p-2 hover:bg-gray-100 rounded text-gray-600"><Maximize size={20}/></button><button onClick={zoomOut} className="p-2 hover:bg-gray-100 rounded text-gray-600"><ZoomOut size={20}/></button></div>
        <div className="absolute bottom-8 left-8 bg-white/80 p-3 rounded-lg text-xs text-gray-500 pointer-events-none backdrop-blur-sm"><p className="flex items-center"><Move size={12} className="mr-1"/> Arrasta para mover</p></div>
      </div>
    </div>
  );
};

// 4. CHAT BOT CONTEXTUAL
const ContextChat = ({ podcast, onClose, apiKey, openSettings }) => {
  const [messages, setMessages] = useState([{ role: 'system', content: `Olá! Tenho acesso ao documento fonte privado de "${podcast.title}".` }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!apiKey) { setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Preciso de uma API Key para ler o documento fonte." }]); return; }
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);
    try {
        const response = await mockAIResponse({ title: podcast.title, sourceContent: podcast.sourceContent || "N/A" }, userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (e) { setMessages(prev => [...prev, { role: 'assistant', content: "Erro." }]); } finally { setIsTyping(false); }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 animate-in slide-in-from-bottom-10">
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl flex justify-between items-center text-white">
        <div className="flex items-center gap-2"><Bot size={20} /><div><h3 className="font-bold text-sm">Chat Fonte</h3><p className="text-[10px] opacity-80 flex items-center"><FileLock size={10} className="mr-1"/> Privado</p></div></div><button onClick={onClose} className="hover:bg-white/20 p-1 rounded"><X size={16}/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50" ref={scrollRef}>
        {!apiKey && (<div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-800 mb-4"><p className="font-bold mb-1">API Key Necessária</p><button onClick={openSettings} className="bg-yellow-600 text-white px-3 py-1 rounded font-bold">Configurar</button></div>)}
        {messages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'}`}>{msg.content}</div></div>))}
        {isTyping && <div className="text-xs text-gray-400 ml-4 animate-pulse">A ler fonte...</div>}
      </div>
      <div className="p-3 bg-white border-t flex gap-2"><input className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder={apiKey ? "Pergunta..." : "Configura Key"} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} disabled={!apiKey}/><button onClick={handleSend} disabled={!apiKey} className={`p-2.5 rounded-full shadow-sm transition ${apiKey ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400'}`}><Send size={16} /></button></div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function UniCastAI() {
  const [podcasts, setPodcasts] = useState(INITIAL_PODCASTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [view, setView] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  
  // Estado de Autenticação / Configuração
  const [isAdmin, setIsAdmin] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');
  
  // Modais e Views
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showMindMap, setShowMindMap] = useState(false);
  
  // -- LÓGICA DE QUIZ (NOVO) --
  const [showQuizMenu, setShowQuizMenu] = useState(false); // Menu inicial
  const [quizQueue, setQuizQueue] = useState([]); // Lista de quizzes para mostrar
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Índice atual na fila
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Quiz atual renderizado

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // -- FUNÇÕES DE NAVEGAÇÃO QUIZ --
  
  // Modo Aleatório: Baralha e começa
  const startRandomMode = () => {
    if (!selectedPodcast.imageQuizzes) return;
    const shuffled = [...selectedPodcast.imageQuizzes].sort(() => Math.random() - 0.5);
    setQuizQueue(shuffled);
    setCurrentQuizIndex(0);
    setSelectedQuiz(shuffled[0]);
    setShowQuizMenu(false);
  };

  // Modo Individual: Segue a ordem original a partir do escolhido
  const startSequentialMode = (startIndex) => {
    if (!selectedPodcast.imageQuizzes) return;
    setQuizQueue(selectedPodcast.imageQuizzes);
    setCurrentQuizIndex(startIndex);
    setSelectedQuiz(selectedPodcast.imageQuizzes[startIndex]);
    setShowQuizMenu(false);
  };

  const handleNextQuiz = () => {
    const nextIndex = currentQuizIndex + 1;
    if (nextIndex < quizQueue.length) {
      setCurrentQuizIndex(nextIndex);
      setSelectedQuiz(quizQueue[nextIndex]);
    } else {
      // Opcional: Lidar com o fim do quiz se necessário, mas o Viewer já mostra a msg final
    }
  };

  const closeQuiz = () => {
    setSelectedQuiz(null);
    setQuizQueue([]);
    setCurrentQuizIndex(0);
  };

  // Handlers
  const handleSaveKey = (key) => { setApiKey(key); localStorage.setItem('gemini_key', key); setShowSettings(false); };
  const handleLogin = () => { if (pinInput === ADMIN_PIN) { setIsAdmin(true); setShowLoginModal(false); setPinInput(""); } else alert("Pin incorreto!"); };
  const handlePlayPodcast = (podcast) => { if (currentTrack?.id === podcast.id) { setIsPlaying(!isPlaying); } else { setCurrentTrack(podcast); setIsPlaying(true); } };
  const getCatColor = (catId) => { const cat = categories.find(c => c.id === catId); return COLOR_VARIANTS[cat?.color] || COLOR_VARIANTS['gray']; };
  const renderIcon = (key) => ICON_MAP[key] || <BookOpen size={18} />;
  const filteredPodcasts = useMemo(() => { return podcasts.filter(p => activeCategory === 'all' || p.category === activeCategory); }, [podcasts, activeCategory]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* SIDEBAR (Menu Principal) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-full z-20">
        <div className="p-6 flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-indigo-600 p-2 rounded-lg"><Headphones className="text-white w-6 h-6" /></div>
          <span className="text-xl font-bold tracking-tight text-indigo-900">UniCast AI</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
           <button onClick={() => { setView('home'); setActiveCategory('all'); }} className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mb-4 ${activeCategory === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <List size={18} className="mr-3"/> Biblioteca
           </button>
           
           <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Cadeiras</div>
           {categories.filter(c => c.id !== 'all').map(cat => (
               <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setView('home'); }} className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${activeCategory === cat.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <span className="mr-3 text-gray-400">{renderIcon(cat.iconKey)}</span>
                   {cat.name}
               </button>
           ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
            <button onClick={() => setShowSettings(true)} className={`flex items-center text-xs w-full px-2 py-1 rounded ${apiKey ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'}`}>
                <Bot size={14} className="mr-2"/> {apiKey ? "IA Pronta (Key Salva)" : "Configurar IA (Opcional)"}
            </button>
            {!isAdmin ? 
                <button onClick={() => setShowLoginModal(true)} className="flex items-center text-xs text-gray-500 hover:text-indigo-600 w-full px-2 py-1">
                    <Lock size={14} className="mr-2"/> Área Professor
                </button> 
                : 
                <button onClick={() => setIsAdmin(false)} className="flex items-center text-xs text-red-500 hover:text-red-700 w-full px-2 py-1">
                    <LogOut size={14} className="mr-2"/> Sair Admin
                </button>
            }
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:hidden z-20">
            <div className="flex items-center space-x-2"><Headphones className="text-indigo-600"/> <span className="font-bold">UniCast AI</span></div>
            <Menu className="text-gray-600" />
        </header>

        {/* Conteúdo Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto">
            
            {/* VIEW: HOME (Lista de Episódios) */}
            {view === 'home' && (
              <>
                 <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{categories.find(c => c.id === activeCategory)?.name}</h1>
                    <p className="text-gray-500 mt-1">Materiais públicos disponíveis gratuitamente. IA disponível para documentos privados.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPodcasts.map(podcast => {
                        const catColor = getCatColor(podcast.category);
                        return (
                            <div key={podcast.id} onClick={() => { setSelectedPodcast(podcast); setView('details'); window.scrollTo(0,0); }} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col">
                                <div className="p-5 flex-1">
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${catColor.bg} ${catColor.text}`}>{podcast.category}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mt-3 group-hover:text-indigo-600 transition">{podcast.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{podcast.description}</p>
                                </div>
                                <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center rounded-b-2xl">
                                    <span className="text-xs text-gray-400 font-mono flex items-center"><Clock size={12} className="mr-1"/> {podcast.duration}</span>
                                    <button onClick={(e) => {e.stopPropagation(); handlePlayPodcast(podcast)}} className={`w-8 h-8 rounded-full flex items-center justify-center ${currentTrack?.id === podcast.id && isPlaying ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}>
                                        {currentTrack?.id === podcast.id && isPlaying ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor" className="ml-0.5"/>}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                 </div>
              </>
            )}

            {/* VIEW: DETALHES DO EPISÓDIO */}
            {view === 'details' && selectedPodcast && (
               <div className="animate-in slide-in-from-right duration-300 pb-32">
                  <button onClick={() => setView('home')} className="mb-6 flex items-center text-sm text-gray-500 hover:text-indigo-600"><ChevronLeft size={16}/> Voltar</button>
                  
                  <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-6">
                      <div className="flex flex-col md:flex-row gap-8">
                          <div className={`w-full md:w-48 h-48 rounded-2xl flex items-center justify-center shadow-inner ${getCatColor(selectedPodcast.category).bg} ${getCatColor(selectedPodcast.category).text}`}>
                              {renderIcon(categories.find(c => c.id === selectedPodcast.category)?.iconKey)}
                          </div>
                          <div className="flex-1">
                              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPodcast.title}</h1>
                              <p className="text-gray-600 leading-relaxed mb-6">{selectedPodcast.description}</p>
                              
                              <div className="flex flex-wrap gap-3">
                                  {/* Botão Áudio (PÚBLICO) */}
                                  <button onClick={() => handlePlayPodcast(selectedPodcast)} className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition flex items-center shadow-lg shadow-indigo-200">
                                      {currentTrack?.id === selectedPodcast.id && isPlaying ? <Pause fill="currentColor" className="mr-2"/> : <Play fill="currentColor" className="mr-2"/>}
                                      {currentTrack?.id === selectedPodcast.id && isPlaying ? "Pausar" : "Ouvir"}
                                  </button>

                                  {/* Botão Chat AI (REQUER KEY) */}
                                  <button onClick={() => setShowChat(!showChat)} className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition flex items-center">
                                      <Bot className={`mr-2 ${apiKey ? 'text-green-600' : 'text-gray-400'}`} size={18}/> 
                                      {apiKey ? "Chat com Doc. Fonte" : "Chat (Configurar)"}
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Secção de Recursos (PÚBLICOS - NÃO PRECISAM DE KEY) */}
                      <div className="mt-10 pt-8 border-t border-gray-100">
                          <h3 className="font-bold text-gray-900 mb-4 flex items-center text-sm uppercase tracking-wider text-gray-500">Recursos Públicos</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              
                              {/* Quizzes Visuais (ABRE MENU DE SELEÇÃO) */}
                              {selectedPodcast.imageQuizzes?.length > 0 && (
                                  <button onClick={() => setShowQuizMenu(true)} className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition text-left group relative overflow-hidden">
                                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20"><ImageIcon size={40} className="text-indigo-600"/></div>
                                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Quiz Visual</span>
                                      <h4 className="font-bold text-gray-800 mt-1">Treino Visual</h4>
                                      <p className="text-xs text-gray-500 mt-2">{selectedPodcast.imageQuizzes.length} imagens disponíveis</p>
                                  </button>
                              )}
                              
                              {/* Flashcards */}
                              {selectedPodcast.flashcards && (
                                <button onClick={() => setShowFlashcards(true)} className="p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition text-left group relative overflow-hidden">
                                   <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20"><RotateCw size={40} className="text-orange-600"/></div>
                                   <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Flashcards</span>
                                   <h4 className="font-bold text-gray-800 mt-1">Revisão Rápida</h4>
                                   <p className="text-xs text-gray-500 mt-2">{selectedPodcast.flashcards.length} cartas</p>
                                </button>
                              )}
                              
                              {/* Mapa Mental */}
                              {selectedPodcast.mindmap && (
                                <button onClick={() => setShowMindMap(true)} className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition text-left group relative overflow-hidden">
                                   <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20"><BrainCircuit size={40} className="text-emerald-600"/></div><span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Mapa Mental</span><h4 className="font-bold text-gray-800 mt-1">Resumo Estruturado</h4><p className="text-xs text-gray-500 mt-2">Visualizar tópicos</p>
                                </button>
                              )}
                          </div>
                      </div>
                  </div>
               </div>
            )}
            
          </div>
        </main>
        
        {/* --- MODAIS DE RECURSOS --- */}

        {/* 1. MENU DE SELEÇÃO DE QUIZ */}
        {showQuizMenu && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden transform transition-all scale-100">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-800 flex items-center"><ImageIcon className="mr-2 text-indigo-600" size={18}/> Quiz Visual</h3>
                        <button onClick={() => setShowQuizMenu(false)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        {/* MODO ALEATÓRIO (PRINCIPAL) */}
                        <button onClick={startRandomMode} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-200 transform transition active:scale-95">
                            <Shuffle size={20} className="mr-2"/> Modo Aleatório
                        </button>
                        
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold tracking-wider">Ou Escolhe</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {/* LISTA INDIVIDUAL */}
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                            {selectedPodcast.imageQuizzes.map((quiz, idx) => (
                                <button key={quiz.id} onClick={() => startSequentialMode(idx)} className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition flex items-center group">
                                    <div className="w-8 h-8 rounded bg-gray-100 group-hover:bg-white flex items-center justify-center mr-3 text-gray-500 font-bold text-xs shadow-sm">{idx + 1}</div>
                                    <span className="text-sm font-medium text-gray-700">{quiz.title || `Imagem ${idx+1}`}</span>
                                    <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-indigo-400"/>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* 2. QUIZ VISUAL VIEWER */}
        {selectedQuiz && (
            <ImageQuizViewer 
                quizData={selectedQuiz} 
                onClose={closeQuiz} 
                isAdmin={isAdmin}
                hasNext={currentQuizIndex < quizQueue.length - 1} // Verifica se há mais na fila
                onNext={handleNextQuiz} // Avança na fila
                onSaveUpdates={(updatedQuiz) => {
                    const updatedPodcasts = podcasts.map(p => {
                        if(p.id !== selectedPodcast.id) return p;
                        return { ...p, imageQuizzes: p.imageQuizzes.map(q => q.id === updatedQuiz.id ? updatedQuiz : q) }
                    });
                    setPodcasts(updatedPodcasts);
                    setSelectedPodcast(updatedPodcasts.find(p => p.id === selectedPodcast.id));
                }}
            />
        )}

        {/* 3. FLASHCARDS */}
        {showFlashcards && selectedPodcast?.flashcards && (
            <FlashcardViewer cards={selectedPodcast.flashcards} onClose={() => setShowFlashcards(false)} />
        )}

        {/* 4. MAPA MENTAL */}
        {showMindMap && selectedPodcast?.mindmap && (
            <MindMapViewer data={parseMindMapText(selectedPodcast.mindmap)} onClose={() => setShowMindMap(false)} />
        )}

        {/* 5. CHAT AI */}
        {showChat && selectedPodcast && (
            <ContextChat 
                podcast={selectedPodcast} 
                onClose={() => setShowChat(false)} 
                apiKey={apiKey}
                openSettings={() => { setShowChat(false); setShowSettings(true); }}
            />
        )}

        {/* 6. MODAL LOGIN ADMIN */}
        {showLoginModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
               <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
                   <h3 className="text-lg font-bold mb-4">Área Professor</h3>
                   <input type="password" placeholder="PIN (1234)" className="w-full border p-2 rounded mb-4" value={pinInput} onChange={(e) => setPinInput(e.target.value)}/>
                   <div className="flex justify-end space-x-2">
                       <button onClick={() => setShowLoginModal(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancelar</button>
                       <button onClick={handleLogin} className="px-4 py-2 bg-indigo-600 text-white rounded font-medium">Entrar</button>
                   </div>
               </div>
            </div>
        )}

        {/* 7. DEFINIÇÕES AI */}
        {showSettings && (
             <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-2 flex items-center"><Bot className="mr-2"/> Configurar IA</h3>
                    <p className="text-sm text-gray-500 mb-4">A API Key é necessária <strong>apenas</strong> para o Chat com documentos privados. O Áudio e Quizzes funcionam sem ela.</p>
                    
                    <button onClick={() => setShowTutorial(!showTutorial)} className="text-indigo-600 text-xs font-bold flex items-center mb-4 hover:underline">
                        <HelpCircle size={12} className="mr-1"/> {showTutorial ? "Esconder Tutorial" : "Como obter uma chave (Grátis)?"}
                    </button>

                    {showTutorial && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-xs space-y-2 text-gray-600">
                            <ol className="list-decimal pl-4 space-y-1">
                                <li>Vai ao <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-bold">Google AI Studio</a>.</li>
                                <li>Clica em <strong>"Create API key"</strong>.</li>
                                <li>Copia a chave e cola-a abaixo.</li>
                            </ol>
                        </div>
                    )}
                    
                    <input type="password" placeholder="AIzaSy..." className="w-full border p-2 rounded mt-1 mb-4 font-mono text-sm" defaultValue={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancelar</button>
                        <button onClick={() => handleSaveKey(apiKey)} className="px-4 py-2 bg-indigo-600 text-white rounded font-medium">Guardar</button>
                    </div>
                </div>
             </div>
        )}

      </div>
    </div>
  );
}