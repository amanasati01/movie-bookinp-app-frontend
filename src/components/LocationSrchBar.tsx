
import  { useState } from 'react';

function DropdownSearch() {
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  const closeModal = () => {
    setLocationModalOpen(false);
  };

  return (
    <div className="relative">
      {isLocationModalOpen && (
        <div className="fixed inset-0 flex  justify-center bg-black bg-opacity-50 z-50 h-40 top-36">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[50%]">
            <input type="text" className='bg-gray-500 border-none'/>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className={`p-4 ${isLocationModalOpen ? 'filter blur-3xl' : ''}`}>
       <div onClick={()=>{setLocationModalOpen(true)}} className='cursor-pointer'>
       <div className="w-32 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
       Enter location
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
      </svg>
      </div>
       </div>
      </div>
    </div>
  );
}

export default DropdownSearch;
