import React, { forwardRef } from 'react';
import DatePicker from "react-datepicker";
import { Calendar } from 'lucide-react';
import moment from 'moment-jalaali';

// Configure moment-jalaali
moment.loadPersian({ dialect: 'persian-modern' });

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean | string;
  disabled?: boolean;
  className?: string;
  showIcon?: boolean;
}

interface JalaliDatePickerProps {
  value: Date | null;
  onChange: any
  placeholder?: string;
  error?: boolean | string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  isClearable?: boolean;
  showIcon?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      value,
      onClick,
      onChange,
      placeholder,
      error,
      disabled,
      className,
      showIcon,
    },
    ref
  ) => (
    <div className="rbc-relative">
      <input
        value={value}
        onChange={onChange}
        onClick={onClick}
        ref={ref}
        placeholder={placeholder}
        className={`
          rbc-w-full rbc-px-4 rbc-py-2 
          rbc-rounded-lg rbc-border
          ${
            error
              ? "rbc-border-red-500 focus:rbc-ring-red-500"
              : "rbc-border-gray-300 focus:rbc-ring-blue-500"
          }
          ${
            disabled
              ? "rbc-bg-gray-100 rbc-text-gray-500"
              : "rbc-bg-white rbc-text-gray-900"
          }
          focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-border-transparent
          ${className}
        `}
        disabled={disabled}
      />
      {showIcon && (
        <Calendar
          className={`
            rbc-absolute rbc-left-3 rbc-top-2.5
            rbc-w-5 rbc-h-5
            ${error ? "rbc-text-red-500" : "rbc-text-gray-400"}
            ${disabled ? "rbc-opacity-50" : ""}
          `}
        />
      )}
    </div>
  )
);

CustomInput.displayName = 'CustomInput';

const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  error,
  disabled = false,
  className = '',
  minDate,
  maxDate,
  isClearable = true,
  showIcon = true
}) => {
  // // Convert Gregorian dates to Jalali for display
  // const formatDate = (date: Date | null): string => {
  //   if (!date) return '';
  //   return moment(date).format('jYYYY/jMM/jDD');
  // };

  // // Parse Jalali date string back to Gregorian Date object
  // const parseDate = (dateString: string): Date | null => {
  //   const m = moment(dateString, 'jYYYY/jMM/jDD');
  //   return m.isValid() ? m.toDate() : null;
  // };

  return (
    <div className="rbc-w-full" dir="rtl">
      <DatePicker
        selected={value}
        onChange={onChange}
        customInput={
          <CustomInput 
            error={error}
            disabled={disabled}
            className={className}
            placeholder={placeholder}
            showIcon={showIcon}
          />
        }
        dateFormat="yyyy/MM/dd"
        calendarStartDay={6} // Start from Saturday
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        isClearable={isClearable}
        placeholderText={placeholder}
        showMonthDropdown
        showYearDropdown
        className="rbc-w-full"
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="rbc-flex rbc-items-center rbc-justify-between rbc-px-2 rbc-py-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className={`
                rbc-p-1 rbc-rounded-full hover:rbc-bg-gray-100
                ${prevMonthButtonDisabled ? 'rbc-opacity-50 rbc-cursor-not-allowed' : ''}
              `}
            >
              <span className="rbc-sr-only">ماه قبل</span>
              <Calendar className="rbc-w-5 rbc-h-5" />
            </button>

            <div className="rbc-flex rbc-gap-2">
              <select
                value={moment(date).format('jMMMM')}
                onChange={() =>
                  console.log(moment, 'moment!')
                }
                className="rbc-form-select rbc-text-sm"
              >
                {moment.jMonths().map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={moment(date).jYear()}
                onChange={({ target: { value } }) =>
                  changeYear(parseInt(value))
                }
                className="rbc-form-select rbc-text-sm"
              >
                {Array.from({ length: 10 }, (_, i) => moment().jYear() - 5 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className={`
                rbc-p-1 rbc-rounded-full hover:rbc-bg-gray-100
                ${nextMonthButtonDisabled ? 'rbc-opacity-50 rbc-cursor-not-allowed' : ''}
              `}
            >
              <span className="rbc-sr-only">ماه بعد</span>
              <Calendar className="rbc-w-5 rbc-h-5" />
            </button>
          </div>
        )}
      />
      {error && typeof error === 'string' && (
        <p className="rbc-mt-1 rbc-text-sm rbc-text-red-500">{error}</p>
      )}
    </div>
  );
};

export default JalaliDatePicker;