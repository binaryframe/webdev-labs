import ImagePlaceholder from './ImagePlaceholder';

export default function Hero() {
  return (
    <section className="hero">
      <ImagePlaceholder className="hero__img" />
      <div>
        <h1>Bright ideas for every space</h1>
        <p>Browse our wide range of LED luminaires: panel lights, street lights, downlights and more. Energy efficient, durable and stylish.</p>
      </div>
    </section>
  );
}
