import "./Banner.css";

function Banner() {
  return (
    <header className="banner">
      <img   src={`${process.env.PUBLIC_URL}/imagens/banner.png`}
  alt="Imagem do banner" />
    </header>
  );
}

export default Banner;
