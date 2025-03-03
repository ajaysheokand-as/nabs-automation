import React from 'react'

export const Calender = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-4">March 2025</h2>
    <div className="grid grid-cols-7 gap-2 text-center text-gray-600 font-medium">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-2 mt-2 text-center">
      {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
        <div key={date} className="p-2 rounded-md hover:bg-blue-100 cursor-pointer">
          {date}
        </div>
      ))}
    </div>
  </div>
  )
}
