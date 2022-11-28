/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*****************************************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getTimezoneOffsetInMilliseconds;

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/_lib/requiredArgs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/_lib/requiredArgs/index.js ***!
  \**********************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = requiredArgs;

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/compareAsc/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/compareAsc/index.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = compareAsc;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarDays/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarDays/index.js ***!
  \*****************************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = differenceInCalendarDays;

var _index = _interopRequireDefault(__webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/startOfDay/index.js"));

var _index3 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var startOfDayLeft = (0, _index2.default)(dirtyDateLeft);
  var startOfDayRight = (0, _index2.default)(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - (0, _index.default)(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - (0, _index.default)(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarMonths/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarMonths/index.js ***!
  \*******************************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = differenceInCalendarMonths;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarYears/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarYears/index.js ***!
  \******************************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = differenceInCalendarYears;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  return dateLeft.getFullYear() - dateRight.getFullYear();
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/differenceInDays/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/differenceInDays/index.js ***!
  \*********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = differenceInDays;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../differenceInCalendarDays/index.js */ "./node_modules/date-fns/differenceInCalendarDays/index.js"));

var _index3 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full days according to the local timezone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
//=> 92
 */


function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastDayNotFull = Number(compareLocalAsc(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/differenceInMonths/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/differenceInMonths/index.js ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = differenceInMonths;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../differenceInCalendarMonths/index.js */ "./node_modules/date-fns/differenceInCalendarMonths/index.js"));

var _index3 = _interopRequireDefault(__webpack_require__(/*! ../compareAsc/index.js */ "./node_modules/date-fns/compareAsc/index.js"));

var _index4 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

var _index5 = _interopRequireDefault(__webpack_require__(/*! ../isLastDayOfMonth/index.js */ "./node_modules/date-fns/isLastDayOfMonth/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates using trunc as a default rounding method.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = (0, _index3.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
  var result; // Check for the difference of less than month

  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      // This will check if the date is end of Feb and assign a higher end of month date
      // to compare it with Jan
      dateLeft.setDate(30);
    }

    dateLeft.setMonth(dateLeft.getMonth() - sign * difference); // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value

    var isLastMonthNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign; // Check for cases of one full calendar month

    if ((0, _index5.default)((0, _index.default)(dirtyDateLeft)) && difference === 1 && (0, _index3.default)(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }

    result = sign * (difference - Number(isLastMonthNotFull));
  } // Prevent negative zero


  return result === 0 ? 0 : result;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/differenceInYears/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/differenceInYears/index.js ***!
  \**********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = differenceInYears;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../differenceInCalendarYears/index.js */ "./node_modules/date-fns/differenceInCalendarYears/index.js"));

var _index3 = _interopRequireDefault(__webpack_require__(/*! ../compareAsc/index.js */ "./node_modules/date-fns/compareAsc/index.js"));

var _index4 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = (0, _index3.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight)); // Set both dates to a valid leap year for accurate comparison when dealing
  // with leap days

  dateLeft.setFullYear(1584);
  dateRight.setFullYear(1584); // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastYearNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign;
  var result = sign * (difference - Number(isLastYearNotFull)); // Prevent negative zero

  return result === 0 ? 0 : result;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/endOfDay/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/endOfDay/index.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = endOfDay;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/endOfMonth/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/endOfMonth/index.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = endOfMonth;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/isLastDayOfMonth/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/isLastDayOfMonth/index.js ***!
  \*********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLastDayOfMonth;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../endOfDay/index.js */ "./node_modules/date-fns/endOfDay/index.js"));

var _index3 = _interopRequireDefault(__webpack_require__(/*! ../endOfMonth/index.js */ "./node_modules/date-fns/endOfMonth/index.js"));

var _index4 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  return (0, _index2.default)(date).getTime() === (0, _index3.default)(date).getTime();
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/startOfDay/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/startOfDay/index.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = startOfDay;

var _index = _interopRequireDefault(__webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;

/***/ }),

/***/ "./node_modules/date-fns/toDate/index.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/toDate/index.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toDate;

