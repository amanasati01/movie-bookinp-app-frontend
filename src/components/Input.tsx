interface propType {
    handleUserInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    height: string; 
    width: string; 
    placeHolder : string,
    inputValue ?: string,
    handleKeyboard?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }
  
  export default function Input({ handleUserInput, height, width,placeHolder,handleKeyboard, inputValue}: propType) {
    
    return (
      <>
        <div className="relative">
          <input
            type="text"
             value={inputValue}
            className={`border text-sm ${width} ${height} border-gray-300 focus:outline-none  ml-8 pl-8 pr-2 rounded`}
            placeholder={placeHolder}
            onChange={handleUserInput}
            onKeyDown={handleKeyboard}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 absolute top-2.5 left-10 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </>
    );
  }
  