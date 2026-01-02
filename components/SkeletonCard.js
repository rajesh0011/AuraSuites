
export default function SkeletonHotelGrid() {
  return (
    <div className="row">
      {[1, 2, 3].map((i) => (
        <div className="col-md-4 mb-4" key={i}>
          <div className="winter-box hotel-box no-image-bg animate-pulse">
            <div
              className="bg-gray-300 w-100"
              style={{ height: "220px" }}
            />
            <div className="winter-box-content pt-2">
              <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded" />
              <div className="bg-gray-200 h-4 w-full mb-1 rounded" />
              <div className="bg-gray-200 h-4 w-5/6 mb-2 rounded" />
              <div className="d-flex justify-content-between">
                <div className="bg-gray-300 h-6 w-24 rounded" />
                <div className="bg-gray-300 h-6 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
