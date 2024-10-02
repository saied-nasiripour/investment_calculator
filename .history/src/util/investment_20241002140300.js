// This function expects a JS object as an argument
// هدف: محاسبه ارزش سرمایه‌گذاری در طول زمان با در نظر گرفتن سرمایه‌گذاری سالانه و سود مرکب
// The object should contain the following properties
// - initialInvestment: The initial investment amount  --  مقدار اولیه سرمایه‌گذاری
// - annualInvestment: The amount invested every year  --  مبلغی که هر سال به سرمایه اضافه می‌شود
// - expectedReturn: The expected (annual) rate of return  --  نرخ بازده سالانه مورد انتظار به صورت درصد
// - duration: The investment duration (time frame)  --  مدت زمان نگهداری سرمایه‌گذاری به تعداد سال
export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}) {
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    annualData.push({
      year: i + 1, // year identifier
      interest: interestEarnedInYear, // the amount of interest earned in this year
      valueEndOfYear: investmentValue, // investment value at end of year
      annualInvestment: annualInvestment, // investment added in this year
    });
  }

  return annualData;
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// هدف: این شیء برای فرمت کردن اعداد به صورت ارز (به طور خاص دلار آمریکا) استفاده می‌شود
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/* این فایل جاوااسکریپتی ، شامل یک تابع است که برای محاسبه نتایج سرمایه‌گذاری بر اساس یک سری پارامترهای ورودی طراحی شده است.  */
