export default function ChangeIcon({ active }) {
    return (
        <svg
            width="20px"
            height="20px"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            className='transition-all'
                d="M18 31H38V5"
                stroke={`${active ? 'white' : 'black'}`}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
            className='transition-all'
                d="M30 21H10V43"
                stroke={`${active ? 'white' : 'black'}`}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
            className='transition-all'
                d="M44 11L38 5L32 11"
                stroke={`${active ? 'white' : 'black'}`}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
            className='transition-all'
                d="M16 37L10 43L4 37"
                stroke={`${active ? 'white' : 'black'}`}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
