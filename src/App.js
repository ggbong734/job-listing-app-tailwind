import React, { useState, useEffect } from 'react';
import data from './assets/data.json';
import { JobBoardComponent } from './components/JobBoardComponent';

console.log(data);

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);
  // by using [], the side-effect runs once after the initial rendering
  // if no argument is provided, the side-effect runs after every rendering (component mounting)
  // if [prop1, prop2, state], the side-effect runs only when any dependency value changes
  // REF: https://dmitripavlutin.com/react-useeffect-explanation/

  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) return true;

    const tags = [role, level];
    if (languages) tags.push(...languages);
    if (tools) tags.push(...tools);

    return tags.some(tag => filters.includes(tag));
  }

  const handleTagClick = (tag) => {
    //avoid adding the same tags multiple times
    if (filters.includes(tag)) return;
    setFilters([...filters, tag]);
  }

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter(f => f !== passedFilter))
  }

  const clearFilters = () => {
    setFilters([]);
  }

  const filteredJobs = jobs.filter(filterFunc);

  return (
    <div className="App bg-blue-50">
      <header className='bg-teal-400 mb-4'>
        <img className='w-full' src="/images/bg-header-desktop.svg" alt="" />
      </header>
      <h1 className="text font-bold text-3xl text-gray text-center">Job Listing App</h1>

      <div className='flex flex-wrap bg-white shadow-md my-16 mx-10 p-6 rounded'>
        {filters.map(filter =>
          <span
            className='text-teal-500 bg-teal-50 text-sm mr-4 mb-2 cursor-pointer font-bold p-0.5 rounded md:mb-0 md:text-lg md:p-2'
            onClick={() => {
              handleFilterClick(filter);
            }}
          >
            x {filter}
          </span>)}
        <button onClick={() => clearFilters()} className="font-bold text-gray-700 ml-auto">Clear</button>
      </div>
      {
        jobs.length === 0 ? (
          <p>Jobs are fetching...</p>
        ) : (
          filteredJobs.map((job) => <JobBoardComponent key={job.id} handleTagClick={handleTagClick} job={job} />)
        )
      }

    </div >
  );
}

export default App;

// TODOS
// 1. study design & json to know how to structure JSX
// 2. Job Board Component (will receive data)
// 3. Get data from the JSON
// 4. Pass down the date to the Job Board Component
// 5. Style it
// 6. Filter data
// 7. Filter component
