import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./Job.css";

export default function Job({ data }) {
  const { theme } = useContext(ThemeContext);

  return (
    <a href="#" className={`job job--${theme}`}>
      <div
        className="job__company-logo-container"
        style={{ backgroundColor: data.logoBackground }}
      >
        <img
          className="job__company-logo"
          src={require(`../../assets/logos/${data.logo}`)}
        />
      </div>

      <p className="job__other-infos">
        {data.postedAt} · {data.contract}
      </p>

      <p className="job__position">{data.position}</p>

      <p className="job__company">{data.company}</p>

      <p className="job__location">{data.location}</p>
    </a>
  );
}
