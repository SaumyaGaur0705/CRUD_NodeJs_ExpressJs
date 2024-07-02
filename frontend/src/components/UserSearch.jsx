import React, { useState, useEffect } from 'react';

const UserSearch = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUser, setSearchUser] = useState(false);

  useEffect(() => {
    fetchUserNames();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);
    setSearchTerm(searchTerm); 
    handleSearchUser(); 
  };

  const handleSearchUser = () => {
    setSearchUser(true);
  };

  const fetchUserNames = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/usernames');
      if (!response.ok) {
        throw new Error('Failed to fetch usernames');
      }
      const data = await response.json();
      setUserNames(data);
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };

  const handleCheckboxChange = (username) => {
    const currentIndex = selectedUsers.indexOf(username);
    const newSelectedUsers = [...selectedUsers];

    if (currentIndex === -1) {
      newSelectedUsers.push(username);
    } else {
      newSelectedUsers.splice(currentIndex, 1);
    }

    setSelectedUsers(newSelectedUsers);
  };

  const filteredUserNames = userNames.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <button
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className="text-black border border-gray-300 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleDropdown}
      >
        Dropdown Search
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${dropdownOpen ? 'transform rotate-180' : '' }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownSearch"
        className={` ${dropdownOpen ? '' : 'hidden'} bg-white rounded-lg shadow w-60 `}
      >
        <div className="py-2">
          <label htmlFor="input-group-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0  start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-search"
              className="block w-40 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search user"
              onChange={handleSearchInputChange}
              value={searchInput}
            />
          </div>
        </div>
        <ul
          className=" absolute bg-white h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {searchUser
            ? filteredUserNames.map((user, index) => (
                <li key={index}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id={`checkbox-item-${index}`}
                      type="checkbox"
                      checked={selectedUsers.includes(user.username)}
                      onChange={() => handleCheckboxChange(user.username)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`checkbox-item-${index}`}
                      className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      {user.username}
                    </label>
                  </div>
                </li>
              ))
            : userNames.map((user, index) => (
                <li key={index}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id={`checkbox-item-${index}`}
                      type="checkbox"
                      checked={selectedUsers.includes(user.username)}
                      onChange={() => handleCheckboxChange(user.username)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`checkbox-item-${index}`}
                      className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      {user.username}
                    </label>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSearch;