var _index = _interopRequireDefault(__webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0, _index.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

module.exports = exports.default;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var date_fns_differenceInDays_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns/differenceInDays/index.js */ "./node_modules/date-fns/differenceInDays/index.js");
/* harmony import */ var date_fns_differenceInDays_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns_differenceInDays_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns_differenceInMonths_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns/differenceInMonths/index.js */ "./node_modules/date-fns/differenceInMonths/index.js");
/* harmony import */ var date_fns_differenceInMonths_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns_differenceInMonths_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var date_fns_differenceInYears_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns/differenceInYears/index.js */ "./node_modules/date-fns/differenceInYears/index.js");
/* harmony import */ var date_fns_differenceInYears_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns_differenceInYears_index_js__WEBPACK_IMPORTED_MODULE_2__);




// localStorage.setItem(
// 	'weightData',
// 	'[{"id":1,"date":"12","displayDate":"12","weight":120},{"id":1,"date":"12","displayDate":"12","weight":120}]'
// )
// localStorage.clear()
let weightData = JSON.parse(localStorage.getItem('weightData')) || []

const table = document.querySelector('.table')
const tableBody = document.querySelector('.table-body')
const lastRow = tableBody.lastElementChild

function init() {
	// If there is any info in the localstorage display it
	if (weightData.length > 0) {
		verificationsForDisplay()
		weightData.forEach(row => {
			insertRow(row)

			createBtnListener(row.id)
		})
	}

	const submitBtn = document.getElementById('submit')

	submitBtn.addEventListener('click', e => {
		// Prevent from submiting the form
		e.preventDefault()

		// Validate all the inputs
		if (!validate()) return

		// Generate te data
		const newRowData = generateNewRowData()

		// Add newRowData to Array
		weightData.push(newRowData)

		verificationsForDisplay()

		// Insert new row
		insertRow(newRowData)

		// Update the values in localStorage
		localStorage.setItem('weightData', JSON.stringify(weightData))

		// Add click listener to the delete btn
		createBtnListener(newRowData.id)
	})
}

function validate() {
	const weight = parseFloat(document.getElementById('weight').value)
	const date = new Date(document.getElementById('date').value)

	if (!weight) {
		setNewErrorAlert('Weight field cannot be empty')
		return false
	}
	if (date == 'Invalid Date') {
		setNewErrorAlert('Date field cannot be empty')
		return false
	}

	if (weight < 0) {
		setNewErrorAlert('Weight cannot be negative')
		return false
	}

	if (weightData.length > 0)
		if (date_fns_differenceInDays_index_js__WEBPACK_IMPORTED_MODULE_0___default()(date, weightData[weightData.length - 1].date) < 0) {
			setNewErrorAlert('Cannot enter past dates')
			return false
		}

	return true
}

function generateNewRowData() {
	// Get the values
	const weight = parseFloat(document.getElementById('weight').value)

	// Date for calculations
	const date = new Date(document.getElementById('date').value)
	// Date for display
	const displayDate = document.getElementById('date').value

	// Generate simple id
	const id = weightData.length + 1

	return {
		id,
		date,
		displayDate,
		weight,
	}
}

function verificationsForDisplay() {
	// Only show the table if there is at least 1 row
	if (weightData.length >= 1) table.classList.remove('d-none')

	// Only show the results if the is 2 or more rows
	if (weightData.length >= 2) {
		lastRow.classList.remove('d-none')

		generateFinalMsgs()
	}
}

function insertRow(newRowData) {
	const newRow = document.createElement('tr')
	newRow.innerHTML = `
		<td class="border">${newRowData.displayDate}</td>
		<td class="border">${newRowData.weight}Kg</td>
		<td class="border">
		<button type="button" class="btn-close delete-btn-${newRowData.id}" aria-label="Close"></button>
	`
	tableBody.insertBefore(newRow, lastRow)
}

function createBtnListener(id) {
	const btn = document.querySelector(`.delete-btn-${id}`)

	btn.addEventListener('click', e => {
		removeRow(id, btn)
	})
}

