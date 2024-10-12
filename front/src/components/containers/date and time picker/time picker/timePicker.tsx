// src/components/time picker/timePicker.tsx
import { TimePicker } from "zaman";
import { Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setDeadlineTime } from "../../../../store/slices/deadlineSlice";

const CustomTimePicker: React.FC = () => {
  const dispatch = useDispatch();
  const deadlineTime = useSelector((state) => state.deadline.time); // Access the time from Redux

  const handleTimeChange = (e: { hour: number; minute: number }) => {
    // Format the time as "HH:MM:SS" for storing in Redux
    const formattedTime = `${e.hour.toString().padStart(2, "0")}:${e.minute
      .toString()
      .padStart(2, "0")}:00`;
    dispatch(setDeadlineTime(formattedTime)); // Dispatch action to set deadline time as a string
  };

  return (
    <div className="w-1/2 relative flex items-center rtl:space-x-reverse space-x-2">
      <Clock className="absolute z-20 right-8" color="white" />

      <input
        type="text"
        readOnly
        className="p-2 w-2/3 absolute -left-6 z-10 bg-indigo-50 focus:outline-none focus:ring-0 cursor-auto"
        placeholder="زمان"
        value={deadlineTime ? deadlineTime.slice(0, 5) : ""} // Display only the "HH:MM" part
      />

      <TimePicker
        onChange={handleTimeChange}
        round="thin"
        accentColor="#7c3aed"
        locale="fa" // Set to your desired locale
        clockTime={24} // Use 24-hour format
        inputClass="w-14 h-9 rounded bg-[#7c3aed] rounded-md text-[#7c3aed] focus:border-none absolute right-2 cursor-pointer focus:outline-none" // Tailwind styling for the input
      />
    </div>
  );
};

export default CustomTimePicker;
