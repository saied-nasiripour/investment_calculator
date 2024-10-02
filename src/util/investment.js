// This function expects a JS object as an argument
// هدف: محاسبه ارزش سرمایه‌گذاری در طول زمان با در نظر گرفتن سرمایه‌گذاری سالانه و سود مرکب
// The object should contain the following properties
// - initialInvestment: The initial investment amount  --  مقدار اولیه سرمایه‌گذاری
// - annualInvestment: The amount invested every year  --  مبلغی که هر سال به سرمایه اضافه می‌شود
// - expectedReturn: The expected (annual) rate of return  --  نرخ بازده سالانه مورد انتظار به صورت درصد
// - duration: The investment duration (time frame)  --  مدت زمان نگهداری سرمایه‌گذاری به تعداد سال
/*
  Example Output:
    {
      year: 1,
      interest: 500,
      valueEndOfYear: 1500,
      annualInvestment: 1000
    }
* */
export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}) {
  const annualData = []; // نتایج هر سال در این آرایه ذخیره خواهد شد
  /*
  مقدار سرمایه گذاری
  این متغیر نشان‌دهنده مقدار کل سرمایه‌گذاری در هر لحظه از زمان است.
  در ابتدا، مقدار این متغیر برابر با مقدار initialInvestment (سرمایه‌گذاری اولیه) است.
  سپس در هر سال، سود (interest) و سرمایه‌گذاری سالانه (annualInvestment) به این مقدار اضافه می‌شوند.
  این فرآیند ادامه دارد تا در پایان مدت زمان تعیین شده (duration)، مقدار نهایی سرمایه‌گذاری به دست بیاید.
  در هر سال، سود حاصل از سرمایه‌گذاری به همراه مقدار سرمایه‌گذاری جدید به investmentValue اضافه می‌شود.
  فرمول به این صورت است:
  investmentValue += interestEarnedInYear + annualInvestment;
  در نهایت، این مقدار نشان‌دهنده‌ی ارزش نهایی سرمایه‌گذاری شما در پایان هر سال است.
  * */
  let investmentValue = initialInvestment;  //  این متغیر نشان‌دهنده مقدار کل سرمایه‌گذاری در هر لحظه از زمان است - مقدار سرمایه گذاری

  for (let i = 0; i < duration; i++) {
    /*
    سود کسب شده در سال
    این متغیر نشان‌دهنده مقدار سودی است که در طول یک سال از سرمایه‌گذاری به دست می‌آید.
    این سود بر اساس نرخ بازده مورد انتظار (expectedReturn) و مقدار فعلی سرمایه‌گذاری (investmentValue) محاسبه می‌شود.
    این فرمول مقدار سود را بر اساس درصدی از سرمایه‌گذاری موجود (investmentValue) محاسبه می‌کند.
    */
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    /*
    رابطه بین این دو متغیر:
در هر سال، ابتدا مقدار سود سالانه (interestEarnedInYear) بر اساس مقدار سرمایه‌گذاری فعلی (investmentValue) محاسبه می‌شود.
سپس این سود به همراه سرمایه‌گذاری جدید سالانه (annualInvestment) به مقدار کل سرمایه‌گذاری (investmentValue) اضافه می‌شود.
به این ترتیب، مقدار سرمایه‌گذاری در پایان هر سال بیشتر می‌شود، که منجر به کسب سود بیشتر در سال بعدی خواهد شد (به دلیل سود مرکب).
بنابراین، این دو متغیر به شما کمک می‌کنند تا سود مرکب سرمایه‌گذاری خود را در طول زمان محاسبه کنید و ببینید که چگونه ارزش سرمایه‌گذاری شما در طول مدت زمان مورد نظر رشد می‌کند.
    * */
    annualData.push({
      year: i + 1, // year identifier  --  سال جاری (از 1 شروع می‌شود)
      interest: interestEarnedInYear, // the amount of interest earned in this year  --  مقدار سود کسب شده در آن سال
      valueEndOfYear: investmentValue, // investment value at end of year  --  ارزش کل سرمایه‌گذاری در پایان آن سال
      annualInvestment: annualInvestment, // investment added in this year  --  مبلغ اضافه شده به سرمایه‌گذاری در طول آن سال
    });
  }

  // خروجی: این تابع آرایه‌ای به نام annualData را بازمی‌گرداند که شامل نتایج هر سال، از جمله سود کسب شده و ارزش سرمایه‌گذاری در پایان هر سال است
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
// این کد به طور مؤثر رشد سرمایه‌گذاری را با در نظر گرفتن افزودن سالانه و سود مرکب شبیه‌سازی می‌کند و نتایج را به صورت فرمت شده برای خوانایی بهتر ارائه می‌دهد
