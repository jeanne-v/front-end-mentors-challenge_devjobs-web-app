import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../components/Layout/Layout";
import data from "../../data.json";
import "./DetailsPage.css";

export default function DetailsPage() {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();

  const jobData = data.filter((job) => {
    return job.id === +id;
  })[0];
  return (
    <div className={`details-page--${theme}`}>
      <main className="details-page__main">
        <div className="details-page__company-details">
          <div
            className="details-page__company-logo-container"
            style={{ backgroundColor: jobData.logoBackground }}
          >
            <img
              className="details-page__company-logo"
              src={require(`../../assets/logos/${jobData.logo}`)}
              alt={`${jobData.company} logo`}
            />
          </div>

          <div className="details-page__company-infos">
            <div>
              <p className="details-page__company-name">{jobData.company}</p>

              <p className="details-page__company-website">{jobData.website}</p>
            </div>

            <Link to="." className="details-page__company-link">
              Company Site
            </Link>
          </div>
        </div>

        <div className="details-page__job-details">
          <div className="details-page__job-main-infos">
            <div>
              <p className="details-page__job-other-infos">
                {jobData.postedAt} · {jobData.contract}
              </p>

              <h1 className="details-page__job-position">{jobData.position}</h1>

              <p className="details-page__job-location">{jobData.location}</p>
            </div>

            <Link to="." className="apply-btn">
              Apply Now
            </Link>
          </div>

          <div className="details-page__job-desc">
            <p className="details-page__desc-intro">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo.
              Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros
              pede semper est, vitae luctus metus libero eu augue. Morbi purus
              libero, faucibus adipiscing, commodo quis, gravida id, est. Sed
              lectus. Praesent elementum hendrerit tortor. Sed semper lorem at
              felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque
              euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede
              arcu, dapibus eu, fermentum et, dapibus sed, urna.
            </p>

            <section className="details-page__desc-section">
              <h2 className="details-page__desc-heading">Requirements</h2>

              <p className="details-page__desc-text">
                Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia,
                magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae
                facilisis libero dolor a purus. Sed vel lacus. Mauris nibh
                felis, adipiscing varius, adipiscing in, lacinia vel, tellus.
                Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc
                tellus ante, mattis eget, gravida vitae, ultricies ac, leo.
                Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
              </p>

              <ul className="details-page__list">
                <li className="details-page__list-item">
                  Morbi interdum mollis sapien. Sed
                </li>
                <li className="details-page__list-item">
                  Phasellus lacinia magna a ullamcorper laoreet, lectus arcu
                  pulvinar risus
                </li>
                <li className="details-page__list-item">
                  Mauris nibh felis, adipiscing varius, adipiscing in, lacinia
                  vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut
                  lectus.
                </li>
                <li className="details-page__list-item">
                  Morbi interdum mollis sapien. Sed
                </li>
              </ul>
            </section>

            <section className="details-page__desc-section">
              <h2 className="details-page__desc-heading">What You Will Do</h2>

              <p className="details-page__desc-text">
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue. Morbi purus libero, faucibus
                adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
                elementum hendrerit tortor. Sed semper lorem at felis.
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                dapibus eu, fermentum et, dapibus sed, urna.
              </p>

              <ol className="details-page__list">
                <li className="details-page__list-item">
                  Morbi interdum mollis sapien. Sed
                </li>
                <li className="details-page__list-item">
                  Phasellus lacinia magna a ullamcorper laoreet, lectus arcu
                  pulvinar risus
                </li>
                <li className="details-page__list-item">
                  Mauris nibh felis, adipiscing varius, adipiscing in, lacinia
                  vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut
                  lectus.
                </li>
                <li className="details-page__list-item">
                  Morbi interdum mollis sapien. Sed
                </li>
              </ol>
            </section>
          </div>
        </div>
      </main>

      <div className="job-recap">
        <div className="job-recap__content">
          <div>
            <p className="job-recap__position">{jobData.position}</p>

            <p className="job-recap__company">{jobData.company}</p>
          </div>

          <Link to="." className="apply-btn">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
