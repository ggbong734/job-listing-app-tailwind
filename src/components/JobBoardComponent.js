import React from 'react'

export const JobBoardComponent = ({ job: {
    company,
    contract,
    featured,
    id,
    languages,
    level,
    location,
    logo,
    isNew,
    position,
    postedAt,
    role,
    tools,
}, handleTagClick
}) => {

    const tags = [role, level];
    if (languages) tags.push(...languages);
    if (tools) tags.push(...tools);

    return (
        <div className={`flex flex-col bg-white shadow-lg my-20 mx-10 p-2 rounded ${featured && 'border-l-8 border-gray-800 border-solid'} md:flex-row md:my-8`}>
            <div>
                <img className='w-20 h-20 -mt-16 mb-4 md:my-0 md:h-24 md:w-24' src={logo} alt={company} />
            </div>
            <div className='flex flex-col justify-between ml-4'>
                <h3 className='font-bold text-teal-500'>
                    {company}
                    {isNew && (
                        <span className='text-teal-50 text-sm bg-teal-500 font-bold m-2 py-0.5 px-2 rounded-full uppercase'>
                            New!
                        </span>
                    )}
                    {featured && (
                        <span className='bg-gray-800 text-white text-sm font-bold my-1 py-0.5 px-2 rounded-full uppercase'>
                            Featured
                        </span>)}
                </h3>
                <h2 className='font-bold my-2 text-xl'>{position}
                </h2>
                <p className='text-gray-700'>
                    {postedAt} · {contract} · {location}
                </p>
            </div>
            <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid md:ml-auto md:border-0 md:pt-0 md:mt-0">
                {
                    tags ? (tags.map((tag, idx) =>
                        <span
                            onClick={() => handleTagClick(tag)} className='text-teal-500 bg-teal-50 text-sm font-bold mr-4 mb-4 p-2 cursor-pointer rounded md:mb-0'
                            key={idx}>
                            {tag}
                        </span>)) : ('')
                }

            </div>
        </div>
    )
}
