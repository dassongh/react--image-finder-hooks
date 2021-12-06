import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images, clickHandler }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            largeSrc={largeImageURL}
            alt={tags}
            clickHandler={clickHandler}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  handler: PropTypes.func,
};
