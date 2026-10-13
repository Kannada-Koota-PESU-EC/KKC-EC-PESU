import Hero from "@/features/home/components/Hero";
import AboutSection from "@/features/home/components/AboutSection";
import RepublicDayPopup from "@/features/home/components/RepublicDayPopup";

const experiences = [
  {
    number: "01",
    title: "Our Heritage",
    kannada: "ನಮ್ಮ ಪರಂಪರೆ",
    description:
      "Celebrating the language, traditions and stories that connect generations.",
    image: "/img1.jpg",
    tag: "CULTURE & IDENTITY",
  },
  {
    number: "02",
    title: "Our Community",
    kannada: "ನಮ್ಮ ಜನರು",
    description:
      "A community of people brought together by culture, creativity and belonging.",
    image: "/img3.jpg",
    tag: "PEOPLE & CONNECTION",
  },
];

const Index = () => {
  return (
    <div className="kkc-experience min-h-screen">
      <RepublicDayPopup />

      <Hero />

      {/* Moving cultural identity strip */}
      <section className="kkc-marquee" aria-label="Kannada Koota">
        <div className="kkc-marquee-track">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index}>
              ಕನ್ನಡ ಕೇವಲ ಭಾಷೆಯಲ್ಲ • CULTURE IS OUR IDENTITY •
              ಕನ್ನಡ ಕೇವಲ ಭಾಷೆಯಲ್ಲ •
            </span>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="kkc-intro">
        <div className="kkc-container">
          <p className="kkc-eyebrow">
            <span className="kkc-dot" />
            ROOTED IN KARNATAKA · UNITED AT PES
          </p>

          <div className="kkc-intro-grid">
            <h2>
              More than
              <br />
              <span>a language.</span>
              <br />
              A feeling.
            </h2>

            <div className="kkc-intro-copy">
              <span className="kkc-kannada-heading">ನಮ್ಮ ಕನ್ನಡ. ನಮ್ಮ ಹೆಮ್ಮೆ.</span>

              <p>
                Kannada is our heritage, our expression and a part of who we
                are. Kannada Koota brings that identity to life through
                community, creativity and shared experiences.
              </p>

              <a href="#about" className="kkc-text-link">
                DISCOVER OUR STORY <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural feature cards */}
      <section className="kkc-explore" id="explore">
        <div className="kkc-container">
          <div className="kkc-section-heading">
            <div>
              <p className="kkc-eyebrow">A CULTURE THAT LIVES ON</p>
              <h2>
                Discover the <span>feeling.</span>
              </h2>
            </div>

            <p className="kkc-heading-note">
              Every tradition carries a story.
              <br />
              Every gathering creates a memory.
            </p>
          </div>

          <div className="kkc-card-grid">
            {experiences.map((item) => (
              <article className="kkc-culture-card" key={item.number}>
                <div className="kkc-card-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="kkc-card-number">{item.number}</span>
                  <span className="kkc-card-arrow">↗</span>
                </div>

                <div className="kkc-card-content">
                  <p className="kkc-card-tag">{item.tag}</p>
                  <h3>{item.title}</h3>
                  <p className="kkc-card-kannada">{item.kannada}</p>
                  <p className="kkc-card-description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Existing homepage gallery */}
      <section className="kkc-gallery">
        <div className="kkc-container">
          <p className="kkc-eyebrow">MOMENTS THAT STAY WITH US</p>
          <div className="kkc-gallery-heading">
            <h2>
              Made of <span>memories.</span>
            </h2>
            <p>
              The people, celebrations and moments that make our community
              special.
            </p>
          </div>

          <div className="kkc-gallery-grid">
            <div className="kkc-gallery-image kkc-gallery-large">
              <img src="/img1.jpg" alt="Kannada Koota memories" loading="lazy" />
              <span>OUR CULTURE. OUR PRIDE.</span>
            </div>

            <div className="kkc-gallery-image kkc-gallery-small">
              <img src="/img3.jpg" alt="Kannada Koota celebrations" loading="lazy" />
              <span>TOGETHER, WE CELEBRATE.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Existing About section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Closing call to action */}
      <section className="kkc-join">
        <div className="kkc-join-pattern" aria-hidden="true">
          ಕ
        </div>

        <div className="kkc-container kkc-join-inner">
          <p className="kkc-eyebrow">YOUR CULTURE. YOUR COMMUNITY.</p>

          <h2>
            Be part of
            <br />
            <span>something timeless.</span>
          </h2>

          <p>
            Celebrate Kannada. Make memories. Find your people.
          </p>

          <a href="/contact" className="kkc-join-button">
            CONNECT WITH US <span>↗</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;