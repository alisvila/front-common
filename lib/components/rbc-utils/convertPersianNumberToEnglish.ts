function convertPersianNumberToEnglish(value:string | number) {
  return String(value).replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

export default convertPersianNumberToEnglish;