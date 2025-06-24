export default function PlaceImg({ place,index=0,className=null }) {
  if (!place.photos?.length) {
    return "";
    }
    if (!className) {
        className="object-cover "
    }
  return (
    
      <img
        src={`https://easytostay-backend.onrender.com/uploads/${place.photos[index]}`}
        alt={`${place.title} preview`}
        className={className}
      />
  );
}
