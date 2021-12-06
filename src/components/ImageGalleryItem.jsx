import PropTypes from 'prop-types';

export default function ImageGalleryItem({ src, largeSrc, alt, clickHandler }) {
  return (
    <li className="ImageGalleryItem" onClick={() => clickHandler(largeSrc, alt)}>
      <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string,
  handler: PropTypes.func,
  largeSrc: PropTypes.string,
  src: PropTypes.string,
};
