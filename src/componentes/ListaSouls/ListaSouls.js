import "./ListaSouls.css";
import Jogos from "../../Hooks/Jogos";
import React, { useRef, useState } from "react";
import { bosses } from "../../Hooks/Bosss";
import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import "./Formulario.css";
import html2canvas from "html2canvas";
import { DndContext,pointerWithin,PointerSensor,useSensor, useSensors, useDroppable, DragOverlay } from "@dnd-kit/core";
import { SortableContext,useSortable,verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";


export default function ListaSouls() {
  const publicUrl = process.env.PUBLIC_URL;
  const tierListRef = useRef(null);
  const [imagemGerada, setImagemGerada] = useState(null);
  const [mostrarOverlay, setMostrarOverlay] = useState(false);

  const gerarImagem = async () => {
    const canvas = await html2canvas(tierListRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const imagemURL = canvas.toDataURL("image/png");
    setImagemGerada(imagemURL);
    setMostrarOverlay(true);
  };

  const [jogo, setJogo] = useState('null');
  const [boss, setBoss] = useState("null");
  const [S, setS] = useState("S");
  const [A, setA] = useState("A");
  const [B, setB] = useState("B");
  const [C, setC] = useState("C");
  const [D, setD] = useState("D");
  const [E, setE] = useState("E");
  const [texto, setTexto] = useState("Salvar");
  const [disabled, setDisable] = useState(true);
  const [listaRanqueados, setListaRanqueados] = useState([]);
  const aoSalvar = (evento) => {
    evento.preventDefault();

    setTexto(disabled ? "Salvar" : "Editar");
    setDisable(!disabled);
  };
  const config = [S, A, B, C, D, E];
  const [bossfight, setBf] = useState("");
  const [bossDesign, setBd] = useState("");
  const [cenario, setCenario] = useState("");
  const [lore, setLore] = useState("");
  const [trilhaSonora, setTrilhaSonora] = useState("");
  const [volume, setVolume] = useState(1); 
  const listaConfig = [
    {
      ranked: S,
      nota: 6,
    },
    {
      ranked: A,
      nota: 5,
    },
    {
      ranked: B,
      nota: 4,
    },
    {
      ranked: C,
      nota: 3,
    },
    {
      ranked: D,
      nota: 2,
    },
    {
      ranked: E,
      nota: 1,
    },
  ];
  //validacao quando nao encotrar o jogo no meu objeto(select)
  const listaDeBoss =
    Object.keys(bosses).filter((item) => {
      return item === jogo;
    }).length > 0
      ? bosses[jogo]
      : [];
  // 'bosses[jogo]' caminho da minha array '[jogo]' é a variavel
  const descBoss = (boss) => {
    const chefe = listaDeBoss.find((chefe) => chefe.nome === boss);
    return chefe ? chefe.descricao : "";
  };
  const descricao = descBoss(boss);
  const imagem = `${publicUrl}/imagens/${jogo}/${boss}.jpg`;
  
  const [mensagem, setMensagem] = useState("");


  const aoRanquear = (event) => {
    event.preventDefault();
    const categoriaEncontrada = listaConfig.find((cat) => cat.nota === media);


    const categoriaRank = categoriaEncontrada?.ranked || "Não encontrada";
    setListaRanqueados((valorAnterior) => {
      const jaRanqueado  = valorAnterior.some((item) => item.boss === boss);
      if (jaRanqueado) {
        setMensagem("Este boss já foi ranqueado!");
        setTimeout(() => {
        setMensagem("");
      }, 1300);
        return valorAnterior;
      }
      return [...valorAnterior, { imagem, boss, media, categoria: categoriaRank, }];
    });
  };

  const categoria = listaRanqueados.reduce((acc, currCategoria) => {
    const { categoria } = currCategoria;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(currCategoria);
    return acc;
  }, {});
  
Object.entries(categoria).forEach(([rank, bosses]) => {
  console.log(`Categoria ${rank}:`, bosses.map((b) => b.boss).join(", "));
});

  const numb = [
    listaConfig.find((list) => list.ranked === bossfight)?.nota ?? 0,

    listaConfig.find((list) => list.ranked === bossDesign)?.nota ?? 0,

    listaConfig.find((list) => list.ranked === cenario)?.nota ?? 0,

    listaConfig.find((list) => list.ranked === lore)?.nota ?? 0,
    listaConfig.find((list) => list.ranked === trilhaSonora)?.nota ?? 0,
  ].filter((nota) => nota > 0);
  const totalNotasValidas = numb.length > 0 ? numb.length : 1;
  const media = Math.round (
    numb.reduce((acc, val) => acc + val, 0) / totalNotasValidas
  );

  //music
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      debugger;
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  //end music

  const  corBordaPorJogo = {
  "DarkSouls1": "#7D5C48",
  "DarkSouls2": "#7D5C48",
  "DarkSouls3": "#7D5C48",
  "Bloodborn": "#bcbcbc",
  "Sekiro": "#A74B28",  
  "EldenRing": "#C5A76A",
  "DemonsSouls": "#bcbcbc",
}
const corBorda = corBordaPorJogo[jogo] || "#7D5C48";


//------------------- RankDroppable Component ------------------// 

function RankDroppable({ rankId, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `rank-${rankId}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="ranked-container"
      style={{
        minHeight: 70,
        border: isOver ? "2px dashed #aaa" : "2px dashed transparent",
        transition: "0.2s",
      }}
    >
      {children}
    </div>
  );
}
const [activeBoss, setActiveBoss] = useState(null);
const [hover, setHover] = useState(false);

function SortableItem({ id, imagem, boss }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={imagem} alt="Imagem do boss" style={{ width: 120, height: 120 , objectFit: "cover",}} />
      <p>{boss}</p>
    </div>
  );
}

function BossOverlay({ imagem, boss }) {
  return (
    <div
      style={{
        pointerEvents: "none",
        cursor: "grabbing",
      }}
    >
      <img
        src={imagem} alt="imagem do boss"
        style={{ width: 120, height: 120, objectFit: "cover" }}
      />
      <p>{boss}</p>
    </div>
  );
}
const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  })
);

  return (
    <div>
      <div className="backgroundimagem">
      <div className="paraOFundo">
        <div className="paraOFundo_container">
          <section className="formulario">
            <form onSubmit={aoSalvar}
            style={{borderColor: corBorda}}
            >
              <h2>Configure sua lista:</h2>
              <ul className="container__campotexto0">
                <li className="container__campotexto">
                  <CampoTexto
                    obrigadotorio={true}
                    label="S"
                    placeholder="Defina o nome"
                    valor={S}
                    disabled={disabled}
                    aoAlterado={(valor) => setS(valor)}
                  />
                  <CampoTexto
                    obrigadotorio={true}
                    label="A"
                    placeholder="Defina o nome"
                    valor={A}
                    disabled={disabled}
                    aoAlterado={(valor) => setA(valor)}
                  />
                  <CampoTexto
                    label="B"
                    placeholder="Defina o nome"
                    valor={B}
                    disabled={disabled}
                    aoAlterado={(valor) => setB(valor)}
                  />
                </li>
                <li className="container__campotexto2">
                  <CampoTexto
                    label="C"
                    placeholder="Defina o nome"
                    valor={C}
                    disabled={disabled}
                    aoAlterado={(valor) => setC(valor)}
                  />
                  <CampoTexto
                    label="D"
                    placeholder="Defina o nome"
                    valor={D}
                    disabled={disabled}
                    aoAlterado={(valor) => setD(valor)}
                  />
                  <CampoTexto
                    label="E"
                    placeholder="Defina o nome"
                    valor={E}
                    disabled={disabled}
                    aoAlterado={(valor) => setE(valor)}
                  />
                </li>
              </ul>
              <div className="container__botao">
                <Botao texto={disabled ? "Editar" : "Salvar"}style={{backgroundColor: corBorda}}>{texto}</Botao>
              </div>
            </form>
          </section>

          <section className="lista-souls">
            <div className="listaSouls__borda"
            >
              <form className="lista-souls-lista"
              style={{borderColor: corBorda}}>
                <div className="lista-souls_titulo">
                  <h3 >
                    Escolhe seu jogo souls:
                    <select
                    style={{backgroundColor: corBorda}}
                      name="Jogos"
                      value={jogo}
                      onChange={(e) => {
                        setJogo(e.target.value);
                        setBoss('null');
                      }}
                    >
                      <option value="null" disabled >
                        Selecione o jogo
                      </option>
                      {Jogos.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </h3>
                  <h3>
                    Boss:
                    <select
                    style={{backgroundColor: corBorda}}
                      name="boss"
                      value={boss}
                      onChange={(e) => {
                        setBoss('null');
                        setBoss(e.target.value) 
                        setBf(""); 
                        setBd("");
                        setCenario("");
                        setLore("");
                        setTrilhaSonora("");
                      }}
                    >
                      <option value={'null'} disabled>
                        Selecione o boss
                      </option>

                      {listaDeBoss.map((item) => (
                        <option value={item.nome} key={item.nome}>
                          {item.nome}
                        </option>
                      ))}
                    </select>
                  </h3>
                </div>

                <h3>
                  Boss Fight
                  <select
                  style={{backgroundColor: corBorda}}
                    name="BF"
                    value={bossfight}
                    onChange={(e) => {
                      setBf(e.target.value);                    
                    }}
                  >
                    <option value="" disabled>
                      Ranked
                    </option>
                    {config.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </h3>

                <h3>
                  Boss Design{" "}
                  <select
                  style={{backgroundColor: corBorda}}
                    name="BD"
                    value={bossDesign}
                    onChange={(e) => {
                      setBd(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Ranked
                    </option>
                    {config.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </h3>
                <h3>
                  Cenário{" "}
                  <select
                  style={{backgroundColor: corBorda}}
                    name="scene"
                    value={cenario}
                    onChange={(e) => {
                      setCenario(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Ranked
                    </option>
                    {config.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </h3>
                <h3>
                  Lore{" "}
                  <select
                  style={{backgroundColor: corBorda}}
                    name="lore"
                    value={lore}
                    onChange={(e) => {
                      setLore(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Ranked
                    </option>
                    {config.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </h3>
                <h3>
                  Trilha Sonora
                  <select
                  style={{backgroundColor: corBorda}}
                    name="Trilha"
                    value={trilhaSonora}
                    onChange={(e) => {
                      setTrilhaSonora(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Ranked
                    </option>
                    {config.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </h3>

                <div className="player">
                  <audio
                    ref={audioRef}
                    // controls
                    src={`${publicUrl}/music/${boss}.mp3`}
                    type="audio/mp3"
                    onLoadedMetadata={onLoadedMetadata}
                    onTimeUpdate={onTimeUpdate}
                  ></audio>

                  <div className="controls">
                    <button type="button" onClick={togglePlayPause} >
                      {isPlaying ? (
                        <i className="bx bx-pause"
                        style={{backgroundColor: corBorda}}></i>
                      ) : (
                        <i className="bx bx-caret-right"
                        style={{backgroundColor: corBorda}}></i>
                      )}
                    </button>
                  </div>
                  <div className="footer">
                    <div className="progress-bar"
                    style={{backgroundColor: corBorda}}>
                      <div
                        className="progress"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                      <input className="input"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => {
                          const newVolume = parseFloat(e.target.value);
                          setVolume(newVolume);
                          audioRef.current.volume = newVolume;
                          
                        }}
                        style={{ "--corThumb": corBorda }}
                        />
                    </div>
                  </div>
                </div>

                <div className="container__botao">
                  <Botao
                  style={{backgroundColor: corBorda}}
                    texto="Ranquear"
                    type="submit"
                    onClick={(e) => {
                      aoRanquear(e);
                    }}
                  ></Botao>
                   {mensagem && <p className="mensagem-boss-duplicado" style={{backgroundColor: corBorda}}>{mensagem}</p>}
                </div>
              </form>
            </div>

            <div className="container__imagemEdescricao "
            style={{    
              Width: "32%",
              height: "30.385em",
              alignItems: "center",
              borderRadius: "4px",
              backgroundImage: `url('${publicUrl}/imagens/${jogo || 'null'}.png'), radial-gradient(#000000, #00000081)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto",
              padding: "36px",
              color: "white",
            }}

            >
              <img
                src={`${publicUrl}/imagens/${jogo}/${boss}.jpg`}
                alt="BossName"
                style={{
                  width: "20.5em",
                  height: "18.44em",
                  objectFit: "cover",
                  borderStyle: "ridge",
                  borderColor: corBorda,
                }}
              />
              <h4>
                {boss !== "null" ? boss : ""}
              </h4>
              <p>{descricao}</p>
            </div>
          </section>
        </div>
      </div>

      <p className="linha"></p>
     
      <section className="ranked">
        
        <DndContext
        
        sensors={sensors}
        collisionDetection={pointerWithin}

  onDragStart={({ active }) => {
    const [, bossId] = active.id.split("-");
    const boss = listaRanqueados.find(b => b.boss === bossId);
    setActiveBoss(boss || null);
  }}

  onDragEnd={({ active, over }) => {
  setActiveBoss(null);
  if (!over) return;

  const [fromRank, bossId] = active.id.split("-");
  const toRank = over.id.replace("rank-", "");

  if (fromRank === toRank) return;

  setListaRanqueados((prev) =>
    prev.map((b) =>
      b.boss === bossId ? { ...b, categoria: toRank } : b
    )
  );
}}

  onDragCancel={() => setActiveBoss(null)} 
>
  

    <div ref={tierListRef} className="ranked_container">
      {listaConfig.map(({ ranked }) => (
        <div key={ranked} >
          <h3>Rank - {ranked}</h3>
          <SortableContext
          items={categoria[ranked]?.map(item => `${ranked}-${item.boss}`) ?? []}
          strategy={verticalListSortingStrategy}
          >
           <RankDroppable rankId={ranked}>
              {categoria[ranked]?.length === 0 && (
              <p style={{ opacity: 0.5 }}>Solte o boss aqui</p>
              )}

              {categoria[ranked]?.map((item) => (
              <SortableItem
              key={`${ranked}-${item.boss}`}
              id={`${ranked}-${item.boss}`}
              imagem={item.imagem}
              boss={item.boss}
              style={{ margin:0 }}
              />
              ))}
              </RankDroppable>
          </SortableContext>
   
        </div>
      ))}
    </div>
          <DragOverlay>
        {activeBoss ? (
          <BossOverlay
            imagem={activeBoss.imagem}
            boss={activeBoss.boss}
          />
        ) : null}
      </DragOverlay>
</DndContext>
    
         
  {listaRanqueados.length > 0 && (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
      className="gerar-imagem-button"
      onClick={gerarImagem}  
      style={{
      padding: "10px 20px",
      backgroundColor: corBorda,
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      }}
      >
      Gerar lista
      </button>
      {mostrarOverlay && (
  <div className="overlay">
    <div className="popup">
      <h2 className="titulo-overlay"
      >Minha Tier List: {jogo}</h2>

      {imagemGerada && (
        <img src={imagemGerada} alt="Tier List" className="preview-img" />
      )}

      <div className="botoes-overlay">
        
        <button
          onClick={async () => {
            const popup = document.querySelector(".popup");

            if (!popup) return;

            const canvas = await html2canvas(popup, {
              scale: 2,
              useCORS: true,
              backgroundColor: corBorda,
              onclone: (documento) => {
                const botoes = documento.querySelector(".botoes-overlay");

                if (botoes) {
                  botoes.style.display = "none";
                }

                const popupClonado = documento.querySelector(".popup");

                if (popupClonado) {
                  popupClonado.style.boxShadow = "none";
                }
              },
            });

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "tierlist.png";
            link.click();
          }}
        >
          Baixar imagem
        </button>

      

        <button
          onClick={() => {
            const texto = encodeURIComponent(
              "🔥 Minha Tier List de Bosses Souls! Confira:"
            );
            const url = encodeURIComponent(window.location.href);
            window.open(
              `https://x.com/intent/tweet?text=${texto}&url=${url}`,
              "_blank"
            );
          }}
           style={{
          padding: "10px 20px",
          backgroundColor: corBorda,
          }}
        >
           Compartilhar no x
        </button>

        <button
          onClick={() => {
            const texto = encodeURIComponent(
              "🔥 Minha Tier List de Bosses Souls! Confira:"
            );
            const url = encodeURIComponent(window.location.href);
            window.open(
              `https://www.reddit.com/submit?title=${texto}&url=${url}`,
              "_blank"
            );
          }}
           style={{
          padding: "10px 20px",
          backgroundColor: corBorda,
          }}
        >
           Postar no Reddit
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `🔥 Minha Tier List de Bosses Souls! Confira: ${window.location.href}`
            );
            alert("Mensagem copiada para enviar no Discord!");
          }}
           style={{
          padding: "10px 20px",
          backgroundColor: corBorda,
          }}
        >
           Compartilhar no Discord
        </button>

       <button
      type="button"
      onClick={() => setMostrarOverlay(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Fechar"
      style={{
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        border: "none",
        borderRadius: "8px",
        backgroundColor: hover ? "#e53935" : corBorda,
        color: hover ? "#ffffff" : "#ffffff",
        fontSize: "26px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      &times;
    </button>

      </div>
    </div>
  </div>
)}
      
    </div>
  )}
      </section>
      </div>
    </div>
  );
};

