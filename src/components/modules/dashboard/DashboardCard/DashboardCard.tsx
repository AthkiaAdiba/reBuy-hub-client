interface DashboardCardProps {
  title: string;
  value: string;
  change?: string;
  icon: string; // Placeholder for icon
  color: string; // Tailwind background color class
}

const DashboardCard = ({
  title,
  value,
  change,
  icon,
  color,
}: DashboardCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:scale-105`}
    >
      <div>
        <h4 className="text-gray-500 text-sm font-medium uppercase">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p
            className={`text-sm mt-1 ${
              change.startsWith("+") ? "text-green-600" : "text-red-600"
            }`}
          >
            {change} Since last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {/* Placeholder for icons */}
        {icon === "dollar-sign" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        )}
        {icon === "box" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7L12 3 4 7l8 4 8-4zM4 11l8 4 8-4m-8 8l-4-2.25V11l4-2.25 4 2.25v4.5L12 19z"
            ></path>
          </svg>
        )}
        {icon === "shopping-cart" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        )}
        {icon === "users" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.653-.146-1.288-.42-1.857M5 20v-2c0-.653.146-1.288.42-1.857M12 10a6 6 0 01-6 6H6a6 6 0 01-6-6V6a6 6 0 016-6h0a6 6 0 016 6v4zm0 0a6 6 0 006 6h0a6 6 0 006-6V6a6 6 0 00-6-6h0a6 6 0 00-6 6v4z"
            ></path>
          </svg>
        )}
        {icon === "heart" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        )}
        {icon === "tag" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h5.5c.587 0 1.137.234 1.543.64l7 7a2.5 2.5 0 010 3.536l-3.536 3.536a2.5 2.5 0 01-3.536 0l-7-7A2.5 2.5 0 013 12.5V7c0-2.209 1.791-4 4-4z"
            ></path>
          </svg>
        )}
        {icon === "message-circle" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        )}
        {icon === "log-out" && (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
