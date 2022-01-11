const Popup = (props) => {
  return (
    <div className="popup-container">
      <h3>{props.marker.university}</h3>
      <a
        href={props.marker.url}
        target="_blank"
        rel="noreferrer"
        className="homepage-link"
      >
        Home
      </a>
    </div>
  );
};

export default Popup;
