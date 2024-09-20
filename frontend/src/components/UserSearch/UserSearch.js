import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserSearch() {
  const API_URL = window.location.origin.replace('3000', '5000');
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const fetchUser = async (userInput) => {
    if (!userInput) {
      setSearchResult([]);
      setShowResult(false);
    }

    try {
      const res = await fetch(`/api/users/search?query=${userInput}`);

      if (!res.ok) {
        throw new Error('Network issue with the Backend server');
      }

      const data = await res.json();
      console.log(data);
      setSearchResult(data.users || []);
      setShowResult(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchUser(value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search users by username"
        value={inputValue}
        className="w-full py-2 px-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none"
        onChange={handleChangeSearch}
      />

      {/* render the result based on search input */}
      {showResult && (
        <div>
          {searchResult.length > 0 ? (
            searchResult.map((user) => (
              <Link to={`to/profile/${user.username}`}>
                <div>
                  <div className="flex item-center cursor-pointer hover:bg-gray-300">
                    <img src="https://via.placeholder.com/50" alt="" />
                  </div>
                  <p>{user.username}</p>
                  <p>{user.fullname}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No user found</p>
          )}
        </div>
      )}
    </div>
  );
}
