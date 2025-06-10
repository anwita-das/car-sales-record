import { Link } from "react-router-dom";

function CarCard({car}) {
    const logoSrc = `${car.make}.jpg`;
    return (
        <div className="flex flex-row justify-center bg-white h-[120px] gap-5 m-2.5 rounded-[10px] 
                w-full sm:w-[46%] md:w-[30%] lg:w-[23%]">
            <img src={logoSrc} alt={car.model} className="w-[80px] h-[80px] sm:w-[80px] sm:h-[80px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] bg-cover rounded-[10px] my-4"
            onError={(e) => { e.target.src = '/car-placeholder.jpg'; }}/>
            <div className="mt-4 ml-4 text-sm sm:text-xs md:text-md">
                <Link to={`/car/${car.id}`} className="car-card-link">
                <h2 className="text-lg text-orange-700 font-bold">{car.model}</h2>
                </Link>
                <p>Make: {car.make}</p>
                <p>Model: {car.model}</p>
                <p>Price: $ {car.price}</p>
            </div>
        </div>
        
    );
}

export default CarCard;