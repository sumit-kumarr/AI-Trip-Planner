import React from 'react';

const Header = () => {
  return (
    <div className='p-3 flex items-center justify-between'>
        <h1 onClick={() => window.location.href = '/'} className='cursor-pointer'>AI Trip Planner</h1>

      <div>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create Trip</button>
      </div>

    </div>
  );
}

export default Header;
