

const TrendingToggle =({onTimeChange}: {onTimeChange: (value: string) => void}) => {

const onChangeTimePeriod = (e: React.MouseEvent<HTMLButtonElement>) => {
  onTimeChange(e.currentTarget.value)
}

  return (
    <div className="inline-flex rounded-md shadow-xs " role="group">
  <button value="day" onClick={onChangeTimePeriod} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Today
  </button>
  <button value="week" onClick={onChangeTimePeriod} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    This Week
  </button>
 
</div>

  )
}

export default TrendingToggle