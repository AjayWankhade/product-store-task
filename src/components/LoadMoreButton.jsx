import PropTypes from "prop-types";

const LoadMoreButton = ({ loading, hasMore, onLoadMore }) => {
  return (
    <div className="load-more-button">
      {!loading && hasMore && <button onClick={onLoadMore}>Load More</button>}
      {loading && <p>Loading more products...</p>}
    </div>
  );
};

LoadMoreButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreButton;