// Utils
function setNewErrorAlert(msg) {
	const errorsContainer = document.querySelector('.errors-container')

	const newMsgDiv = document.createElement('div')

	newMsgDiv.classList.add(
		'alert',
		'alert-danger',
		'alert-dismissible',
		'fade',
		'show'
	)
	newMsgDiv.setAttribute('role', 'alert')
	newMsgDiv.innerHTML = `
			<div>${msg}</div>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
			></button>
		`

	errorsContainer.appendChild(newMsgDiv)
}

function generateFinalMsgs() {
	const weightResult = document.querySelector('.weight-result')
	const timeTracking = document.querySelector('.time-tracking')

	weightResult.innerHTML = generateWeightMsg()

	timeTracking.innerHTML = generateTimeMsg()
}

function generateWeightMsg() {
	const result = weightData[0].weight - weightData[weightData.length - 1].weight

	if (result < 0) return `You've gained ${Math.abs(result)}Kg 😢`

	if (result > 0) return `You've lost ${result}Kg 😃`

	return `You haven't lost or gained any weight`
}

function generateTimeMsg() {
	let daysTracking = date_fns_differenceInDays_index_js__WEBPACK_IMPORTED_MODULE_0___default()(
		weightData[weightData.length - 1].date,
		weightData[0].date
	)

	let monthsTracking = date_fns_differenceInMonths_index_js__WEBPACK_IMPORTED_MODULE_1___default()(
		weightData[weightData.length - 1].date,
		weightData[0].date
	)

	let yearsTracking = date_fns_differenceInYears_index_js__WEBPACK_IMPORTED_MODULE_2___default()(
		weightData[weightData.length - 1].date,
		weightData[0].date
	)

	if (yearsTracking > 0) {
		monthsTracking -= 12 * yearsTracking

		daysTracking -= 365 * yearsTracking

		if (monthsTracking === 0 && daysTracking === 0) {
			if (yearsTracking) return `${yearsTracking} year tracking`

			return `${yearsTracking} years tracking`
		}

		if (monthsTracking === 0) {
			if (yearsTracking === 1 && daysTracking === 1)
				return `${yearsTracking} year and ${daysTracking} day tracking`

			if (yearsTracking === 1)
				return `${yearsTracking} year and ${daysTracking} days tracking`

			if (daysTracking === 1)
				return `${yearsTracking} years and ${daysTracking} day tracking`

			return `${yearsTracking} years and ${daysTracking} days tracking`
		}

		if (daysTracking === 0) {
			if (yearsTracking === 1 && monthsTracking === 1)
				return `${yearsTracking} year and ${monthsTracking} month tracking`

			if (yearsTracking === 1)
				return `${yearsTracking} year and ${monthsTracking} months tracking`

			if (monthsTracking === 1)
				return `${yearsTracking} years and ${monthsTracking} month tracking`

			return `${yearsTracking} years and ${monthsTracking} months tracking`
		}

		if (monthsTracking > 0) {
			daysTracking -= 30 * monthsTracking

			return `${yearsTracking} years, ${monthsTracking} months and ${daysTracking} days tracking`
		}
	}

	if (monthsTracking > 0) {
		daysTracking -= 30 * monthsTracking

		if (daysTracking === 0) {
			if (monthsTracking === 1) return `${monthsTracking} month tracking`
			return `${monthsTracking} months tracking`
		}

		if (daysTracking === 1)
			return `${monthsTracking} months and ${daysTracking} day tracking`

		return `${monthsTracking} months and ${daysTracking} days tracking`
	}

	if (daysTracking === 1) return `${daysTracking} day tracking`
	return `${daysTracking} days tracking`
}

function removeRow(id, btn) {
	const parentRow = btn.parentElement.parentElement

	// Find the index of the row to delete
	const dataRowIndex = weightData.findIndex(row => row.id === id)

	// Remove from array
	weightData.splice(dataRowIndex, 1)

	// Update tha values in locaStorage
	localStorage.setItem('weightData', JSON.stringify(weightData))

	// Remove element
	tableBody.removeChild(parentRow)

	if (weightData.length === 0) table.classList.add('d-none')

	if (weightData.length <= 1) lastRow.classList.add('d-none')
}

window.addEventListener('load', init)

})();

/******/ })()
;
//# sourceMappingURL=main.js.map