import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import  './SobreMim.css';

const ExperienceCircle = ({ level, exp, toNextLevel, }) => {
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  // porcentagem de XP em relação ao próximo nível
  const progress = exp / (exp + toNextLevel);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    
    <div className="experience-circle">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#333"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="#00aaff"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-lg">Cristhian</p> 
        <h2 className="text-lvl">Lv {level}</h2>
      </div>
      <div className="ExpLVLInfo">
        <p>
          Souls: <span className="text-cyan-400">{exp}</span>
        </p>
        <p>
          To Next Level: <span className="text-cyan-300">{toNextLevel}</span>
        </p>
      </div>
    </div>
  );
};
export default function SobreMim() {

  const [selected, setSelected] = useState(null);
  const handlClick = item => {
    setSelected(selected === item ? null : item);
  };
  return (
    <div className='FundoimagemSobreMim'>
    <div className="Conteiner">
      <div className="SobreMim">
      <h1 className="Titulo">Sobre Mim</h1>
      <p className="descricao">
        Olá! Meu nome é Cristhian, sou designer UX/UI e estou começando minha
        jornada como Design Engineer. Apaixonado por tecnologia, música e
        aprendizado constante.
      </p>
      <div className='status-section'>
        <h2>Status</h2>
      {["Body Type", "Gênero", "Idade", "Classe"].map((item) => (
              <div key={item} className="status-item">
                <div
                  className={`status-line ${selected === item ? "active" : ""}`}
                  onClick={() => handlClick(item)}
                >
                  <span className="pointer">☞</span> {item}
                </div>

                <AnimatePresence>
                  {selected === item && (
                    <motion.p
                      className="status-detail"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {item === "Body Type" && "Faltando na academia"}
                      {item === "Gênero" && "Masculino"}
                      {item === "Idade" && "jovem"}
                      {item === "Classe" && "Front-End Jr"}
                    </motion.p>
                  )}
                </AnimatePresence>
                </div>
            ))}
      </div>
       <div className='atributos-section'>
      <h2>Atributos</h2>
            {["HP", "Mana", "Estamina", "Força", "Destreza", "Inteligência", "Fé", "Sorte"].map((item) => (
              <div key={item} className="status-item">
                <div
                  className={`status-line ${selected === item ? "active" : ""}`}
                  onClick={() => handlClick(item)}
                >
                  <span className="pointer">☞</span> {item}
                </div>

                <AnimatePresence>
                  {selected === item && (
                    <motion.p
                      className="status-detail"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {item === "HP" && "Café & motivação"}
                      {item === "Mana" && "Inspiração para criar interfaces únicas"}
                      {item === "Estamina" && "Energia em fazer retrabalhos quando necessário"}
                      {item === "Força" && "Conhecimento técnico em React/TypeScript"}
                      {item === "Destreza" && "Habilidade em design visual e prototipagem"}
                      {item === "Inteligência" && "Resolução de problemas complexos"}
                      {item === "Fé" && "Confiança em seu próprio crescimento"}
                      {item === "Sorte" && "nunca tive :("}
                    </motion.p>
                  )}
                </AnimatePresence>
                </div>
            ))}
      </div>
      </div>
      <div className="StatusContainer">
          <img src="/imagens/FotoPerfil.jpg" alt="Imagem do Perfil"
        style={{height:700, width:400}} />
      <ExperienceCircle
        level={16}
        exp={4848}
        toNextLevel={1315}
      />
    </div>
    </div>
    </div>
  );
}