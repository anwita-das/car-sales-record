import { useNavigate } from 'react-router-dom';

function AddCar() {
  const navigate = useNavigate();

  return (
    <div className="add-car">
      <button type="button" className="bg-yellow-300 hover:bg-yellow-400 border-none w-[150px] h-[40px] rounded-[20px] ml-5 text-lg cursor-pointer" onClick={() => navigate('/add')}>
        Add Sale
      </button>
    </div>
  );
}

export default AddCar;
